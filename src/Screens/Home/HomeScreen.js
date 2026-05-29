import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { BottomNav, ScreenShell } from "../../components/AppScaffold";
import { inspections, severityTheme } from "../../data/inspections";

const stats = [
  { label: "Low", count: 12, color: "#05bd28" },
  { label: "Moderate", count: 4, color: "#f29900" },
  { label: "High", count: 1, color: "#df1208" },
  { label: "Total", count: 17, color: "#b7c9dd" },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScreenShell activeTab="Home">
      <View style={styles.hero}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>Inspector Jane</Text>
        </View>
        <Pressable
          accessibilityLabel="Open profile"
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileButton}
        >
          <Ionicons name="person-outline" size={38} color="#1f426d" />
        </Pressable>

        <View style={styles.statsCard}>
          {stats.map((item, index) => (
            <View
              key={item.label}
              style={[styles.statItem, index === stats.length - 1 && styles.totalStat]}
            >
              <View style={[styles.statDot, { backgroundColor: item.color }]} />
              <Text style={styles.statCount}>{item.count}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => navigation.navigate("Upload")} style={styles.uploadButton}>
          <Ionicons name="camera-outline" size={24} color="#ffffff" />
          <Text style={styles.uploadText}>New Inspection</Text>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable onPress={() => navigation.navigate("History")}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.activityList}>
          {inspections.slice(0, 3).map((item) => (
            <ActivityCard
              item={item}
              key={item.id}
              onPress={() => navigation.navigate("HistoryDetails", { item })}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNav activeTab="Home" navigation={navigation} />
    </ScreenShell>
  );
}

function ActivityCard({ item, onPress }) {
  const theme = severityTheme[item.severity];

  return (
    <Pressable onPress={onPress} style={styles.activityCard}>
      <View style={[styles.activityAccent, { backgroundColor: theme.color }]} />
      <View style={styles.activityCopy}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDate}>{item.date}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: theme.soft }]}>
        <Text style={[styles.badgeText, { color: theme.color }]}>{item.severity}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 300,
    paddingHorizontal: 26,
    paddingTop: 42,
    backgroundColor: "#1f426d",
  },
  greeting: {
    color: "#b7c9dd",
    fontSize: 14,
    fontWeight: "800",
  },
  name: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },
  profileButton: {
    position: "absolute",
    top: 36,
    right: 22,
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: "#b7c9dd",
  },
  statsCard: {
    position: "absolute",
    left: 26,
    right: 16,
    bottom: 45,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 23,
    backgroundColor: "#657b94",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  totalStat: {
    borderLeftWidth: 1,
    borderLeftColor: "#b7c9dd",
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  statCount: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },
  statLabel: {
    color: "#d8e3ef",
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 80,
  },
  uploadButton: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 30,
    borderRadius: 9,
    backgroundColor: "#1f426d",
  },
  uploadText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#1f426d",
    fontSize: 20,
    fontWeight: "900",
  },
  seeAll: {
    color: "#b7c9dd",
    fontSize: 13,
    fontWeight: "900",
  },
  activityList: {
    gap: 18,
  },
  activityCard: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 11,
    backgroundColor: "#b7c9dd",
  },
  activityAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  activityCopy: {
    flex: 1,
    paddingLeft: 18,
  },
  activityTitle: {
    color: "#1f426d",
    fontSize: 16,
    fontWeight: "900",
  },
  activityDate: {
    color: "#1f426d",
    fontSize: 14,
  },
  badge: {
    minWidth: 54,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "900",
  },
});
