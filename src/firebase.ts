import { signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
  increment,
} from "firebase/firestore";

import { IRegistrationForm, ITransactionsItem, IUser } from "./models/User";

const firebaseConfig = {
  apiKey: "AIzaSyDPJNRHa8ZDp4yM-eB22TDuzgcEYOmJAXs",
  authDomain: "tippdigger.firebaseapp.com",
  projectId: "tippdigger",
  storageBucket: "tippdigger.appspot.com",
  messagingSenderId: "1062049212701",
  appId: "1:1062049212701:web:8252cc414f7a9239e9d9f4",
  measurementId: "G-2WQTL2EJ8Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// AUTH

export const AUTH = {
  signUp: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  logout: () => {
    return signOut(auth);
  },

  login: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
};

// DB

const userCollectionRef = collection(db, "users");
export const DB = {
  createUser: async (formData: IRegistrationForm) => {
    // сначала авторизуемся по почту, затем создаем пользователя в базе
    const authResp = await AUTH.signUp(formData.email, formData.password);

    if (authResp.user.email) {
      const newUser: Omit<IUser, "id"> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        balance: formData.balance,
        phone: formData.phone,
        email: authResp.user.email,
        company: formData.company,
        city: formData.city,
        accountType: formData.accountType,
        rating: formData.rating,
        access: formData.access,
        transactions: formData.transactions,
      };

      const creatResp = await addDoc(userCollectionRef, newUser);
      const userSnap = await getDoc(creatResp);
      return { ...userSnap.data(), id: userSnap.id } as IUser;
    } else {
      return "Ошибка авторизации";
    }
  },

  getUserByEmail: async (email: string) => {
    const q = query(userCollectionRef, where("email", "==", email));
    return getDocs(q);
  },
  getUserById: async (id: string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    return docSnap;
  },
  addTransaction: async (id: string, transaction: ITransactionsItem) => {
    const docRef = doc(db, "users", id);
    return updateDoc(docRef, {
      balance: increment(Number(transaction.sum)),
      transactions: arrayUnion(transaction),
    });
  },
};

// Custom hooks
