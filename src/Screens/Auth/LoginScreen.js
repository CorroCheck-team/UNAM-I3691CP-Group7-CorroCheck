import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={74} color="#b7c9dd" />
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#c8d6e6"
              style={styles.input}
            />
            <Ionicons name="create-outline" size={19} color="#c8d6e6" />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#c8d6e6"
              secureTextEntry={!passwordVisible}
              style={styles.input}
            />
            <Pressable
              accessibilityLabel="Toggle password visibility"
              onPress={() => setPasswordVisible((visible) => !visible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={19}
                color="#c8d6e6"
              />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>

        <Pressable onPress={() => navigation.replace("Home")} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <View style={styles.signupRow}>
          <Text style={styles.signupPrompt}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupText}>Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: "center",
    paddingHorizontal: 72,
    paddingTop: 140,
    backgroundColor: "#9fb3c8",
  },
  avatar: {
    width: 126,
    height: 126,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 54,
    borderRadius: 63,
    borderWidth: 12,
    borderColor: "#b7c9dd",
  },
  form: {
    width: "100%",
    gap: 14,
  },
  inputWrap: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c8d6e6",
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: "rgba(31,66,109,0.12)",
  },
  input: {
    flex: 1,
    color: "#1f426d",
    fontSize: 14,
    paddingVertical: 0,
  },
  forgotText: {
    marginTop: 196,
    color: "#1f426d",
    fontSize: 12,
    fontWeight: "500",
  },
  loginButton: {
    width: 200,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 31,
    borderRadius: 24,
    backgroundColor: "#1f426d",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  loginText: {
    color: "#c8d6e6",
    fontSize: 23,
    fontWeight: "800",
  },
  signupRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  signupPrompt: {
    color: "#1f426d",
    fontSize: 12,
  },
  signupText: {
    color: "#1f426d",
    fontSize: 12,
  },
});
