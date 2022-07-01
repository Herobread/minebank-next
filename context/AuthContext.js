import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, onSnapshot, query, runTransaction, setDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const useAuth = () => { return useContext(AuthContext) }

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribeUserData = () => { }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ uid: user.uid, email: user.email })
            } else {
                setUser(null)
                setUserData(null)
            }

            unsubscribeUserData = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                console.log('snapshot')
                console.log('reading', user.uid)
                console.log(doc.data())

                if (doc.data() === undefined) {
                    createUserDocument(user.uid, {
                        minecoins: 100,
                        name: user.uid,
                        isAdmin: false
                    })
                }
                setUserData(doc.data())
            })

            setLoading(false)
        })

        return () => {
            unsubscribe()
            unsubscribeUserData()
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

    const updateUser = async (uid, data) => {
        return await setDoc(doc(db, 'users', uid), data, { merge: true })
    }

    const getUserUid = async (name) => {
        const q = query(
            collection(db, 'users'),
            where('username', '==', name),
            limit(1)
        )

        const possibleUsers = await getDocs(q)
        if (possibleUsers.docs.length === 0)
            return null

        const recipientUid = possibleUsers.docs[0].id

        return recipientUid
    }

    const getUserData = async ({ name, uid }) => {
        let docRef = ''

        if (name) {
            docRef = doc(db, 'users', getUserUid(name))
        } else if (uid) {
            docRef = doc(db, 'users', uid)
        } else {
            return null
        }

        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log(docSnap.data())
            return docSnap.data()
        } else {
            return null
        }
    }

    const transfer = async ({ sender, senderUid, recipient, recipientUid, amount, comment }) => {
        runTransaction(db, async (transaction) => {
            senderUid = senderUid || await getUserUid(sender)
            recipientUid = recipientUid || await getUserUid(recipient)

            console.log(recipient, recipientUid, recipientData)

            let senderData = await getUserData({ uid: senderUid })
            let recipientData = await getUserData({ uid: recipientUid })

            console.log(recipient, recipientUid, recipientData)

            if (senderData.minecoins < amount) {
                return Promise.reject("Not enough money")
            }

            if (recipientData === null) {
                return Promise.reject("User not found")
            }

            if (senderData['transactions'] === undefined) {
                senderData['transactions'] = []
            }
            if (recipientData['transactions'] === undefined) {
                recipientData['transactions'] = []
            }

            const newSenderData = {
                minecoins: (parseInt(senderData['minecoins']) - parseInt(amount)),
                transfers: senderData['transactions'].concat([{
                    timestamp: '123456',
                    amount: `-${amount}`,
                    user: recipientData['username'],
                    tags: ['transfer', 'out'],
                    comment: comment
                }])
            }
            const newRecipientData = {
                minecoins: (parseInt(recipientData['minecoins']) + parseInt(amount)),
                transfers: recipientData['transactions'].concat([{
                    timestamp: '123456',
                    amount: `${amount}`,
                    user: senderData['username'],
                    tags: ['transfer', 'in'],
                    comment: comment
                }])
            }

            transaction.update(doc(db, 'users', senderUid), newSenderData)
            transaction.update(doc(db, 'users', recipientUid), newRecipientData)
        })
    }

    return <AuthContext.Provider value={{
        user,
        userData,
        createUserDocument,
        transfer,
        login,
        signup,
        logout,
    }}>
        {loading ? 'Loading' : children}
    </AuthContext.Provider>
}