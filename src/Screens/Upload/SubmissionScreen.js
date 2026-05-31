import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CORROSION_TYPES = ["Uniform", "Galvanic", "Pitting", "Crevice"];

export default function SubmissionScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    // TODO (Backend team): Upload photo to Firebase Storage, then call Roboflow API
    // For now we simulate: show analyzing for 3 seconds then go to Results
    setShowAnalyzing(true);
    setTimeout(() => {
      setShowAnalyzing(false);
      // Randomly simulate error for testing — backend team removes this
      const simulateError = false;
      if (simulateError) {
        setShowError(true);
      } else {
        navigation.navigate("Results", {
          corrosionType: selectedType,
          location: manualLocation,
          notes: notes,
        });
      }
    }, 3000);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Inspection</Text>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Photo upload area */}
        <TouchableOpacity
          style={styles.photoArea}
          onPress={() => {
            // TODO (Backend team): Implement image picker
            // Use expo-image-picker: launchImageLibraryAsync or launchCameraAsync
          }}
        >
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} resizeMode="cover" />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={36} color="#FFFFFF" style={{ marginBottom: 10 }} />
              <Text style={styles.photoPlaceholderText}>Tap to take or upload photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Corrosion type */}
        <Text style={styles.label}>Corrosion type</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowDropdown(true)}
        >
          <Text style={[styles.dropdownText, selectedType ? styles.dropdownSelected : null]}>
            {selectedType || "Select type"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#8AAAC8" />
        </TouchableOpacity>

        {/* GPS Location */}
        <Text style={styles.label}>Location</Text>
        <View style={styles.gpsInputWrapper}>
          <Ionicons name="location-outline" size={16} color="#8AAAC8" style={{ marginRight: 8 }} />
          <Text style={styles.gpsText}>Auto-detecting GPS...</Text>
        </View>

        {/* Manual Location */}
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

        {/* Notes */}
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

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="share-outline" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
          <Text style={styles.submitText}>Submit Inspection</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── Dropdown Modal ── */}
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownCard}>
            {CORROSION_TYPES.map((type, index) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.dropdownItem,
                  index < CORROSION_TYPES.length - 1 && styles.dropdownItemBorder,
                ]}
                onPress={() => handleSelectType(type)}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
                <View
                  style={[
                    styles.radioCircle,
                    selectedType === type && styles.radioCircleSelected,
                  ]}
                >
                  {selectedType === type && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ── Analyzing Modal ── */}
      <Modal
        visible={showAnalyzing}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.statusCard}>
            <ActivityIndicator size={60} color="#8AAAC8" style={{ marginBottom: 20 }} />
            <Text style={styles.statusTitle}>Analyzing image</Text>
            <Text style={styles.statusSubtitle}>Please wait...</Text>
          </View>
        </View>
      </Modal>

      {/* ── Error Modal ── */}
      <Modal
        visible={showError}
        transparent
        animationType="fade"
        onRequestClose={() => setShowError(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowError(false)}
        >
          <View style={styles.statusCard}>
            <View style={styles.errorCircle}>
              <Ionicons name="close" size={40} color="#E53935" />
            </View>
            <Text style={styles.statusTitle}>Upload failed</Text>
            <Text style={styles.statusSubtitle}>
              Something went wrong.{"\n"}Try again.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },

  // Header
  header: {
    backgroundColor: "#1A3050",
    paddingTop: 55,
    paddingBottom: 18,
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Body
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },

  // Photo area
  photoArea: {
    backgroundColor: "#7A8FA6",
    borderRadius: 14,
    height: 180,
    marginBottom: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  photoPlaceholderText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
  },

  // Labels
  label: {
    color: "#1A3050",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
    marginLeft: 2,
  },
  labelManual: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
    marginLeft: 2,
    color: "#1A3050",
  },
  labelOverride: {
    color: "#8AAAC8",
    fontWeight: "400",
  },

  // Dropdown button
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8E3EE",
  },
  dropdownText: {
    flex: 1,
    color: "#A8BDD0",
    fontSize: 14,
  },
  dropdownSelected: {
    color: "#1A3050",
    fontWeight: "500",
  },

  // GPS input
  gpsInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8E3EE",
  },
  gpsText: {
    color: "#A8BDD0",
    fontSize: 14,
  },

  // Text input
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D8E3EE",
  },
  input: {
    color: "#1A3050",
    fontSize: 14,
  },

  // Notes
  notesWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 110,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D8E3EE",
  },
  notesInput: {
    color: "#1A3050",
    fontSize: 14,
    flex: 1,
  },

  // Submit button
  submitButton: {
    backgroundColor: "#1A3050",
    borderRadius: 14,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Dropdown card
  dropdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: "80%",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F5",
  },
  dropdownItemText: {
    flex: 1,
    color: "#1A3050",
    fontSize: 15,
    fontWeight: "500",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#C0D0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#1A3050",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1A3050",
  },

  // Status cards (analyzing + error)
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "78%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  statusTitle: {
    color: "#1A3050",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  statusSubtitle: {
    color: "#5A7A9A",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  errorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFCDD2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});