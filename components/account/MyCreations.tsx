import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';
// FIX: Import firebase compat app to get access to Timestamp type.
import firebase from 'firebase/compat/app';
import { SparkleIcon, PhotoIcon } from '../icons';

interface Creation {
    id: string;
    imageUrl: string;
    createdAt: Date;
}

const CreationCard: React.FC<{ creation: Creation }> = ({ creation }) => {
    const now = new Date();
    const expiryDate = new Date(creation.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
    const timeLeft = expiryDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    let expiryText = '';
    if (daysLeft > 1) {
        expiryText = `Expires in ${daysLeft} days`;
    } else if (daysLeft === 1) {
        expiryText = 'Expires in 1 day';
    } else if (daysLeft > -1) {
        expiryText = 'Expires today';
    } else {
        expiryText = 'Expired';
    }

    return (
        <div className="relative group aspect-[9/14] rounded-2xl overflow-hidden bg-[#faeee7]">
            <img src={creation.imageUrl} alt="User creation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 right-2 text-center">
                 <span className="text-xs font-medium bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm">{expiryText}</span>
            </div>
        </div>
    )
}

const EmptyState: React.FC = () => (
    <div className="text-center py-20">
        <PhotoIcon className="mx-auto h-16 w-16 text-[#594a4e]/50" />
        <h3 className="mt-4 text-xl font-semibold text-[#33272a]">No Creations Yet</h3>
        <p className="mt-2 text-[#594a4e]">Your generated images will appear here.</p>
        {/* Potentially add a "Start Creating" button that links back to the main app */}
    </div>
);

const LoadingState: React.FC = () => (
     <div className="flex items-center justify-center py-20">
        <SparkleIcon className="h-12 w-12 text-[#ff8ba7] animate-spin" style={{ animationDuration: '3s' }}/>
        <p className="ml-4 text-lg text-[#594a4e]">Loading your creations...</p>
    </div>
)

export const MyCreations: React.FC = () => {
    const { userProfile } = useAuth();
    const [creations, setCreations] = useState<Creation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userProfile) {
            setIsLoading(false);
            return;
        }

        // FIX: Switched from modular query syntax to compat chained method syntax.
        const q = db
            .collection("userCreations")
            .where("userId", "==", userProfile.uid)
            .orderBy("createdAt", "desc");

        const unsubscribe = q.onSnapshot((querySnapshot) => {
            const userCreations = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    imageUrl: data.imageUrl,
                    // FIX: Use firebase.firestore.Timestamp type from the compat library.
                    createdAt: (data.createdAt as firebase.firestore.Timestamp).toDate()
                };
            });
            setCreations(userCreations);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching creations in real-time: ", error);
            setIsLoading(false);
        });
        
        // Cleanup listener on component unmount
        return () => unsubscribe();

    }, [userProfile]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-[#33272a]">My Creations</h1>
            <p className="text-[#594a4e] mb-8 max-w-2xl">
                Here are your recent creations. Please note that all images are automatically deleted after 7 days.
            </p>

            {isLoading ? <LoadingState /> :
             creations.length === 0 ? <EmptyState /> :
            (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {creations.map(creation => (
                        <CreationCard key={creation.id} creation={creation} />
                    ))}
                </div>
            )}
        </div>
    );
};