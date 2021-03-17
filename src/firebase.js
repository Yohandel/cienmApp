import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAK8Q-kBsHm5U9-tdXriwynkBR1KOt5Ajs",
    authDomain: "cinemappycm.firebaseapp.com",
    projectId: "cinemappycm",
    storageBucket: "cinemappycm.appspot.com",
    messagingSenderId: "31479279041",
    appId: "1:31479279041:web:3d0913c3aff4d623bf9340"
})


export const auth = app.auth();
export const db = firebase.firestore();
export default app;