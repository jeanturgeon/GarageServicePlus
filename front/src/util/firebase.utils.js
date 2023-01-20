import { initializeApp } from "firebase/app";
import {     
    getAuth,    
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from "firebase/auth";
import {firebaseConfig} from '../firebaseConfig'

// Initialize FirebaseApp
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const loginWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const logOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (authChangeFunction) => onAuthStateChanged(auth, authChangeFunction);