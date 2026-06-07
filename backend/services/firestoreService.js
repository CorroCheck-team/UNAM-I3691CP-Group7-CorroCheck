import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/env";

// FR008 — Save a completed inspection report
export const saveReport = async (userId, reportData) => {
  try {
    const scansRef = collection(db, "users", userId, "scans");

    const docRef = await addDoc(scansRef, {
      photoURL: reportData.photoURL,
      corrosionType: reportData.corrosionType,
      severity: reportData.severity,
      confidence: reportData.confidence,
      location: reportData.location,
      notes: reportData.notes || "",
      date: serverTimestamp(),
    });

    console.log("Report saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving report:", error);
    throw error;
  }
};

// FR009 — Fetch all reports for the logged-in user
export const getHistory = async (userId) => {
  try {
    const scansRef = collection(db, "users", userId, "scans");
    const q = query(scansRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push({
        scanId: doc.id,
        ...doc.data(),
      });
    });

    return reports;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

// FR010 — Fetch a single inspection report by ID
export const getReportById = async (userId, scanId) => {
  try {
    const scanRef = doc(db, "users", userId, "scans", scanId);
    const scanSnap = await getDoc(scanRef);

    if (scanSnap.exists()) {
      return {
        scanId: scanSnap.id,
        ...scanSnap.data(),
      };
    } else {
      console.warn("No report found with ID:", scanId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error;
  }
};