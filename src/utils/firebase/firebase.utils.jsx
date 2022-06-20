import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCzuE0xc80POxT4fYHtWhoe7Fo9BQabswA",
    authDomain: "dogwood-range-239910.firebaseapp.com",
    databaseURL: "https://dogwood-range-239910.firebaseio.com",
    projectId: "dogwood-range-239910",
    storageBucket: "dogwood-range-239910.appspot.com",
    messagingSenderId: "175725944366",
    appId: "1:175725944366:web:75d9cb536ee048dd1589bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)


export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShop = await getDoc(userDocRef);
    console.log(userSnapShop);

    console.log(userSnapShop.exists());

    if (!userSnapShop.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            const result = await setDoc(
                userDocRef,
                {displayName, email, createdAt, ...additionalInformation}
            )
        } catch (e) {
            console.log("error crrating the user: ", e.message);
        }
    } else {
        console.log("user exist!");
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
}
