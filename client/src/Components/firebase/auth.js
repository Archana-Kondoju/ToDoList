// eslint-disable-next-line no-unused-vars
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";
import { auth } from "./firebase.config";

export const doCreateUserWithEmailAndPassword=async(email,password)=>{
    return await createUserWithEmailAndPassword(auth,email,password);
};

export const doSignInWithEmailAndPassword=async(email,password)=>{
    return await signInWithEmailAndPassword(auth,email,password);
};

export const doSignInWithGoogle = async ()=>{
    const provider = new GoogleAuthProvider();
    const result=await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut=()=>{
    return auth.signOut();
};
