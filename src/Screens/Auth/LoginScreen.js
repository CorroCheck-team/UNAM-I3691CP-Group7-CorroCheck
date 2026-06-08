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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F1C2E', '#1A3050', '#2E5580', '#6B90B5', '#A8C4D8']}
        locations={[0, 0.2, 0.45, 0.75, 1]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topSection}>
            <View style={styles.avatarCircle}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A8C4D8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Ionicons name="create-outline" size={20} color="#A8C4D8" />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A8C4D8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#A8C4D8"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account?   </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  topSection: { alignItems: 'center', paddingTop: 90, paddingBottom: 60 },
  avatarCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 2.5, borderColor: '#A8C4D8', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'transparent' },
  avatarHead: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#A8C4D8', position: 'absolute', top: 22 },
  avatarBody: { width: 80, height: 55, borderRadius: 40, backgroundColor: '#A8C4D8', position: 'absolute', bottom: -10 },
  formSection: { paddingHorizontal: 40, marginBottom: 10 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#A8C4D8', borderRadius: 25, paddingHorizontal: 20, height: 52, marginBottom: 16, backgroundColor: 'transparent' },
  input: { flex: 1, color: '#FFFFFF', fontSize: 15 },
  bottomSection: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 40, paddingBottom: 50, paddingTop: 40, alignItems: 'center' },
  forgotPassword: { color: '#D0E4F0', fontSize: 13, marginBottom: 20, textAlign: 'center' },
  loginButton: { width: '75%', backgroundColor: '#1A3050', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginBottom: 24 },
  loginButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', letterSpacing: 0.5 },
  signupRow: { flexDirection: 'row', alignItems: 'center' },
  signupText: { color: '#D0E4F0', fontSize: 13 },
  signupLink: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});