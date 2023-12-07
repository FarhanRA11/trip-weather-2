import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./clientApp";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const authContext = createContext();

export function useAuth() {
    return useContext(authContext);
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    };

    function logout() {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe
    }, [])

    const value = { currentUser, login, signup, logout }

    return <authContext.Provider value={value}>
        {!loading && children}
    </authContext.Provider>
}