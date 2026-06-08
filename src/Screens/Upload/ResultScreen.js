import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../services/firebase/firebaseConfig";
import { saveReport } from "../../../backend/services/firestoreService";

export default function ResultScreen({ navigation, route }) {
  const {
    corrosionType = "Galvanic",
    location = "Pipeline Section B-7",
    notes = "Visible rust forming along the weld seam. Needs urgent attention.",
    severity = "High",
    confidence = 92,
    photoURL = null,
  } = route?.params || {};

  const [showSavedModal, setShowSavedModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const save = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.warn("No userId — report not saved. Auth not connected.");
        return;
      }
      setSaving(true);
      try {
        await saveReport(userId, {
          photoURL,
          corrosionType,
          severity,
          confidence,
          location,
          notes,
        });
        console.log("Report saved successfully");
      } catch (error) {
        console.error("Failed to save report:", error);
      } finally {
        setSaving(false);
      }
    };
    save();
  }, []);

  const getSeverityColor = () => {
    switch (severity) {
      case "High": return "#E53935";
      case "Moderate": return "#FB8C00";
      case "Low": return "#43A047";
      default: return "#E53935";
    }
  };

  const handleViewHistory = () => {
    setShowSavedModal(true);
    setTimeout(() => {
      setShowSavedModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs", params: { screen: "History" } }],
      });
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inspection Result</Text>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <View style={styles.photoArea}>
          <Ionicons name="image-outline" size={40} color="#FFFFFF" />
        </View>

        <View style={styles.severityCardWrapper}>
          <View style={[styles.severityBracket, { borderColor: getSeverityColor() }]} />
          <View style={styles.severityCard}>
            <Text style={styles.severityLabel}>SEVERITY</Text>
            <Text style={[styles.severityValue, { color: getSeverityColor() }]}>{severity}</Text>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{confidence}% confidence</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Ionicons name="flask-outline" size={18} color="#8AAAC8" style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Corrosion type</Text>
            <Text style={styles.detailValue}>{corrosionType}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color="#8AAAC8" style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>{location}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color="#8AAAC8" style={styles.detailIcon} />
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>
              Today, {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>

          <View style={[styles.detailRow, styles.notesRow]}>
            <View style={styles.notesTop}>
              <Ionicons name="document-text-outline" size={18} color="#8AAAC8" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Notes</Text>
            </View>
            <Text style={styles.notesText}>{notes}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewHistoryButton} onPress={handleViewHistory}>
          <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.viewHistoryText}>{saving ? "Saving..." : "View History"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backHomeButton} onPress={() => navigation.navigate("MainTabs")}>
          <Ionicons name="home-outline" size={18} color="#1A3050" style={{ marginRight: 8 }} />
          <Text style={styles.backHomeText}>Back to Home</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      <Modal visible={showSavedModal} transparent animationType="fade" onRequestClose={() => setShowSavedModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.savedCard}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={40} color="#22C55E" />
            </View>
            <Text style={styles.savedTitle}>Saved!</Text>
            <Text style={styles.savedMessage}>Inspection submitted{"\n"}successfully.</Text>
          </View>
        </View>
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
  photoArea: { backgroundColor: "#7A8FA6", borderRadius: 14, height: 180, marginBottom: 16, alignItems: "center", justifyContent: "center" },
  severityCardWrapper: { flexDirection: "row", marginBottom: 14 },
  severityBracket: { width: 5, borderRadius: 4, borderWidth: 2.5, marginRight: 0, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  severityCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 12, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, paddingVertical: 20, alignItems: "center", elevation: 3 },
  severityLabel: { color: "#8AAAC8", fontSize: 11, fontWeight: "600", letterSpacing: 1.2, marginBottom: 6 },
  severityValue: { fontSize: 32, fontWeight: "700", marginBottom: 10 },
  confidenceBadge: { backgroundColor: "#FFCDD2", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5 },
  confidenceText: { color: "#E53935", fontSize: 13, fontWeight: "500" },
  detailsSection: { backgroundColor: "#FFFFFF", borderRadius: 12, marginBottom: 14, overflow: "hidden", elevation: 3 },
  detailRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F0F2F5" },
  notesRow: { flexDirection: "column", alignItems: "flex-start", borderBottomWidth: 0 },
  notesTop: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  detailIcon: { marginRight: 10 },
  detailLabel: { color: "#8AAAC8", fontSize: 13, flex: 1 },
  detailValue: { color: "#1A3050", fontSize: 13, fontWeight: "500", textAlign: "right", flex: 1 },
  notesText: { color: "#1A3050", fontSize: 13, lineHeight: 20, paddingLeft: 28 },
  viewHistoryButton: { backgroundColor: "#1A3050", borderRadius: 14, paddingVertical: 17, flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  viewHistoryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  backHomeButton: { backgroundColor: "#FFFFFF", borderRadius: 14, paddingVertical: 17, flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#D8E3EE" },
  backHomeText: { color: "#1A3050", fontSize: 16, fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" },
  savedCard: { backgroundColor: "#FFFFFF", borderRadius: 20, paddingVertical: 40, paddingHorizontal: 50, alignItems: "center", width: "78%", elevation: 8 },
  checkCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  savedTitle: { color: "#1A3050", fontSize: 22, fontWeight: "700", marginBottom: 8 },
  savedMessage: { color: "#5A7A9A", fontSize: 15, textAlign: "center", lineHeight: 22 },
});