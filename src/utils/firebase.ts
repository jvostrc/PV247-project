import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useEffect, useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAWLOG84nIGru7qGg5flGDv8Wn0zHIgzNo",
    authDomain: "pv247-project-pcct.firebaseapp.com",
    projectId: "pv247-project-pcct",
    storageBucket: "pv247-project-pcct.appspot.com",
    messagingSenderId: "388644423864",
    appId: "1:388644423864:web:2cb3501501d48f568c0c4d"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  type User = Pick<firebase.User, 'uid' | 'email'>;

  export type WishlistCard = { // we will need to expand this in order to store wishlist card info here
    owner: User;
    cardName: string;
  }

  export const wishlistCollection = db.collection('wishlist') as firebase.firestore.CollectionReference<WishlistCard>;

  export type MyCard = { // we will need to expand this in order to store collected card info here
    owner: User;
    cardName: string;
  }

  export const myCardCollection = db.collection('card') as firebase.firestore.CollectionReference<MyCard>;

  export const googleLogin = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }

  export const useLoggedInUser = () => {
  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => setUser(u));
  }, []);

  return user;
};

export const logout = () => firebase.auth().signOut(); console.log("User Signed Out!")