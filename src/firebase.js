import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBbvEL-Z1kA5wFNz8zxVBBQimhaZIUh5M4",
    authDomain: "nightparty-cc2f9.firebaseapp.com",
    projectId: "nightparty-cc2f9",
    storageBucket: "nightparty-cc2f9.appspot.com",
    messagingSenderId: "743712538204",
    appId: "1:743712538204:web:aa8b0f9e0708738ddd7099",
    measurementId: "G-ZMZNWTNCQE"
});

export const db = getFirestore(firebaseApp)
export const todosRef = collection(db, 'todos')
