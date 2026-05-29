import { Ionicons } from "@expo/vector-icons";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const tabs = [
  { route: "Home", label: "Home", icon: "home-outline" },
  { route: "Upload", label: "Upload", icon: "push-outline" },
  { route: "History", label: "History", icon: "time-outline" },
  { route: "Profile", label: "Profile", icon: "person-outline" },
];

export function ScreenShell({ children, activeTab, backgroundColor = "#f4f4f4" }) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.shell}>{children}</View>
    </SafeAreaView>
  );
}

export function Header({ title, onBack, large = false }) {
  return (
    <View style={[styles.header, large && styles.largeHeader]}>
      {onBack ? (
        <Pressable accessibilityLabel="Go back" onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-outline" size={34} color="#b7c9dd" />
        </Pressable>
      ) : null}
      <Text style={[styles.headerTitle, large && styles.largeTitle]}>{title}</Text>
    </View>
  );
}

export function BottomNav({ activeTab, navigation }) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const active = tab.label === activeTab;
        const color = active ? "#1f426d" : "#b7c9dd";

        return (
          <Pressable
            accessibilityLabel={`Open ${tab.label}`}
            key={tab.route}
            onPress={() => navigation.navigate(tab.route)}
            style={styles.tab}
          >
            <Ionicons name={tab.icon} size={24} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
            {active ? <View style={styles.activeDot} /> : <View style={styles.inactiveDot} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  shell: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#f4f4f4",
  },
  header: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f426d",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  largeHeader: {
    height: 120,
  },
  headerTitle: {
    color: "#b7c9dd",
    fontSize: 20,
    fontWeight: "800",
  },
  largeTitle: {
    fontSize: 32,
  },
  backButton: {
    position: "absolute",
    left: 24,
    top: 34,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNav: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: "700",
  },
  activeDot: {
    width: 4,
    height: 4,
    marginTop: 4,
    borderRadius: 2,
    backgroundColor: "#1f426d",
  },
  inactiveDot: {
    width: 4,
    height: 4,
    marginTop: 4,
  },
});
