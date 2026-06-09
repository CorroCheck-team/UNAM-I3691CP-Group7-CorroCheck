import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseConfig';
import { createUserDocument } from '../../services/firebase/userService';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await createUserDocument(user.uid, fullName, email);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#3D5A7A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#7A9BBF"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email address"
              placeholderTextColor="#7A9BBF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#7A9BBF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#7A9BBF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#7A9BBF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#7A9BBF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signUpButtonText}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account?   </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3D5A7A' },
  scrollContent: { flexGrow: 1 },
  header: { paddingTop: 70, paddingBottom: 50, paddingRight: 36, alignItems: 'flex-end' },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: '600', letterSpacing: 0.3 },
  formSection: { paddingHorizontal: 36 },
  label: { color: '#B0C8E0', fontSize: 13, marginBottom: 6, marginLeft: 2 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2E4A6A', borderRadius: 10, paddingHorizontal: 16, height: 50, marginBottom: 18 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 15 },
  bottomSection: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 36, paddingBottom: 50, paddingTop: 80 },
  signUpButton: { backgroundColor: '#1E3350', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginBottom: 20 },
  signUpButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { color: '#B0C8E0', fontSize: 13 },
  loginLink: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});
