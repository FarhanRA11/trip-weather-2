import { createContext, useContext } from "react";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./clientApp";

const databaseContext = createContext();
export function useDatabase() {
    return useContext(databaseContext);
}

export function DatabaseProvider({ children }) {
    function createUserDatabase(email, username) {
        return setDoc(doc(db, 'username', email), { username: username });
    };

    function updateUserDatabase(uid, data) {
        return setDoc(doc(db, 'users', uid), data, { merge: true });
    };

    function getData(uid) {
        return getDoc(doc(db, 'users', uid));
    };

    // -------------------------------------

    function getAllUsername() {
        return getDocs(collection(db, 'username'))
    };

    const value = { createUserDatabase, updateUserDatabase, getData, getAllUsername };

    return <databaseContext.Provider value={value}>
        {children}
    </databaseContext.Provider>
}