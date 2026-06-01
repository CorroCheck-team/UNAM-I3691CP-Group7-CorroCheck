import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("janedoe@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EDF4" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={72} color="#5B7FA6" />
          </View>
          {/* Edit badge */}
          <Pressable style={styles.editBadge}>
            <Ionicons name="pencil" size={14} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Name & email */}
        <Text style={styles.userName}>JANE DOE</Text>
        <Text style={styles.userEmail}>janedoe@gmail.com</Text>

        {/* Form card */}
        <View style={styles.card}>
          {/* Name field */}
          <Text style={styles.fieldLabel}>Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.inputText}
              placeholderTextColor="#8AAAC8"
            />
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          </View>

          {/* Email field */}
          <Text style={styles.fieldLabel}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputText}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#8AAAC8"
            />
            <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
          </View>

          {/* Password field */}
          <Text style={styles.fieldLabel}>Change password</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.inputText}
              secureTextEntry={!showPassword}
              placeholderTextColor="#8AAAC8"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

          {/* Logout button */}
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutRow, pressed && { opacity: 0.75 }]}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <Ionicons name="exit-outline" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E8EDF4",
  },
  scroll: {
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 10,
  },

  // Avatar
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#C5D3E8",
    justifyContent: "center",
    alignItems: "center",
  },
  editBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1A3050",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E8EDF4",
  },

  // Name / email
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A3050",
    letterSpacing: 1,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#5B7FA6",
    marginBottom: 24,
  },

  // Card
  card: {
    width: "88%",
    backgroundColor: "#C5D3E8",
    borderRadius: 22,
    padding: 20,
    gap: 6,
  },

  // Field
  fieldLabel: {
    fontSize: 12,
    color: "#3A5678",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A3050",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 4,
  },
  inputText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    padding: 0,
  },

  // Logout
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A3050",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});