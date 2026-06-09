import { db } from "./firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const createUserDocument = async (userId, fullName, email) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    name: fullName,
    email: email,
    createdAt: serverTimestamp(),
  });
};