import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useContext, createContext, useState } from 'react'

const DataContext = createContext()

export const useData = () => { return useContext(DataContext) }

export const DataContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({ username: 'name' })

    const getUserData = (uid) => {

    }

    const createUserDocument = async ({ username, email }) => {
        data = {
            username: username,
            email: email,
            minecoins: 0
        }
        await setDoc(doc(db, 'users', uid), data)
    }

    return <DataContext.Provider value={{
        userData
    }}>
        {children}
    </DataContext.Provider>
}