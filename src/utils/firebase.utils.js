// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
 } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOLzH5NTeYD_DKvQ6iOsVk-7Cvwp_5D5w",
  authDomain: "colchi-clothing-db.firebaseapp.com",
  projectId: "colchi-clothing-db",
  storageBucket: "colchi-clothing-db.appspot.com",
  messagingSenderId: "800131861362",
  appId: "1:800131861362:web:2ed39b00005d701fdbabeb"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Provider
const provider = new GoogleAuthProvider();

//Always prompt every user to select an account
provider.setCustomParameters({
    prompt: 'select_account'    
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

//Initialize firestore database
export const db = getFirestore(); 

//Create user data from Google Auth and add to Firestore Database
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return; //Return if the user wasn't authenticated
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //Check if user data exists.
    //If user does not exist, set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error Creating User', error.message);
        }
    }

    //If user data exists, return useDocRef
    return userDocRef;
} 

//Create User from Email and Password provided if it exists
export const createAuthUserWithEmaillAndPassword = async (email, password) => {
    if(!email || !password) return; //If there's no email or password don't create new user 
    return await createUserWithEmailAndPassword( auth, email, password);
}