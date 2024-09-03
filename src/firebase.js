import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBBYm5E6toVhl0C1r7JDQQ04MrQkuA9i-k",
  authDomain: "netflix-clone-f54b5.firebaseapp.com",
  projectId: "netflix-clone-f54b5",
  storageBucket: "netflix-clone-f54b5.appspot.com",
  messagingSenderId: "1019713666059",
  appId: "1:1019713666059:web:15b4fc9c1a8625e6df5b0e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      EmailAuthProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout};