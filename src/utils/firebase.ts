import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useEffect, useState } from "react";
import { showError } from "../App";

const firebaseConfig = {
  apiKey: "AIzaSyD5ZeFhldR21ttkQRK-egf5cAyNmMcNB90",
  authDomain: "pv247-project-pctt.firebaseapp.com",
  projectId: "pv247-project-pctt",
  storageBucket: "pv247-project-pctt.appspot.com",
  messagingSenderId: "214346369739",
  appId: "1:214346369739:web:0dc5ca2d7d85651cb0e94e"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = () => {
  auth
    .signInWithPopup(googleProvider)
    .catch(error => {
      return showError(error);
    });
};

export const useLoggedInUser = () => {
  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => setUser(u));
  }, []);

  return user;
};

export const logout = () => firebase.auth().signOut();