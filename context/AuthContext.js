import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const useAuth = () => { return useContext(AuthContext) }

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('here')
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ uid: user.uid, email: user.email })
            } else {
                // setUser(null)
            }
            setLoading(false)
        })

        return () => {
            console.log('unsub')
            unsubscribe()
        }
    }, [])

    const signup = async ({ email, password, username }) => {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res)
                console.log(username)
            })
    }

    const login = async ({ email, password }) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        console.log('log out')
        setUser(null)
        await signOut(auth)
    }

    return <AuthContext.Provider value={{
        user,
        login,
        signup,
        logout,
    }}>
        {loading ? 'Loading' : children}
    </AuthContext.Provider>
}