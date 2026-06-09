import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../services/firebase/firebaseConfig";
import { getHistory } from "../../services/firebase/firestoreService";

function getSeverityColor(severity) {
  switch (severity) {
    case "High":   return "#E53935";
    case "Medium": return "#FB8C00";
    case "Low":    return "#43A047";
    default:       return "#8AAAC8";
  }
}

function getSeverityBadgeStyle(severity) {
  switch (severity) {
    case "High":   return { backgroundColor: "#FFCDD2" };
    case "Medium": return { backgroundColor: "#FFE0B2" };
    case "Low":    return { backgroundColor: "#C8E6C9" };
    default:       return { backgroundColor: "#E0E0E0" };
  }
}

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("Inspector");
  const [stats, setStats] = useState({ low: 0, medium: 0, high: 0, total: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 18) return "Good afternoon,";
    return "Good evening,";
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
      loadData(user.uid);
    }
  }, []);

  const loadData = async (userId) => {
    try {
      const reports = await getHistory(userId);
      const low    = reports.filter(r => r.severity === "Low").length;
      const medium = reports.filter(r => r.severity === "Medium").length;
      const high   = reports.filter(r => r.severity === "High").length;
      setStats({ low, medium, high, total: reports.length });
      setRecentActivity(reports.slice(0, 3));
    } catch (error) {
      console.error("Error loading home data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingText}>{greeting()}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color="#8AAAC8" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#43A047" }]} />
          <Text style={styles.statNumber}>{stats.low}</Text>
          <Text style={styles.statLabel}>Low</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#FB8C00" }]} />
          <Text style={styles.statNumber}>{stats.medium}</Text>
          <Text style={styles.statLabel}>Medium</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#E53935" }]} />
          <Text style={styles.statNumber}>{stats.high}</Text>
          <Text style={styles.statLabel}>High</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={[styles.statDot, { backgroundColor: "#B0BEC5" }]} />
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.newInspectionButton}
          onPress={() => navigation.navigate("Upload")}
        >
          <Ionicons name="camera" size={20} color="#FFFFFF" style={{ marginRight: 10 }} />
          <Text style={styles.newInspectionText}>New Inspection</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {recentActivity.length === 0 ? (
          <Text style={styles.noActivity}>No recent inspections yet.</Text>
        ) : (
          recentActivity.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityCard}
              onPress={() => navigation.navigate("HistoryDetails", { inspection: item, source: "Home" })}
            >
              <View style={[styles.severityBar, { backgroundColor: getSeverityColor(item.severity) }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityLocation}>{item.location}</Text>
                <Text style={styles.activityTime}>
                  {item.date?.toDate ? item.date.toDate().toLocaleString() : "—"}
                </Text>
              </View>
              <View style={[styles.severityBadge, getSeverityBadgeStyle(item.severity)]}>
                <Text style={[styles.severityBadgeText, { color: getSeverityColor(item.severity) }]}>
                  {item.severity}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F2F5" },
  header: { backgroundColor: "#1A3050", paddingTop: 55, paddingBottom: 24, paddingHorizontal: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerLeft: { flex: 1 },
  greetingText: { color: "#A8C4D8", fontSize: 14, fontWeight: "400" },
  userName: { color: "#FFFFFF", fontSize: 20, fontWeight: "700", marginTop: 2 },
  avatarButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#2E4A6A", alignItems: "center", justifyContent: "center" },
  statsCard: { backgroundColor: "#243F5C", marginHorizontal: 20, borderRadius: 14, flexDirection: "row", alignItems: "center", paddingVertical: 18, paddingHorizontal: 16, top: -10 },
  statItem: { flex: 1, alignItems: "center" },
  statDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 6 },
  statNumber: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  statLabel: { color: "#8AAAC8", fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, height: 40, backgroundColor: "#3A5570", marginHorizontal: 4 },
  body: { flex: 1, backgroundColor: "#F0F2F5", paddingHorizontal: 20, paddingTop: 16 },
  newInspectionButton: { backgroundColor: "#1A3050", borderRadius: 14, paddingVertical: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 28 },
  newInspectionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", letterSpacing: 0.3 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  sectionTitle: { color: "#1A3050", fontSize: 17, fontWeight: "700" },
  seeAll: { color: "#8AAAC8", fontSize: 13 },
  noActivity: { color: "#8AAAC8", fontSize: 14, textAlign: "center", marginTop: 20 },
  activityCard: { backgroundColor: "#D8E3EE", borderRadius: 12, flexDirection: "row", alignItems: "center", marginBottom: 10, overflow: "hidden", paddingRight: 14, paddingVertical: 14 },
  severityBar: { width: 4, height: "100%", borderRadius: 2, marginRight: 14, marginLeft: 4, minHeight: 44 },
  activityContent: { flex: 1 },
  activityLocation: { color: "#1A3050", fontSize: 14, fontWeight: "700", marginBottom: 3 },
  activityTime: { color: "#5A7A9A", fontSize: 12 },
  severityBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  severityBadgeText: { fontSize: 12, fontWeight: "700" },
});
