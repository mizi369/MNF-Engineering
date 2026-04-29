import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let app: FirebaseApp | undefined;
let db: any = null;
let auth: any = null;
let isFirebaseActive = false;

try {
    const firebaseConfig = {
        apiKey: process.env.VITE_FIREBASE_API_KEY,
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_FIREBASE_APP_ID
    };

    // Only initialize if we have at least an API Key
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "placeholder") {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }
        
        auth = getAuth(app);
        db = getFirestore(app);
        isFirebaseActive = true;
        console.log('[FIREBASE] System Active');
    } else {
        console.warn('[FIREBASE] Missing Configuration. Auth will be limited to Local Storage.');
    }
} catch (error) {
    console.error('[FIREBASE] Initialization error:', error);
}

// Wrapper for signInWithPopup to handle missing auth
const signInWithPopup = async (targetAuth: any, provider: any) => {
    if (!targetAuth || !isFirebaseActive) {
        throw new Error('Firebase Auth tidak dikonfigurasi. Sila gunakan log masuk emel biasa.');
    }
    return firebaseSignInWithPopup(targetAuth, provider);
};

export { app, db, auth, isFirebaseActive, signInWithPopup };
export const googleProvider = new GoogleAuthProvider();
