import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../../firebase/firebase";

export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // =========================
  // SIGN UP
  // =========================
  const handleSignup = async () => {

    if (!form.name || !form.email || !form.password || !form.confirm) {
      Alert.alert("Missing details", "Please fill in all fields");
      return;
    }

    if (form.password !== form.confirm) {
      Alert.alert("Password mismatch", "Passwords do not match");
      return;
    }

    try {

      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      Alert.alert(
        "Success",
        "Account created successfully!"
      );

    } catch (error) {

      Alert.alert(
        "Signup Error",
        error.message
      );
    }
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {

    if (!form.email || !form.password) {
      Alert.alert(
        "Missing details",
        "Enter email and password"
      );
      return;
    }

    try {

      await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      Alert.alert(
        "Success",
        "Logged in successfully!"
      );

    } catch (error) {

      Alert.alert(
        "Login Error",
        error.message
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >

        <View style={styles.phone}>

          <Text style={styles.title}>
            Create account
          </Text>

          {/* FULL NAME */}
          <TextInput
            autoCapitalize="words"
            onChangeText={(value) =>
              handleChange("name", value)
            }
            placeholder="Enter your full name"
            placeholderTextColor="#cbd5e1"
            style={styles.input}
            value={form.name}
          />

          {/* EMAIL */}
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) =>
              handleChange("email", value)
            }
            placeholder="Enter your Email address"
            placeholderTextColor="#cbd5e1"
            style={styles.input}
            value={form.email}
          />

          {/* PASSWORD */}
          <View style={styles.inputGroup}>

            <TextInput
              autoCapitalize="none"
              onChangeText={(value) =>
                handleChange("password", value)
              }
              placeholder="Enter your password"
              placeholderTextColor="#cbd5e1"
              secureTextEntry={!showPassword}
              style={[
                styles.input,
                styles.inputWithIcon,
              ]}
              value={form.password}
            />

            <Pressable
              accessibilityLabel="Toggle password visibility"
              onPress={() =>
                setShowPassword((current) => !current)
              }
              style={styles.eyeButton}
            >
              <Text style={styles.eyeText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>

          </View>

          {/* CONFIRM PASSWORD */}
          <View style={styles.inputGroup}>

            <TextInput
              autoCapitalize="none"
              onChangeText={(value) =>
                handleChange("confirm", value)
              }
              placeholder="Confirm your password"
              placeholderTextColor="#cbd5e1"
              secureTextEntry={!showConfirm}
              style={[
                styles.input,
                styles.inputWithIcon,
              ]}
              value={form.confirm}
            />

            <Pressable
              accessibilityLabel="Toggle confirm password visibility"
              onPress={() =>
                setShowConfirm((current) => !current)
              }
              style={styles.eyeButton}
            >
              <Text style={styles.eyeText}>
                {showConfirm ? "Hide" : "Show"}
              </Text>
            </Pressable>

          </View>

          {/* SIGN UP BUTTON */}
          <Pressable
            onPress={handleSignup}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              SIGN UP
            </Text>
          </Pressable>

          {/* LOGIN */}
          <Pressable onPress={handleLogin}>

            <Text style={styles.text}>
              Already have an account?
              <Text style={styles.link}>
                {" "}Sign in
              </Text>
            </Text>

          </Pressable>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f5",
  },

  keyboardView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  phone: {
    width: "100%",
    maxWidth: 480,
    minHeight: 640,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 35,
    backgroundColor: "#7a8ca5",
  },

  title: {
    marginBottom: 25,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  inputGroup: {
    position: "relative",
  },

  input: {
    width: "100%",
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#1f3b63",
    color: "#ffffff",
  },

  inputWithIcon: {
    paddingRight: 74,
  },

  eyeButton: {
    position: "absolute",
    top: 0,
    right: 6,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  eyeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: "#0a2342",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  text: {
    marginTop: 15,
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },

  link: {
    textDecorationLine: "underline",
  },
});