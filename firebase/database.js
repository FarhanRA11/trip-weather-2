import { createContext, useContext } from "react";
import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./clientApp";

const databaseContext = createContext();
export function useDatabase() {
    return useContext(databaseContext);
}

export function DatabaseProvider({ children }) {
    function getData(uid) {
        return getDoc(doc(db, 'saved-data', uid));
    };

    function createUser(email, username) {
        return setDoc(doc(db, 'username', email), { username: username });
    };

    function createDatabase(username, email, uid) {
        return setDoc(doc(db, 'saved-data', uid), {
            username: username,
            email: email,
            data: [],
            history: []
        });
    };

    function getAllUsername() {
        return getDocs(collection(db, 'username'))
    };

    async function updateDatabase(uid, data) {
        const docSnap = await getDoc(doc(db, 'saved-data', uid));
        const existingData = docSnap.data().data;
        existingData.push({
            savedTime: Date.now(),
            steps: data
        });
        return updateDoc(doc(db, 'saved-data', uid), { data: existingData })
    };

    async function setHistory(uid, firstData, lastData) {
        const docSnap = await getDoc(doc(db, 'saved-data', uid));
        const existingData = docSnap.data().history;
        if (existingData.length >= 20) existingData.shift();
        existingData.push({
            savedTime: Date.now(),
            addStart: firstData.address,
            addDest: lastData.address,
            sa: firstData.coordinate[0],
            sn: firstData.coordinate[1],
            da: lastData.coordinate[0],
            dn: lastData.coordinate[1],
            timeStart: firstData.time,
            timeDest: lastData.time
        })
        return updateDoc(doc(db, 'saved-data', uid), { history: existingData });
    }

    async function deleteData(uid, index, location) {
        const docSnap = await getDoc(doc(db, 'saved-data', uid));
        const existingData = docSnap.data()[location];
        existingData.splice(index, 1);
        return updateDoc(doc(db, 'saved-data', uid), { [location]: existingData });
    }

    const value = { getData, createUser, createDatabase, getAllUsername, updateDatabase, setHistory, deleteData };

    return <databaseContext.Provider value={value}>
        {children}
    </databaseContext.Provider>
}