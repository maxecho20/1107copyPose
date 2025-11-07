import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// FIX: Import firebase compat app to get types and switch auth/firestore calls to compat syntax.
import firebase from 'firebase/compat/app';
import { auth, googleProvider, db } from '../services/firebase';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  credits: number;
}

interface AuthContextType {
  // FIX: Use firebase.User type from the compat library.
  currentUser: firebase.User | null; // Keep original firebase user for some direct operations
  userProfile: UserProfile | null;
  loading: boolean;
  // FIX: Use firebase.auth.UserCredential type from the compat library.
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  loginWithGoogle: () => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // FIX: Use firebase.auth.UserCredential type from the compat library.
  const handleNewUser = async (userCredential: firebase.auth.UserCredential) => {
    const { user } = userCredential;
    // FIX: Switched from modular 'getAdditionalUserInfo(userCredential)' to compat 'userCredential.additionalUserInfo'.
    const additionalInfo = userCredential.additionalUserInfo;
    if (additionalInfo?.isNewUser) {
      // FIX: Switched to compat firestore syntax.
      const profileRef = db.collection('userProfiles').doc(user.uid);
      const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          credits: 30 // Assign 30 credits to new users
      };
      // FIX: Switched to compat firestore syntax.
      await profileRef.set(newProfile);
    }
  };

  const signup = async (email: string, password: string) => {
    // FIX: Switched from modular 'createUserWithEmailAndPassword(auth, ...)' to compat 'auth.createUserWithEmailAndPassword(...)'.
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await handleNewUser(userCredential);
    return userCredential;
  };

  const login = (email: string, password: string) => {
    // FIX: Switched from modular 'signInWithEmailAndPassword(auth, ...)' to compat 'auth.signInWithEmailAndPassword(...)'.
    return auth.signInWithEmailAndPassword(email, password);
  };
  
  const loginWithGoogle = async () => {
    // FIX: Switched from modular 'signInWithPopup(auth, ...)' to compat 'auth.signInWithPopup(...)'.
    const userCredential = await auth.signInWithPopup(googleProvider);
    await handleNewUser(userCredential);
    return userCredential;
  }

  const logout = () => {
    setUserProfile(null);
    // FIX: Switched from modular 'signOut(auth)' to compat 'auth.signOut()'.
    return auth.signOut();
  };

  useEffect(() => {
    // FIX: The onSnapshot method in the compat SDK returns a function directly.
    let unsubscribeProfile: (() => void) | undefined;

    // FIX: Switched from modular 'onAuthStateChanged(auth, ...)' to compat 'auth.onAuthStateChanged(...)'.
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = undefined;
      }

      if (user) {
        // FIX: Switched to compat firestore syntax.
        const profileRef = db.collection('userProfiles').doc(user.uid);
        // FIX: Switched to compat firestore syntax.
        unsubscribeProfile = profileRef.onSnapshot((docSnap) => {
          if (docSnap.exists) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // This case might happen for users created before the profile system
            // Or if the new user creation logic failed.
            console.log("No user profile found for UID:", user.uid);
            // Optionally create a default profile here if one doesn't exist
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              credits: 30
            };
            // FIX: Switched to compat firestore syntax.
            db.collection('userProfiles').doc(user.uid).set(newProfile);
            setUserProfile(newProfile);
          }
          setLoading(false);
        });
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
        unsubscribeAuth();
        if (unsubscribeProfile) {
          unsubscribeProfile();
        }
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
