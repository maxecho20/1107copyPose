// FIX: Changed to compat import to resolve initialization error which can occur with older firebase versions or misconfigured dependencies.
import firebase from 'firebase/compat/app';
// FIX: Switched to compat imports for auth, firestore, and storage to align with 'firebase/compat/app'.
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUyr1Jcf7W4lA9JmSjFWVS8QIegEIHlo4",
  authDomain: "copypose-7f3b2.firebaseapp.com",
  projectId: "copypose-7f3b2",
  storageBucket: "copypose-7f3b2.appspot.com",
  messagingSenderId: "501951956167",
  appId: "1:501951956167:web:a040f00b0f9647f9ceaae2",
  measurementId: "G-71WZ7R3XD7"
};

const app = firebase.initializeApp(firebaseConfig);
// FIX: Switched to compat API for auth. Modular 'getAuth' is not compatible with 'firebase/compat/app'.
export const auth = firebase.auth();
// FIX: Switched to compat API for firestore. Modular 'getFirestore' is not compatible.
export const db = firebase.firestore();
// FIX: Switched to compat API for storage. Modular 'getStorage' is not compatible.
export const storage = firebase.storage();
// FIX: Switched to compat API for GoogleAuthProvider.
export const googleProvider = new firebase.auth.GoogleAuthProvider();
