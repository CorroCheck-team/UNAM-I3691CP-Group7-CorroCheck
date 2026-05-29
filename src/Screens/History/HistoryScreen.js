import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { BottomNav, Header, ScreenShell } from "../../components/AppScaffold";
import { inspections, severityTheme } from "../../data/inspections";

export default function HistoryScreen({ navigation }) {
  const hasInspections = inspections.length > 0;

  return (
    <ScreenShell activeTab="History">
      <Header title="History" />
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={24} color="#d6d6d6" />
        <TextInput
          placeholder="Search Inspection..."
          placeholderTextColor="#d6d6d6"
          style={styles.searchInput}
        />
      </View>
      <Text style={styles.count}>{hasInspections ? "17 inspections total" : "0 inspections total"}</Text>

      {hasInspections ? (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {[...inspections, ...inspections].map((item, index) => (
            <HistoryCard
              item={item}
              key={`${item.id}-${index}`}
              onPress={() => navigation.navigate("HistoryDetails", { item })}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={72} color="#b7c9dd" />
          <Text style={styles.emptyTitle}>No inspections yet</Text>
          <Text style={styles.emptyText}>Submit your first inspection to{"\n"}see it here.</Text>
        </View>
      )}

      <BottomNav activeTab="History" navigation={navigation} />
    </ScreenShell>
  );
}

function HistoryCard({ item, onPress }) {
  const theme = severityTheme[item.severity];

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.cardAccent, { backgroundColor: theme.color }]} />
      <View style={styles.thumbnail}>
        <Ionicons name="image-outline" size={24} color="#ffffff" />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardType}>{item.corrosionType}</Text>
      </View>
      <View style={styles.cardRight}>
        <View style={[styles.badge, { backgroundColor: theme.soft }]}>
          <Text style={[styles.badgeText, { color: theme.color }]}>{item.severity}</Text>
        </View>
        <Ionicons name="chevron-forward" size={27} color="#1f426d" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#b7c9dd",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    flex: 1,
    color: "#1f426d",
    fontSize: 16,
    paddingVertical: 0,
  },
  count: {
    marginTop: 10,
    marginLeft: 32,
    color: "#b7c9dd",
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 26,
    paddingTop: 25,
    paddingBottom: 20,
    gap: 18,
  },
  card: {
    minHeight: 102,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  thumbnail: {
    width: 74,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    borderRadius: 13,
    backgroundColor: "#d9d9d9",
  },
  cardText: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardTitle: {
    color: "#1f426d",
    fontSize: 16,
    fontWeight: "900",
  },
  cardDate: {
    color: "#1f426d",
    fontSize: 14,
  },
  cardType: {
    color: "#1f426d",
    fontSize: 14,
  },
  cardRight: {
    width: 72,
    alignItems: "center",
    gap: 11,
  },
  badge: {
    minWidth: 54,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingHorizontal: 9,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "900",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyTitle: {
    marginTop: 10,
    color: "#b7c9dd",
    fontSize: 25,
    fontWeight: "900",
  },
  emptyText: {
    marginTop: 7,
    color: "#b7c9dd",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
});
