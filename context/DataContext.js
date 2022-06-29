import { useContext, createContext, useState } from 'react'

const DataContext = createContext()

export const useData = () => { return useContext(dataContext) }

export const DataContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    return <DataContext.Provider value={{
        userData
    }}>
        {children}
    </DataContext.Provider>
}