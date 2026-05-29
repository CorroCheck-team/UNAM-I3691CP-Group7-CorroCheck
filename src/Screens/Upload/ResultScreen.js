import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Header, ScreenShell } from "../../components/AppScaffold";
import InspectionResultCard from "../../components/InspectionResultCard";
import { defaultInspection } from "../../data/inspections";

export default function ResultScreen({ navigation, route }) {
  const [saved, setSaved] = useState(false);
  const inspection = {
    ...defaultInspection,
    ...route?.params?.item,
  };

  const viewHistory = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigation.navigate("HistoryDetails", { item: inspection });
    }, 900);
  };

  return (
    <ScreenShell>
      <Header title="Inspection Result" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <InspectionResultCard compact inspection={inspection} />

        <Pressable onPress={viewHistory} style={styles.primaryButton}>
          <Ionicons name="time-outline" size={24} color="#b7c9dd" />
          <Text style={styles.primaryText}>View History</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Home")} style={styles.secondaryButton}>
          <Ionicons name="home-outline" size={23} color="#1e3f68" />
          <Text style={styles.secondaryText}>Back to Home</Text>
        </Pressable>
      </ScrollView>

      <Modal transparent visible={saved} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alertCard}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={86} color="#08bd24" />
            </View>
            <Text style={styles.alertTitle}>Saved!</Text>
            <Text style={styles.alertMessage}>Inspection submitted{"\n"}successfully.</Text>
          </View>
        </View>
      </Modal>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 26,
    paddingTop: 8,
    paddingBottom: 16,
  },
  primaryButton: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginHorizontal: 4,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#1e3f68",
  },
  primaryText: {
    color: "#b7c9dd",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginHorizontal: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#1e3f68",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  secondaryText: {
    color: "#1e3f68",
    fontSize: 16,
    fontWeight: "900",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(31,66,109,0.28)",
    padding: 26,
  },
  alertCard: {
    width: "100%",
    maxWidth: 350,
    minHeight: 305,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    backgroundColor: "#ffffff",
  },
  successCircle: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    borderRadius: 64,
    backgroundColor: "#c4f6c9",
  },
  alertTitle: {
    color: "#1e3f68",
    fontSize: 36,
    fontWeight: "900",
  },
  alertMessage: {
    marginTop: 22,
    color: "#1e3f68",
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
  },
});
