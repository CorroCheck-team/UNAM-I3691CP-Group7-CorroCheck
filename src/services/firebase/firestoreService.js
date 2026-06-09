import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Save a new inspection report under users/{userId}/scans
export const saveReport = async (userId, reportData) => {
  const scansRef = collection(db, "users", userId, "scans");
  const docRef = await addDoc(scansRef, {
    ...reportData,
    date: serverTimestamp(),
  });
  return docRef.id;
};

// Get all scans for a user, newest first
export const getHistory = async (userId) => {
  const scansRef = collection(db, "users", userId, "scans");
  const q = query(scansRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Get a single scan by ID
export const getReportById = async (userId, scanId) => {
  const docRef = doc(db, "users", userId, "scans", scanId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};
