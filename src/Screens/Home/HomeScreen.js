import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const mockUser = "Inspector Jane";

const mockStats = {
  low: 12,
  moderate: 4,
  high: 1,
  total: 17,
};

const mockRecentActivity = [
  {
    id: "1",
    location: "Pipeline Section B-7",
    time: "Today, 09:42 AM",
    severity: "High",
  },
  {
    id: "2",
    location: "Tank Wall — Zone 3",
    time: "Today, 08:15 AM",
    severity: "Moderate",
  },
  {
    id: "3",
    location: "Bridge Beam C-12",
    time: "Yesterday, 04:30 PM",
    severity: "Low",
  },
];

function getSeverityColor(severity) {
  switch (severity) {
    case "High":
      return "#E53935";
    case "Moderate":
      return "#FB8C00";
    case "Low":
      return "#43A047";
    default:
      return "#8AAAC8";
  }
}

function getSeverityBadgeStyle(severity) {
  switch (severity) {
    case "High":
      return { backgroundColor: "#FFCDD2" };
    case "Moderate":
      return { backgroundColor: "#FFE0B2" };
    case "Low":
      return { backgroundColor: "#C8E6C9" };
    default:
      return { backgroundColor: "#E0E0E0" };
  }
}

export default function HomeScreen({ navigation }) {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 18) return "Good afternoon,";
    return "Good evening,";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      {/* Top header - dark navy */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingText}>{greeting()}</Text>
          <Text style={styles.userName}>{mockUser}</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color="#8AAAC8" />
        </TouchableOpacity>
      </View>

      {/* Stats card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#43A047" }]} />
          <Text style={styles.statNumber}>{mockStats.low}</Text>
          <Text style={styles.statLabel}>Low</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#FB8C00" }]} />
          <Text style={styles.statNumber}>{mockStats.moderate}</Text>
          <Text style={styles.statLabel}>Moderate</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#E53935" }]} />
          <Text style={styles.statNumber}>{mockStats.high}</Text>
          <Text style={styles.statLabel}>High</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#B0BEC5" }]} />
          <Text style={styles.statNumber}>{mockStats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* White body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {/* New Inspection button */}
        <TouchableOpacity
          style={styles.newInspectionButton}
          onPress={() => navigation.navigate("Upload")}
        >
          <Ionicons name="camera" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
          <Text style={styles.newInspectionText}>New Inspection</Text>
        </TouchableOpacity>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {mockRecentActivity.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.activityCard}
            onPress={() => navigation.navigate("HistoryDetails", { item, source: "Home" })}
          >
            <View
              style={[
                styles.severityBar,
                { backgroundColor: getSeverityColor(item.severity) },
              ]}
            />
            <View style={styles.activityContent}>
              <Text style={styles.activityLocation}>{item.location}</Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
            <View
              style={[
                styles.severityBadge,
                getSeverityBadgeStyle(item.severity),
              ]}
            >
              <Text
                style={[
                  styles.severityBadgeText,
                  { color: getSeverityColor(item.severity) },
                ]}
              >
                {item.severity}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
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
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  greetingText: {
    color: "#A8C4D8",
    fontSize: 14,
    fontWeight: "400",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2E4A6A",
    alignItems: "center",
    justifyContent: "center",
  },

  // Stats card
  statsCard: {
    backgroundColor: "#243F5C",
    marginHorizontal: 20,
    marginTop: -1,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 0,
    top: -10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  statNumber: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    color: "#8AAAC8",
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#3A5570",
    marginHorizontal: 4,
  },

  // Body
  body: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // New Inspection button
  newInspectionButton: {
    backgroundColor: "#1A3050",
    borderRadius: 14,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  newInspectionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Recent Activity
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#1A3050",
    fontSize: 17,
    fontWeight: "700",
  },
  seeAll: {
    color: "#8AAAC8",
    fontSize: 13,
  },

  // Activity card
  activityCard: {
    backgroundColor: "#D8E3EE",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
    paddingRight: 14,
    paddingVertical: 14,
  },
  severityBar: {
    width: 4,
    height: "100%",
    borderRadius: 2,
    marginRight: 14,
    marginLeft: 4,
    minHeight: 44,
  },
  activityContent: {
    flex: 1,
  },
  activityLocation: {
    color: "#1A3050",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
  },
  activityTime: {
    color: "#5A7A9A",
    fontSize: 12,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  severityBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});