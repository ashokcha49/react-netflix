import { createContext, useContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc,setDoc} from 'firebase/firestore';

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user,setUser] = useState({});

    function signUp(email, password){
     createUserWithEmailAndPassword(auth,email,password)
        return setDoc(doc(db, 'users',email),{
            savedShows: []
         })
    }

    function signIn(email,password){
        return signInWithEmailAndPassword(auth,email,password);
   
    }

    function logOut(){
        return signOut(auth);
    }

    useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => 
    {
        setUser(currentUser);
    });
    return () => {
    unsubscribe();
    }
    });

    return (
        <AuthContext.Provider value={{user, signUp, signIn, logOut, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
return useContext(AuthContext)    
}