import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loader, setLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) =>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth,email, password);
    };
    // user create 
    
    const createGoogleUser = () =>{
        return signInWithPopup(auth, googleProvider)
    };
    // create google user 

    const loginUser = (email, password) =>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // user login 

    const userLogout = () =>{
        setLoader(true);
        return signOut(auth);
    };
    // user logout 

    const userUpdate = (profile) =>{
        return updateProfile(auth.currentUser, profile);
    };
    // user update 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoader(false);
        });
        return ()=> unsubscribe();
    },[])

    const authInfo = {user, createUser, loginUser, userLogout, userUpdate, loader, createGoogleUser};
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;