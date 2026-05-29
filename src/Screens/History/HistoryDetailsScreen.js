import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { Header, ScreenShell } from "../../components/AppScaffold";
import InspectionResultCard from "../../components/InspectionResultCard";
import { defaultInspection } from "../../data/inspections";

export default function HistoryDetailsScreen({ navigation, route }) {
  const inspection = route?.params?.item || defaultInspection;

  return (
    <ScreenShell>
      <Header
        large
        onBack={() => navigation.navigate("Home")}
        title="Details"
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <InspectionResultCard inspection={inspection} />
        <Pressable onPress={() => navigation.navigate("History")} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to History</Text>
        </Pressable>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 26,
    paddingBottom: 34,
  },
  backButton: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: "#1f426d",
  },
  backButtonText: {
    color: "#b7c9dd",
    fontSize: 28,
    fontWeight: "900",
  },
});
