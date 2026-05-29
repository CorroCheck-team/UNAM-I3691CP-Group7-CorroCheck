import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { BottomNav, ScreenShell } from "../../components/AppScaffold";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    password: "password",
  });

  const updateProfile = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <ScreenShell activeTab="Profile">
      <View style={styles.topBar}>
        <Pressable
          accessibilityLabel="Back to home"
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-circle-outline" size={28} color="#1e3f68" />
        </Pressable>
        <View style={styles.notch} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={104} color="#1e3f68" />
          </View>
          <View style={styles.editAvatar}>
            <Ionicons name="pencil-outline" size={23} color="#b7c9dd" />
          </View>
        </View>

        <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
        <Text style={styles.email}>{profile.email}</Text>

        <View style={styles.card}>
          <ProfileField
            icon="create-outline"
            label="Name"
            onChangeText={(value) => updateProfile("name", value)}
            value={profile.name}
          />
          <ProfileField
            autoCapitalize="none"
            icon="mail-outline"
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => updateProfile("email", value)}
            value={profile.email}
          />
          <ProfileField
            icon="eye-off-outline"
            label="Change password"
            onChangeText={(value) => updateProfile("password", value)}
            secure
            value={profile.password}
          />
          <Pressable onPress={() => navigation.replace("Login")} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
            <Ionicons name="log-out-outline" size={22} color="#b7c9dd" />
          </Pressable>
        </View>
      </View>

      <BottomNav activeTab="Profile" navigation={navigation} />
    </ScreenShell>
  );
}

function ProfileField({ icon, label, secure, value, ...props }) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          editable
          secureTextEntry={secure}
          style={styles.input}
          value={value}
          {...props}
        />
        <Ionicons name={icon} size={20} color="#b7c9dd" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 56,
    backgroundColor: "#d8e3ef",
  },
  backButton: {
    position: "absolute",
    left: 44,
    top: 15,
  },
  notch: {
    alignSelf: "center",
    width: 110,
    height: 30,
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: "#1e3f68",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 17,
  },
  avatarWrap: {
    width: 150,
    height: 150,
  },
  avatar: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
    backgroundColor: "#b7c9dd",
  },
  editAvatar: {
    position: "absolute",
    right: 2,
    bottom: 16,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#1e3f68",
  },
  name: {
    marginTop: 8,
    color: "#1e3f68",
    fontSize: 20,
    fontWeight: "900",
  },
  email: {
    marginTop: 5,
    color: "#1e3f68",
    fontSize: 16,
  },
  card: {
    width: "78%",
    minHeight: 400,
    marginTop: 18,
    paddingHorizontal: 38,
    paddingTop: 28,
    borderRadius: 49,
    backgroundColor: "#b7c9dd",
  },
  fieldBlock: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 6,
    marginBottom: 2,
    color: "#1e3f68",
    fontSize: 12,
  },
  inputWrap: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingLeft: 12,
    paddingRight: 13,
    backgroundColor: "#1e3f68",
  },
  input: {
    flex: 1,
    color: "#b7c9dd",
    fontSize: 14,
    paddingVertical: 0,
  },
  logoutButton: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: "#1e3f68",
  },
  logoutText: {
    color: "#b7c9dd",
    fontSize: 14,
  },
});
