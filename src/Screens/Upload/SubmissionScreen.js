import React, { useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { auth } from "../../services/firebase/firebaseConfig";
import { uploadImageToFirebase } from "../../services/uploadService";

const CORROSION_TYPES = ["Galvanic", "Pitting", "Crevice", "Oxidation-Corrosion"];

const BACKEND_URL = "https://unam-i3691cp-group7-corrocheck-production.up.railway.app";

export default function SubmissionScreen({ navigation }) {
  const [manualLocation, setManualLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [gpsLocation, setGpsLocation] = useState("Auto-detecting GPS...");
  const [corrosionType, setCorrosionType] = useState(null);
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setGpsLocation("GPS permission denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setGpsLocation(
        `${loc.coords.latitude.toFixed(5)}, ${loc.coords.longitude.toFixed(5)}`
      );
    })();
  }, []);

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Camera permission is required");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handlePhotoPress = () => {
    Alert.alert("Add Photo", "Choose an option", [
      { text: "Take Photo", onPress: handleOpenCamera },
      { text: "Choose from Gallery", onPress: handlePickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const convertToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`;
  };

  const handleSubmit = async () => {
    if (!photoUri) {
      Alert.alert("Error", "Please select a photo first");
      return;
    }
    if (!corrosionType) {
      Alert.alert("Error", "Please select a corrosion type");
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Error", "You must be logged in");
      return;
    }

    setShowAnalyzing(true);

    try {
      // Step 1: Upload image to Firebase Storage
      const photoURL = await uploadImageToFirebase(photoUri);

      // Step 2: Convert image to base64 for Roboflow
      const base64Image = await convertToBase64(photoUri);

      // Step 3: Send to Roboflow backend
      const response = await fetch(`${BACKEND_URL}/analyze-corrosion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Backend analysis failed");
      }

      const aiResult = await response.json();

      setShowAnalyzing(false);

      // Step 4: Navigate to Results with everything
      navigation.navigate("Results", {
        photoURL,
        corrosionType: aiResult.corrosionType || corrosionType,
        severity: aiResult.severity || "Unknown",
        confidence: aiResult.confidence || 0,
        location: manualLocation || gpsLocation,
        notes,
        userId,
      });
    } catch (error) {
      console.log(error);
      setShowAnalyzing(false);
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Inspection</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.photoArea} onPress={handlePhotoPress}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} resizeMode="cover" />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={36} color="#FFFFFF" style={{ marginBottom: 10 }} />
              <Text style={styles.photoPlaceholderText}>Tap to take or upload photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Corrosion type</Text>
        <View style={styles.corrosionTypeRow}>
          {CORROSION_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeChip, corrosionType === type && styles.typeChipSelected]}
              onPress={() => setCorrosionType(type)}
            >
              <Text style={[styles.typeChipText, corrosionType === type && styles.typeChipTextSelected]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Location</Text>
        <View style={styles.gpsInputWrapper}>
          <Ionicons name="location-outline" size={16} color="#8AAAC8" style={{ marginRight: 8 }} />
          <Text style={styles.gpsText}>{gpsLocation}</Text>
        </View>

        <Text style={styles.labelManual}>
          Location <Text style={styles.labelOverride}>(manual override)</Text>
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Pipeline section B-7"
            placeholderTextColor="#A8BDD0"
            value={manualLocation}
            onChangeText={setManualLocation}
          />
        </View>

        <Text style={styles.label}>Notes</Text>
        <View style={styles.notesWrapper}>
          <TextInput
            style={styles.notesInput}
            placeholder="Add inspection notes..."
            placeholderTextColor="#A8BDD0"
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="share-outline" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
          <Text style={styles.submitText}>Submit Inspection</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      <Modal visible={showAnalyzing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.statusCard}>
            <ActivityIndicator size={60} color="#8AAAC8" style={{ marginBottom: 20 }} />
            <Text style={styles.statusTitle}>Analyzing image</Text>
            <Text style={styles.statusSubtitle}>Please wait...</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={showError} transparent animationType="fade" onRequestClose={() => setShowError(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowError(false)}>
          <View style={styles.statusCard}>
            <View style={styles.errorCircle}>
              <Ionicons name="close" size={40} color="#E53935" />
            </View>
            <Text style={styles.statusTitle}>Upload failed</Text>
            <Text style={styles.statusSubtitle}>Something went wrong.{"\n"}Try again.</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F2F5" },
  header: { backgroundColor: "#1A3050", paddingTop: 55, paddingBottom: 18, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", letterSpacing: 0.3 },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 18, paddingTop: 16 },
  photoArea: { backgroundColor: "#7A8FA6", borderRadius: 14, height: 180, marginBottom: 18, overflow: "hidden", justifyContent: "center", alignItems: "center" },
  photoPlaceholder: { alignItems: "center", justifyContent: "center" },
  photoPlaceholderText: { color: "#FFFFFF", fontSize: 14, fontWeight: "500" },
  photoPreview: { width: "100%", height: "100%" },
  label: { color: "#1A3050", fontSize: 13, fontWeight: "500", marginBottom: 6, marginLeft: 2 },
  labelManual: { fontSize: 13, fontWeight: "500", marginBottom: 6, marginLeft: 2, color: "#1A3050" },
  labelOverride: { color: "#8AAAC8", fontWeight: "400" },
  corrosionTypeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  typeChip: { borderWidth: 1.5, borderColor: "#A8BDD0", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#FFFFFF" },
  typeChipSelected: { backgroundColor: "#1A3050", borderColor: "#1A3050" },
  typeChipText: { color: "#5A7A9A", fontSize: 13, fontWeight: "500" },
  typeChipTextSelected: { color: "#FFFFFF" },
  gpsInputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 10, paddingHorizontal: 16, height: 48, marginBottom: 14, borderWidth: 1, borderColor: "#D8E3EE" },
  gpsText: { color: "#A8BDD0", fontSize: 14 },
  inputWrapper: { backgroundColor: "#FFFFFF", borderRadius: 10, paddingHorizontal: 16, height: 48, marginBottom: 14, justifyContent: "center", borderWidth: 1, borderColor: "#D8E3EE" },
  input: { color: "#1A3050", fontSize: 14 },
  notesWrapper: { backgroundColor: "#FFFFFF", borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12, height: 110, marginBottom: 20, borderWidth: 1, borderColor: "#D8E3EE" },
  notesInput: { color: "#1A3050", fontSize: 14, flex: 1 },
  submitButton: { backgroundColor: "#1A3050", borderRadius: 14, paddingVertical: 18, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  submitText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" },
  statusCard: { backgroundColor: "#FFFFFF", borderRadius: 20, paddingVertical: 40, paddingHorizontal: 40, alignItems: "center", width: "78%", elevation: 8 },
  statusTitle: { color: "#1A3050", fontSize: 18, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  statusSubtitle: { color: "#5A7A9A", fontSize: 14, textAlign: "center", lineHeight: 22 },
  errorCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#FFCDD2", alignItems: "center", justifyContent: "center", marginBottom: 20 },
});
