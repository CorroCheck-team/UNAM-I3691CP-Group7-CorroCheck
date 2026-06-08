import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  StyleSheet,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { uploadImageToFirebase } from "../../services/uploadService";

import { db } from "../../../firebase/config";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function UploadScreen() {

  const [image, setImage] = useState(null);

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadInspection = async () => {

    try {

      if (!image) {
        Alert.alert("Please select an image");
        return;
      }

      // Upload image to Firebase Storage
      const photoURL = await uploadImageToFirebase(image);

      // Save inspection to Firestore
      await addDoc(collection(db, "inspections"), {
        photoURL: photoURL,
        createdAt: serverTimestamp(),
        corrosionLevel: "Medium",
        inspector: "Elizabeth",
      });

      Alert.alert("Success", "Inspection uploaded");

      setImage(null);

    } catch (error) {

      console.log(error);

      Alert.alert("Upload Failed");
    }
  };

  return (
    <View style={styles.container}>

      <Button title="Pick Image" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <Button
        title="Upload Inspection"
        onPress={uploadInspection}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  image: {
    width: 250,
    height: 250,
    marginVertical: 20,
    alignSelf: "center",
  },
});