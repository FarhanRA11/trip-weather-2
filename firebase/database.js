import { createContext, useContext } from "react";
import { db } from "./clientApp";
import { doc, getDoc, setDoc } from "firebase/firestore";

const databaseContext = createContext();

export function useDatabase() {
    return useContext(databaseContext);
}

export function DatabaseProvider({ children }) {
    function createUserDatabase(uid, data) {
        return setDoc(doc(db, 'users', uid), data)
    };

    function updateUserDatabase(uid, data) {
        return setDoc(doc(db, 'users, uid'), data, { merge: true });
    };

    function getData(uid) {
        return getDoc(doc(db, 'users', uid));
    };

    const value = { createUserDatabase, updateUserDatabase, getData };

    return <databaseContext.Provider value={value}>
        {children}
    </databaseContext.Provider>
}