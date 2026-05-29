import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { defaultInspection, severityTheme } from "../data/inspections";

export default function InspectionResultCard({ inspection = defaultInspection, compact = false }) {
  const theme = severityTheme[inspection.severity] || severityTheme.High;
  const size = compact ? compactStyles : regularStyles;

  return (
    <>
      <View style={[styles.imageBox, size.imageBox]}>
        <Ionicons name="image-outline" size={compact ? 34 : 58} color="#ffffff" />
      </View>

      <View style={[styles.severityCard, size.severityCard]}>
        <View style={[styles.severityAccent, { backgroundColor: theme.color }]} />
        <Text style={[styles.severityLabel, size.severityLabel]}>SEVERITY</Text>
        <Text style={[styles.severityValue, size.severityValue, { color: theme.color }]}>
          {inspection.severity}
        </Text>
        <View style={[styles.confidence, size.confidence, { backgroundColor: theme.soft }]}>
          <Text style={[styles.confidenceText, size.confidenceText, { color: theme.color }]}>
            {inspection.confidence}% confidence
          </Text>
        </View>
      </View>

      <InfoRow compact={compact} icon="flask-outline" label="Corrosion type" value={inspection.corrosionType} />
      <InfoRow compact={compact} icon="location-outline" label="Location" value={inspection.location} ion />
      <InfoRow compact={compact} icon="calendar-outline" label="Date & Time" value={inspection.shortDate} ion />
      <InfoRow compact={compact} icon="clipboard-text-outline" label="Notes" value={inspection.notes} multiline />
    </>
  );
}

function InfoRow({ compact, icon, label, value, ion = false, multiline = false }) {
  const Icon = ion ? Ionicons : MaterialCommunityIcons;
  const size = compact ? compactStyles : regularStyles;

  return (
    <View style={[styles.infoRow, size.infoRow, multiline && styles.infoRowTall, multiline && size.infoRowTall]}>
      <View style={[styles.infoLabelWrap, size.infoLabelWrap]}>
        <Icon name={icon} size={compact ? 18 : 22} color="#1e3f68" />
        <Text style={[styles.infoLabel, size.infoLabel]}>{label}</Text>
      </View>
      <Text style={[styles.infoValue, size.infoValue, multiline && styles.infoValueTall]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    borderRadius: 9,
    backgroundColor: "#787881",
  },
  severityCard: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
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
    fontWeight: "700",
  },
  severityValue: {
    fontWeight: "900",
  },
  confidence: {
    borderRadius: 20,
  },
  confidenceText: {
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#b7c9dd",
    borderRadius: 13,
    backgroundColor: "#ffffff",
  },
  infoRowTall: {
    alignItems: "flex-start",
  },
  infoLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    color: "#b7c9dd",
  },
  infoValue: {
    flex: 1,
    color: "#1e3f68",
    textAlign: "right",
  },
  infoValueTall: {
    marginLeft: 12,
    textAlign: "left",
    lineHeight: 21,
  },
});

const regularStyles = StyleSheet.create({
  imageBox: {
    height: 190,
    marginTop: 18,
    marginBottom: 18,
  },
  severityCard: {
    minHeight: 126,
    marginBottom: 12,
  },
  severityLabel: {
    fontSize: 15,
  },
  severityValue: {
    marginTop: 5,
    fontSize: 40,
  },
  confidence: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  confidenceText: {
    fontSize: 16,
  },
  infoRow: {
    minHeight: 58,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  infoRowTall: {
    minHeight: 82,
    paddingTop: 13,
    paddingBottom: 13,
  },
  infoLabelWrap: {
    gap: 11,
    minWidth: 150,
  },
  infoLabel: {
    fontSize: 17,
  },
  infoValue: {
    fontSize: 16,
  },
});

const compactStyles = StyleSheet.create({
  imageBox: {
    height: 200,
    marginTop: 10,
    marginBottom: 18,
  },
  severityCard: {
    minHeight: 144,
    marginBottom: 12,
  },
  severityLabel: {
    fontSize: 16,
  },
  severityValue: {
    marginTop: 5,
    fontSize: 36,
  },
  confidence: {
    marginTop: 9,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  confidenceText: {
    fontSize: 14,
  },
  infoRow: {
    minHeight: 48,
    marginBottom: 10,
    paddingHorizontal: 18,
  },
  infoRowTall: {
    minHeight: 80,
    paddingTop: 12,
    paddingBottom: 12,
  },
  infoLabelWrap: {
    gap: 9,
    minWidth: 142,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 14,
  },
});
