import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryDetailsScreen({ navigation, route }) {
  // Accept scan data passed via navigation params, or use fallback demo data
  const scan = route?.params?.scan || {
    photoURL: null,
    severity: "High",
    confidence: 92,
    corrosionType: "Galvanic",
    location: "Pipeline Section B-7",
    date: "Today, 09:42 AM",
    notes: "Visible rust forming along the weld seam. Needs urgent attention.",
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "#D32F2F";
      case "medium":
        return "#F57C00";
      case "low":
        return "#388E3C";
      default:
        return "#D32F2F";
    }
  };

  const severityColor = getSeverityColor(scan.severity);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Ionicons name="chevron-back-circle-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          {scan.photoURL ? (
            <Image
              source={{ uri: scan.photoURL }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={48} color="#9DB3C8" />
            </View>
          )}
        </View>

        {/* Severity Card */}
        <View style={styles.severityCard}>
          <View style={[styles.severityAccent, { backgroundColor: severityColor }]} />
          <View style={styles.severityContent}>
            <Text style={styles.severityLabel}>SEVERITY</Text>
            <Text style={[styles.severityValue, { color: severityColor }]}>
              {scan.severity}
            </Text>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>
                {scan.confidence}% confidence
              </Text>
            </View>
          </View>
        </View>

        {/* Detail Rows */}
        <View style={styles.detailsContainer}>
          {/* Corrosion Type */}
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="flask-outline" size={18} color="#5B8BB0" />
              <Text style={styles.detailLabel}>Corrosion type</Text>
            </View>
            <Text style={styles.detailValue}>{scan.corrosionType}</Text>
          </View>

          {/* Location */}
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="location-outline" size={18} color="#5B8BB0" />
              <Text style={styles.detailLabel}>Location</Text>
            </View>
            <Text style={styles.detailValue}>{scan.location}</Text>
          </View>

          {/* Date & Time */}
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="calendar-outline" size={18} color="#5B8BB0" />
              <Text style={styles.detailLabel}>Date & Time</Text>
            </View>
            <Text style={styles.detailValue}>{scan.date}</Text>
          </View>

          {/* Notes */}
          <View style={[styles.detailRow, styles.notesRow]}>
            <View style={styles.detailLeft}>
              <Ionicons name="document-text-outline" size={18} color="#5B8BB0" />
              <Text style={styles.detailLabel}>Notes</Text>
            </View>
            <Text style={[styles.detailValue, styles.notesText]}>
              {scan.notes || "No notes added."}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Back to History Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backToHistoryButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backToHistoryText}>Back to History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A3050",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    padding: 2,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  headerRight: {
    width: 32,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 16,
  },

  // Image
  imageContainer: {
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#D0D8E4",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C8D4E0",
  },

  // Severity Card
  severityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#1A3050",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  severityAccent: {
    width: 5,
    borderRadius: 3,
    margin: 10,
  },
  severityContent: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingRight: 16,
  },
  severityLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: "#8AAAC8",
    marginBottom: 4,
  },
  severityValue: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 10,
  },
  confidenceBadge: {
    backgroundColor: "#FDECEA",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  confidenceText: {
    fontSize: 13,
    color: "#D32F2F",
    fontWeight: "500",
  },

  // Detail Rows
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#1A3050",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F4F8",
  },
  notesRow: {
    alignItems: "flex-start",
    flexDirection: "column",
    borderBottomWidth: 0,
    gap: 8,
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#5B8BB0",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#1A3050",
    fontWeight: "500",
    textAlign: "right",
    flexShrink: 1,
    marginLeft: 12,
  },
  notesText: {
    textAlign: "left",
    marginLeft: 0,
    color: "#334E68",
    lineHeight: 20,
  },

  // Footer
  footer: {
    padding: 16,
    backgroundColor: "#F4F7FA",
  },
  backToHistoryButton: {
    backgroundColor: "#1A3050",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  backToHistoryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});