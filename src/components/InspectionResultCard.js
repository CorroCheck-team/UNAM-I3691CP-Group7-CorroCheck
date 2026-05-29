import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { defaultInspection, severityTheme } from "../data/inspections";

export default function InspectionResultCard({ inspection = defaultInspection, compact = false }) {
  const theme = severityTheme[inspection.severity] || severityTheme.High;

  return (
    <>
      <View style={styles.imageBox}>
        <Ionicons name="image-outline" size={compact ? 34 : 58} color="#ffffff" />
      </View>

      <View style={styles.severityCard}>
        <View style={[styles.severityAccent, { backgroundColor: theme.color }]} />
        <Text style={styles.severityLabel}>SEVERITY</Text>
        <Text style={[styles.severityValue, { color: theme.color }]}>{inspection.severity}</Text>
        <View style={[styles.confidence, { backgroundColor: theme.soft }]}>
          <Text style={[styles.confidenceText, { color: theme.color }]}>
            {inspection.confidence}% confidence
          </Text>
        </View>
      </View>

      <InfoRow icon="flask-outline" label="Corrosion type" value={inspection.corrosionType} />
      <InfoRow icon="location-outline" label="Location" value={inspection.location} ion />
      <InfoRow icon="calendar-outline" label="Date & Time" value={inspection.shortDate} ion />
      <InfoRow icon="clipboard-text-outline" label="Notes" value={inspection.notes} multiline />
    </>
  );
}

function InfoRow({ icon, label, value, ion = false, multiline = false }) {
  const Icon = ion ? Ionicons : MaterialCommunityIcons;

  return (
    <View style={[styles.infoRow, multiline && styles.infoRowTall]}>
      <View style={styles.infoLabelWrap}>
        <Icon name={icon} size={23} color="#1f426d" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={[styles.infoValue, multiline && styles.infoValueTall]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginTop: 18,
    marginBottom: 18,
    borderRadius: 9,
    backgroundColor: "#787881",
  },
  severityCard: {
    minHeight: 146,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginBottom: 12,
    borderRadius: 26,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  severityAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  severityLabel: {
    color: "#b7c9dd",
    fontSize: 16,
    fontWeight: "700",
  },
  severityValue: {
    marginTop: 6,
    fontSize: 42,
    fontWeight: "900",
  },
  confidence: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#b7c9dd",
    borderRadius: 13,
    backgroundColor: "#ffffff",
  },
  infoRowTall: {
    minHeight: 82,
    alignItems: "flex-start",
    paddingTop: 13,
    paddingBottom: 13,
  },
  infoLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    minWidth: 150,
  },
  infoLabel: {
    color: "#b7c9dd",
    fontSize: 18,
  },
  infoValue: {
    flex: 1,
    color: "#1f426d",
    fontSize: 16,
    textAlign: "right",
  },
  infoValueTall: {
    marginLeft: 12,
    textAlign: "left",
    lineHeight: 21,
  },
});
