import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <Text style={styles.title}>Forgot password</Text>
        <View style={styles.rule} />
        <Text style={styles.subtitle}>
          Enter your email and we'll send{"\n"}you a reset link.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrap}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor="#c8d6e6"
              style={styles.input}
              value={email}
            />
            <Ionicons name="create-outline" size={19} color="#c8d6e6" />
          </View>
        </View>

        <Pressable onPress={() => setSent(true)} style={styles.sendButton}>
          <Text style={styles.sendText}>Send reset link</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Login")} style={styles.backLink}>
          <Text style={styles.backText}>Back to Login</Text>
        </Pressable>
      </KeyboardAvoidingView>

      <Modal transparent visible={sent} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => navigation.navigate("Login")}>
          <View style={styles.alertCard}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={86} color="#08bd24" />
            </View>
            <Text style={styles.alertTitle}>Done!</Text>
            <Text style={styles.alertMessage}>Reset link sent!{"\n"}Check your email.</Text>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#9fb3c8",
  },
  content: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 430,
    paddingHorizontal: 60,
    paddingTop: 128,
    backgroundColor: "#9fb3c8",
  },
  title: {
    color: "#b7c9dd",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  rule: {
    height: 1,
    marginTop: 8,
    marginBottom: 19,
    backgroundColor: "#b7c9dd",
  },
  subtitle: {
    color: "#c8d6e6",
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
  },
  field: {
    marginTop: 84,
    marginHorizontal: 22,
  },
  label: {
    marginBottom: 4,
    color: "#c8d6e6",
    fontSize: 13,
  },
  inputWrap: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c8d6e6",
    borderRadius: 18,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: "#1e3f68",
    fontSize: 13,
    paddingVertical: 0,
  },
  sendButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 272,
    borderRadius: 24,
    backgroundColor: "#1e3f68",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  sendText: {
    color: "#c8d6e6",
    fontSize: 24,
    fontWeight: "900",
  },
  backLink: {
    alignItems: "center",
    marginTop: 18,
  },
  backText: {
    color: "#1e3f68",
    fontSize: 16,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(31,66,109,0.28)",
    padding: 26,
  },
  alertCard: {
    width: "100%",
    maxWidth: 350,
    minHeight: 305,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    backgroundColor: "#ffffff",
  },
  successCircle: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    borderRadius: 64,
    backgroundColor: "#c4f6c9",
  },
  alertTitle: {
    color: "#1e3f68",
    fontSize: 36,
    fontWeight: "900",
  },
  alertMessage: {
    marginTop: 22,
    color: "#1e3f68",
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
  },
});
