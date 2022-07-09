import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, query, runTransaction, setDoc, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const useAuth = () => { return useContext(AuthContext) }

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [shopData, setShopData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribeUserData = () => { }

        const unsubscribeShopData = onSnapshot(collection(db, 'products'), (docs) => {
            const products = []

            docs.forEach(doc => {
                products.push(doc.data())
            })

            setShopData(products)
        })


        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ uid: user.uid, email: user.email })
            } else {
                setUser(null)
                setUserData(null)
            }

            if (user) {
                unsubscribeUserData = onSnapshot(doc(db, 'users', user.uid), (doc) => {
                    if (doc.data() === undefined) {
                        createUserDocument(user.uid, {
                            minecoins: 100,
                            username: user.uid,
                            transactions: []
                        })
                    }
                    setUserData(doc.data())
                })
            }

            setLoading(false)
        })

        return () => {
            unsubscribe()
            unsubscribeUserData()
        }
    }, [])

    const createUserDocument = async (uid, data) => {
        await setDoc(doc(db, 'users', uid), data)
            .catch(error => { console.log(error) })
    }

    const signup = async ({ email, password, username }) => {
        const isSameName = await getUserUid(username)

        if (isSameName) {
            throw { message: 'User with this name already exists' }
        }

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
        setUser(null)
        await signOut(auth)
    }

    const updateUserData = async (uid, data) => {
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
            return docSnap.data()
        } else {
            return null
        }
    }

    const transfer = async ({ sender, senderUid, recipient, recipientUid, amount, comment }) => {
        senderUid = senderUid || await getUserUid(sender)
        recipientUid = recipientUid || await getUserUid(recipient)

        let senderData = await getUserData({ uid: senderUid })
        let recipientData = await getUserData({ uid: recipientUid })

        if (senderData.minecoins < amount) {
            throw 'You don`t have enough money to make this payment'
        }

        if (recipientData === null) {
            const indexOfOutdatedName = senderData?.recent.indexOf(recipient)

            if (indexOfOutdatedName !== -1) {
                senderData.recent.splice(indexOfOutdatedName, 1)
                const newSenderData = { recent: senderData.recent }
                await setDoc(doc(db, 'users', senderUid), newSenderData, { merge: true })
            }

            throw 'User was not found'
        }

        if (recipientData['username'] === senderData['username']) {
            throw 'You can`t transfer money to yourself'
        }

        let timestamp = new Date()
        timestamp = timestamp.getTime()

        if (senderData['transactions'] === undefined) {
            senderData['transactions'] = []
        }
        if (senderData['recent'] === undefined) {
            senderData['recent'] = []
        }
        if (!senderData['recent'].includes(recipientData['username'])) {
            senderData['recent'].push(recipientData['username'])
        }

        if (recipientData['transactions'] === undefined) {
            recipientData['transactions'] = []
        }
        if (recipientData['recent'] === undefined) {
            recipientData['recent'] = []
        }
        if (!recipientData['recent'].includes(senderData['username'])) {
            recipientData['recent'].push(senderData['username'])
        }

        const senderImg = senderData.img || null
        const recipientImg = recipientData.img || null

        const newSenderData = {
            minecoins: (parseInt(senderData['minecoins']) - parseInt(amount)),
            transactions: senderData['transactions'].concat([{
                timestamp: timestamp,
                amount: `-${amount}`,
                user: recipientData['username'],
                img: recipientImg,
                tags: ['transfer', 'out'],
                comment: comment
            }]),
            recent: senderData['recent']
        }
        const newRecipientData = {
            minecoins: (parseInt(recipientData['minecoins']) + parseInt(amount)),
            transactions: recipientData['transactions'].concat([{
                timestamp: timestamp,
                amount: `${amount}`,
                user: senderData['username'],
                img: senderImg,
                tags: ['transfer', 'in'],
                comment: comment
            }]),
            recent: recipientData['recent']
        }

        await setDoc(doc(db, 'users', senderUid), newSenderData, { merge: true })
        await setDoc(doc(db, 'users', recipientUid), newRecipientData, { merge: true })
    }

    const createProduct = async (uid, userData, data) => {
        let { name, price, inStock, img, description } = data

        description ??= ''

        let timestamp = new Date()
        timestamp = timestamp.getTime()

        const id = timestamp.toString()

        let productData = {
            authorUid: uid,
            authorUsername: userData['username'],
            product: {
                sold: 0,
                name: name,
                price: parseInt(price),
                inStock: parseInt(inStock),
                img: img,
                description: description,
                created: parseInt(timestamp)
            },
            reviews: []
        }

        await setDoc(doc(db, 'products', id), productData)
    }

    async function updateProduct(id, data) {
        return await updateDoc(doc(db, "products", id), data, { merge: true })
    }

    async function deleteProduct(id) {
        return await deleteDoc(doc(db, 'products', id))
    }

    const findProduct = (id) => {
        return shopData?.find(item => {
            if (item.product.created === parseInt(id))
                return item
        })
    }

    return <AuthContext.Provider value={{
        user,
        userData,
        shopData,
        getUserUid,
        createUserDocument,
        updateUserData,
        transfer,
        login,
        signup,
        logout,
        createProduct,
        updateProduct,
        deleteProduct,
        findProduct
    }}>
        {loading ? 'Loading' : children}
    </AuthContext.Provider>
}