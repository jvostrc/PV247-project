import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAWLOG84nIGru7qGg5flGDv8Wn0zHIgzNo",
    authDomain: "pv247-project-pcct.firebaseapp.com",
    projectId: "pv247-project-pcct",
    storageBucket: "pv247-project-pcct.appspot.com",
    messagingSenderId: "388644423864",
    appId: "1:388644423864:web:2cb3501501d48f568c0c4d"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  export const googleLogin = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
      console.log(res.user)
    }).catch((error) => {
      console.log(error.message)
    })
  }