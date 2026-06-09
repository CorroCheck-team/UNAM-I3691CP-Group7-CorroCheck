import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../../services/firebase/firebaseConfig";

function getSeverityColors(severity) {
  switch (severity) {
    case "High":
      return { bg: "#FDECEA", text: "#E53935" };
    case "Medium":
      return { bg: "#FFF3E0", text: "#FB8C00" };
    case "Low":
      return { bg: "#E8F5E9", text: "#43A047" };
    default:
      return { bg: "#F0F0F0", text: "#666" };
  }
}

function getLeftBorderColor(severity) {
  switch (severity) {
    case "High":   return "#E53935";
    case "Medium": return "#FB8C00";
    case "Low":    return "#43A047";
    default:       return "#ccc";
  }
}

function InspectionCard({ item, onPress }) {
  const severityColors = getSeverityColors(item.severity);
  const borderColor = getLeftBorderColor(item.severity);

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.leftBar, { backgroundColor: borderColor }]} />

      <View style={styles.thumbnail}>
        {item.photoURL ? (
          <Image source={{ uri: item.photoURL }} style={styles.thumbnailImage} />
        ) : (
          <Ionicons name="image-outline" size={26} color="#AABCCE" />
        )}
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardLocation} numberOfLines={2}>
          {item.location || "Unknown Location"}
        </Text>
        <Text style={styles.cardDate}>
          {item.date?.toDate
            ? item.date.toDate().toLocaleString()
            : "No date"}
        </Text>
        <Text style={styles.cardType}>
          {item.corrosionType || "Unknown Type"}
        </Text>
      </View>

      <View style={styles.cardRight}>
        <View style={[styles.badge, { backgroundColor: severityColors.bg }]}>
          <Text style={[styles.badgeText, { color: severityColors.text }]}>
            {item.severity}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#AABCCE" style={styles.chevron} />
      </View>
    </Pressable>
  );
}

export default function HistoryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const q = query(
      collection(db, "users", userId, "scans"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inspectionList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInspections(inspectionList);
    });

    return () => unsubscribe();
  }, []);

  const filtered = inspections.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.location || "").toLowerCase().includes(q) ||
      (item.corrosionType || "").toLowerCase().includes(q) ||
      (item.severity || "").toLowerCase().includes(q)
    );
  });

  const handleCardPress = (item) => {
    navigation.navigate("HistoryDetails", { inspection: item, source: "History" });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#AABCCE" style={styles.searchIcon} />
          <TextInput
            placeholder="Search Inspection..."
            placeholderTextColor="#AABCCE"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      <Text style={styles.countText}>{filtered.length} inspections total</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InspectionCard item={item} onPress={handleCardPress} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#AABCCE" />
            <Text style={styles.emptyTitle}>No inspections yet</Text>
            <Text style={styles.emptySubtext}>
              Submit your first inspection to{"\n"}see it here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F0F4F8" },
  header: {
    backgroundColor: "#1A3050",
    paddingTop: 55,
    paddingBottom: 18,
    alignItems: "center",
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", letterSpacing: 0.3 },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: "#D8E3EE",
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: "#1A3050", fontSize: 14 },
  countText: {
    color: "#8AAAC8",
    fontSize: 13,
    paddingHorizontal: 18,
    marginBottom: 6,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 20, gap: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#1A3050",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardPressed: { opacity: 0.85 },
  leftBar: { width: 5, alignSelf: "stretch" },
  thumbnail: {
    width: 56,
    height: 56,
    margin: 12,
    borderRadius: 8,
    backgroundColor: "#E3EAF2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  thumbnailImage: { width: "100%", height: "100%" },
  cardInfo: { flex: 1, paddingVertical: 12 },
  cardLocation: { color: "#1A3050", fontSize: 14, fontWeight: "600", marginBottom: 3 },
  cardDate: { color: "#8AAAC8", fontSize: 12, marginBottom: 2 },
  cardType: { color: "#8AAAC8", fontSize: 12 },
  cardRight: { alignItems: "center", paddingRight: 12, gap: 6 },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: "600" },
  chevron: { marginTop: 4 },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: { color: "#1A3050", fontSize: 18, fontWeight: "600" },
  emptySubtext: { color: "#8AAAC8", fontSize: 14, textAlign: "center", lineHeight: 22 },
});
