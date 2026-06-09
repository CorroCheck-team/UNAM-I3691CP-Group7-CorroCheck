import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/firebaseConfig";

export const uploadImageToFirebase = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = `inspection_${Date.now()}.jpg`;
    const storageRef = ref(storage, `inspectionPhotos/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log("Upload Error:", error);
    throw error;
  }
};
