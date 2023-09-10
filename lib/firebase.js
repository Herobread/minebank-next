import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app, process.env.NEXT_PUBLIC_STORAGE_BUCKET)