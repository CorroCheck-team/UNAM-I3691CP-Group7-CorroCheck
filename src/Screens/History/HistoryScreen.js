import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../services/firebase/firebaseConfig";
import { getHistory } from "../../../backend/services/firestoreService";

function getSeverityColors(severity) {
  switch (severity) {
    case "High": return { bg: "#FDECEA", text: "#E53935" };
    case "Moderate": return { bg: "#FFF3E0", text: "#FB8C00" };
    case "Low": return { bg: "#E8F5E9", text: "#43A047" };
    default: return { bg: "#F0F0F0", text: "#666" };
  }
}

function getLeftBorderColor(severity) {
  switch (severity) {
    case "High": return "#E53935";
    case "Moderate": return "#FB8C00";
    case "Low": return "#43A047";
    default: return "#ccc";
  }
}

function InspectionCard({ item, onPress }) {
  const severityColors = getSeverityColors(item.severity);
  const borderColor = getLeftBorderColor(item.severity);
  const formattedDate = item.date?.toDate
    ? item.date.toDate().toLocaleString("en-US", {
        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
      })
    : item.date;

  return (
    <Pressable onPress={() => onPress(item)} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={[styles.leftBar, { backgroundColor: borderColor }]} />
      <View style={styles.thumbnail}>
        {item.photoURL ? (
          <Image source={{ uri: item.photoURL }} style={styles.thumbnailImage} />
        ) : (
          <Ionicons name="image-outline" size={26} color="#AABCCE" />
        )}
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardLocation} numberOfLines={2}>{item.location}</Text>
        <Text style={styles.cardDate}>{formattedDate}</Text>
        <Text style={styles.cardType}>{item.corrosionType}</Text>
      </View>
      <View style={styles.cardRight}>
        <View style={[styles.badge, { backgroundColor: severityColors.bg }]}>
          <Text style={[styles.badgeText, { color: severityColors.text }]}>{item.severity}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#AABCCE" style={styles.chevron} />
      </View>
    </Pressable>
  );
}

export default function HistoryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) { setLoading(false); return; }
      try {
        const data = await getHistory(userId);
        setInspections(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = inspections.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.location?.toLowerCase().includes(q) ||
      item.corrosionType?.toLowerCase().includes(q) ||
      item.severity?.toLowerCase().includes(q)
    );
  });

  const handleCardPress = (item) => {
    navigation.navigate("HistoryDetails", { scan: item, source: "History" });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}><Text style={styles.headerTitle}>History</Text></View>
        <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#1A3050" /></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3050" />
      <View style={styles.header}><Text style={styles.headerTitle}>History</Text></View>
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
        keyExtractor={(item) => item.scanId}
        renderItem={({ item }) => <InspectionCard item={item} onPress={handleCardPress} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#AABCCE" />
            <Text style={styles.emptyTitle}>No inspections yet</Text>
            <Text style={styles.emptySubtext}>Submit your first inspection to{"\n"}see it here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F5F8" },
  header: { backgroundColor: "#1A3050", paddingVertical: 16, alignItems: "center" },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700", letterSpacing: 0.3 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchContainer: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, elevation: 2 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#1A3050", padding: 0 },
  countText: { fontSize: 13, color: "#5B8DB8", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6, fontWeight: "500" },
  listContent: { paddingHorizontal: 14, paddingBottom: 20, gap: 10 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 14, overflow: "hidden", elevation: 2, paddingRight: 12, paddingVertical: 12 },
  cardPressed: { opacity: 0.85 },
  leftBar: { width: 4, alignSelf: "stretch", borderRadius: 2, marginRight: 10, marginLeft: 6 },
  thumbnail: { width: 52, height: 52, borderRadius: 10, backgroundColor: "#EDF1F5", justifyContent: "center", alignItems: "center", marginRight: 12, overflow: "hidden" },
  thumbnailImage: { width: "100%", height: "100%" },
  cardInfo: { flex: 1 },
  cardLocation: { fontSize: 14, fontWeight: "700", color: "#1A3050", marginBottom: 2, lineHeight: 18 },
  cardDate: { fontSize: 12, color: "#7A9AB8", marginBottom: 1 },
  cardType: { fontSize: 12, color: "#7A9AB8" },
  cardRight: { alignItems: "flex-end", justifyContent: "space-between", height: 52, marginLeft: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: "700" },
  chevron: { marginTop: 4 },
  emptyState: { alignItems: "center", marginTop: 80, gap: 10, paddingHorizontal: 40 },
  emptyTitle: { color: "#8AAAC8", fontSize: 18, fontWeight: "700", marginTop: 8 },
  emptySubtext: { color: "#AABCCE", fontSize: 14, textAlign: "center", lineHeight: 20 },
});