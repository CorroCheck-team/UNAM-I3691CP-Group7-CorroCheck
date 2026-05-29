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

export default function SignUpScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <Text style={styles.title}>Create account</Text>

        <Field
          label="Full Name"
          onChangeText={(value) => update("name", value)}
          placeholder="Enter your full name"
          value={form.name}
        />
        <Field
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={(value) => update("email", value)}
          placeholder="Enter your Email address"
          value={form.email}
        />
        <Field
          action={
            <Pressable onPress={() => setShowPassword((value) => !value)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#b7c9dd"
              />
            </Pressable>
          }
          label="Password"
          onChangeText={(value) => update("password", value)}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          value={form.password}
        />
        <Field
          action={
            <Pressable onPress={() => setShowConfirm((value) => !value)}>
              <Ionicons
                name={showConfirm ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#b7c9dd"
              />
            </Pressable>
          }
          label="Confirm password"
          onChangeText={(value) => update("confirm", value)}
          placeholder="Confirm your password"
          secureTextEntry={!showConfirm}
          value={form.confirm}
        />

        <Pressable onPress={() => navigation.replace("Home")} style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ action, label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor="#b7c9dd"
          style={styles.input}
          {...props}
        />
        {action}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1e3f68",
  },
  content: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 430,
    paddingHorizontal: 72,
    paddingTop: 108,
    backgroundColor: "#1e3f68",
  },
  title: {
    alignSelf: "flex-end",
    marginBottom: 78,
    color: "#b7c9dd",
    fontSize: 25,
    fontWeight: "800",
  },
  field: {
    marginBottom: 17,
  },
  label: {
    marginBottom: 5,
    color: "#b7c9dd",
    fontSize: 12,
  },
  inputRow: {
    minHeight: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    paddingVertical: 0,
  },
  signupButton: {
    alignSelf: "center",
    marginTop: 105,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signupText: {
    color: "#b7c9dd",
    fontSize: 26,
    fontWeight: "900",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 18,
  },
  loginPrompt: {
    color: "#b7c9dd",
    fontSize: 12,
  },
  loginText: {
    color: "#b7c9dd",
    fontSize: 12,
  },
});
