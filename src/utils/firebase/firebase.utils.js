// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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
const googleProvider = new GoogleAuthProvider();

//Always prompt every user to select an account
googleProvider.setCustomParameters({
    prompt: 'select_account'    
});

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider); 

//Initialize firestore database
export const db = getFirestore(); 

//Adding Data to firebase db
//collectionKey -> name of the collection you want to add
//objectsToAdd -> data set to be added
//field -> title for each dataset to add 
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

//Get products and categories from Firestore
export const getCategoriesAndDocuments = async  () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
};


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

//Sign in Authenticated user
export const signInAuthUserWithEmaillAndPassword = async (email, password) => {
    if(!email || !password) return; //If there's no email or password don't create new user 
    return await signInWithEmailAndPassword( auth, email, password);
} 

//Sign out Authenticated User
export const signOutUser = async () => await signOut(auth);

//Setup Firebase Auth event listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

//TODO:Fix issue with Responsivenes of the website
//TODO:Fix issue with signIn on Redirect
//SignIn with redirect doesnt succesfully authenticate and register a user on firebase and it doesnt return a signedIn state