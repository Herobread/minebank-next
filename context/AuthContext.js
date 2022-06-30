import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const useAuth = () => { return useContext(AuthContext) }

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ uid: user.uid, email: user.email })
            } else {
                // setUser(null)
            }
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const createUserDocument = async (uid, data) => {
        console.log(uid, data)
        await setDoc(doc(db, 'users', uid), data)
            .catch(error => { console.log(error) })
    }

    const signup = async ({ email, password, username }) => {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const { uid } = res.user

                createUserDocument(uid, {
                    minecoins: 100,
                    username: username,
                    email: email
                })
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
        createUserDocument,
        login,
        signup,
        logout,
    }}>
        {loading ? 'Loading' : children}
    </AuthContext.Provider>
}