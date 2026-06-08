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
import { db } from "../../../firebase/config";

// ── Sample data (replace with Firestore data) ──────────────────────────────


// ── Severity helpers ───────────────────────────────────────────────────────
function getSeverityColors(severity) {
  switch (severity) {
    case "High":
      return { bg: "#FDECEA", text: "#E53935", border: "#E53935" };
    case "Moderate":
      return { bg: "#FFF3E0", text: "#FB8C00", border: "#FB8C00" };
    case "Low":
      return { bg: "#E8F5E9", text: "#43A047", border: "#43A047" };
    default:
      return { bg: "#F0F0F0", text: "#666", border: "#ccc" };
  }
}

function getLeftBorderColor(severity) {
  switch (severity) {
    case "High":
      return "#E53935";
    case "Moderate":
      return "#FB8C00";
    case "Low":
      return "#43A047";
    default:
      return "#ccc";
  }
}

// ── Inspection Card ────────────────────────────────────────────────────────
function InspectionCard({ item, onPress }) {
  const severityColors = getSeverityColors(severity);
  const borderColor = getLeftBorderColor(severity); 

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {/* Left severity bar */}
      <View style={[styles.leftBar, { backgroundColor: borderColor }]} />

      {/* Thumbnail */}
      <View style={styles.thumbnail}>
        {item.photoURL ? (
          <Image source={{ uri: item.photoURL }} style={styles.thumbnailImage} />
        ) : (
          <Ionicons name="image-outline" size={26} color="#AABCCE" />
        )}
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
<Text style={styles.cardLocation} numberOfLines={2}>
  {item.location || "Unknown Location"}
</Text>
        <Text style={styles.cardDate}>
  {item.createdAt?.toDate
    ? item.createdAt.toDate().toLocaleString()
    : "No date"}
</Text>
        <Text style={styles.cardType}>
  {item.corrosionType || item.corrosionLevel || "Unknown Type"}
</Text>
      </View>

      {/* Severity badge + chevron */}
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

// ── Main Screen ────────────────────────────────────────────────────────────
export default function HistoryScreen({ navigation }) {

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [inspections, setInspections] = useState([]);

  // Firestore listener
  useEffect(() => {

    const q = query(
      collection(db, "inspections"),
      orderBy("createdAt", "desc")
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

  // Filter inspections
const filtered = inspections.filter((item) => {

  const q = searchQuery.toLowerCase();

  return (
    (item.location || "").toLowerCase().includes(q) ||
    (item.corrosionType || "").toLowerCase().includes(q) ||
    (item.severity || "").toLowerCase().includes(q) ||
    (item.corrosionLevel || "").toLowerCase().includes(q)
  );
});

  const handleCardPress = (item) => {
    navigation.navigate("HistoryDetails", { inspection: item, source: "History" });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* Search */}
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

      {/* Count */}
      <Text style={styles.countText}>{filtered.length} inspections total</Text>

      {/* List */}
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

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F5F8",
  },

  // Header
  header: {
    backgroundColor: "#1A3050",
    paddingVertical: 16,
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Search
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1A3050",
    padding: 0,
  },

  // Count
  countText: {
    fontSize: 13,
    color: "#5B8DB8",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    fontWeight: "500",
  },

  // List
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 20,
    gap: 10,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    paddingRight: 12,
    paddingVertical: 12,
  },
  cardPressed: {
    opacity: 0.85,
  },
  leftBar: {
    width: 4,
    alignSelf: "stretch",
    borderRadius: 2,
    marginRight: 10,
    marginLeft: 6,
  },

  // Thumbnail
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#EDF1F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },

  // Card text
  cardInfo: {
    flex: 1,
  },
  cardLocation: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A3050",
    marginBottom: 2,
    lineHeight: 18,
  },
  cardDate: {
    fontSize: 12,
    color: "#7A9AB8",
    marginBottom: 1,
  },
  cardType: {
    fontSize: 12,
    color: "#7A9AB8",
  },

  // Right side
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 52,
    marginLeft: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  chevron: {
    marginTop: 4,
  },

  // Empty state
  emptyState: {
    alignItems: "center",
    marginTop: 80,
    gap: 10,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: "#8AAAC8",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  emptySubtext: {
    color: "#AABCCE",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});