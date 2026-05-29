import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { BottomNav, Header, ScreenShell } from "../../components/AppScaffold";

const corrosionTypes = ["Uniform", "Galvanic", "Pitting", "Crevice"];

export default function UploadScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [photoSelected, setPhotoSelected] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const submit = () => {
    setLoading(true);
    setFailed(false);

    setTimeout(() => {
      setLoading(false);
      if (!photoSelected || !selectedType || !location.trim()) {
        setFailed(true);
        return;
      }

      navigation.navigate("Results", {
        item: {
          corrosionType: selectedType,
          location,
          notes: notes || "Visible rust forming along the weld seam. Needs urgent attention.",
        },
      });
    }, 350);
  };

  return (
    <ScreenShell activeTab="Upload">
      <Header title="New Inspection" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => setPhotoSelected(true)}
          style={[styles.photoBox, photoSelected && styles.photoBoxSelected]}
        >
          <Ionicons name={photoSelected ? "image-outline" : "camera-outline"} size={45} color="#ffffff" />
          <Text style={styles.photoText}>
            {photoSelected ? "Photo ready for analysis" : "Tap to take or upload photo"}
          </Text>
        </Pressable>

        <Text style={styles.label}>Corrosion type</Text>
        <Pressable onPress={() => setDropdownOpen(true)} style={styles.select}>
          <Text style={[styles.selectText, selectedType && styles.selectTextActive]}>
            {selectedType || "Select type"}
          </Text>
          <Ionicons name="chevron-down" size={25} color="#b7c9dd" />
        </Pressable>

        <Text style={styles.label}>Location</Text>
        <View style={styles.inputRow}>
          <Ionicons name="location-outline" size={22} color="#b7c9dd" />
          <TextInput
            editable={false}
            placeholder="Auto-detecting GPS..."
            placeholderTextColor="#b7c9dd"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>
          Location <Text style={styles.mutedLabel}>(manual override)</Text>
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            onChangeText={setLocation}
            placeholder="e.g. Pipeline section B-7"
            placeholderTextColor="#b7c9dd"
            style={styles.input}
            value={location}
          />
        </View>

        <Text style={styles.label}>Notes</Text>
        <View style={styles.notesRow}>
          <TextInput
            multiline
            onChangeText={setNotes}
            placeholder="Add inspection notes..."
            placeholderTextColor="#b7c9dd"
            style={styles.notesInput}
            value={notes}
          />
        </View>

        <Pressable onPress={submit} style={styles.submitButton}>
          <Ionicons name="push-outline" size={25} color="#b7c9dd" />
          <Text style={styles.submitText}>Submit Inspection</Text>
        </Pressable>
      </ScrollView>

      <BottomNav activeTab="Upload" navigation={navigation} />

      <Modal transparent visible={dropdownOpen} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setDropdownOpen(false)}>
          <View style={styles.dropdownCard}>
            {corrosionTypes.map((type) => (
              <Pressable
                key={type}
                onPress={() => {
                  setSelectedType(type);
                  setDropdownOpen(false);
                }}
                style={styles.optionRow}
              >
                <Text style={styles.optionText}>{type}</Text>
                <Ionicons
                  name={selectedType === type ? "radio-button-on" : "radio-button-off"}
                  size={22}
                  color="#1e3f68"
                />
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <FeedbackOverlay
        icon={<ActivityIndicator color="#1e3f68" size="large" />}
        message="Please wait..."
        title="Analyzing image"
        visible={loading}
      />
      <FeedbackOverlay
        icon={<Ionicons name="close" size={96} color="#df1208" />}
        message="Something went wrong. Try again."
        onPress={() => setFailed(false)}
        title="Upload failed"
        visible={failed}
        danger
      />
    </ScreenShell>
  );
}

function FeedbackOverlay({ danger, icon, message, onPress, title, visible }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable disabled={!onPress} onPress={onPress} style={styles.overlay}>
        <View style={styles.feedbackCard}>
          <View style={[styles.feedbackIcon, danger && styles.feedbackIconDanger]}>
            {icon}
          </View>
          <Text style={styles.feedbackTitle}>{title}</Text>
          <Text style={styles.feedbackMessage}>{message}</Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 10,
  },
  photoBox: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "#787881",
  },
  photoBoxSelected: {
    backgroundColor: "#657b94",
  },
  photoText: {
    marginTop: 14,
    color: "#eeeeee",
    fontSize: 17,
    fontWeight: "700",
  },
  label: {
    marginTop: 3,
    marginBottom: 2,
    color: "#1e3f68",
    fontSize: 14,
  },
  mutedLabel: {
    color: "#b7c9dd",
  },
  select: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "#b7c9dd",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  selectText: {
    color: "#b7c9dd",
    fontSize: 16,
  },
  selectTextActive: {
    color: "#1e3f68",
  },
  inputRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "#b7c9dd",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    color: "#1e3f68",
    fontSize: 16,
    paddingVertical: 0,
  },
  notesRow: {
    height: 102,
    paddingHorizontal: 13,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: "#b7c9dd",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  notesInput: {
    flex: 1,
    color: "#1e3f68",
    fontSize: 16,
    textAlignVertical: "top",
  },
  submitButton: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 18,
    borderRadius: 9,
    backgroundColor: "#1e3f68",
  },
  submitText: {
    color: "#b7c9dd",
    fontSize: 20,
    fontWeight: "900",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(31,66,109,0.28)",
    padding: 26,
  },
  dropdownCard: {
    width: 210,
    paddingVertical: 18,
    borderRadius: 21,
    backgroundColor: "#ffffff",
  },
  optionRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  optionText: {
    color: "#1e3f68",
    fontSize: 16,
  },
  feedbackCard: {
    width: "100%",
    maxWidth: 350,
    minHeight: 305,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    backgroundColor: "#ffffff",
  },
  feedbackIcon: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    borderRadius: 64,
    backgroundColor: "#ffffff",
  },
  feedbackIconDanger: {
    backgroundColor: "#f6bcbc",
  },
  feedbackTitle: {
    color: "#1e3f68",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  feedbackMessage: {
    marginTop: 22,
    color: "#1e3f68",
    fontSize: 26,
    lineHeight: 34,
    textAlign: "center",
  },
});
