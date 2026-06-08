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
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSendResetLink = () => {
    // TODO (Backend team): Replace with Firebase password reset
    // sendPasswordResetEmail(auth, email)
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
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
        <View style={styles.content}>

          {/* Title + divider */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Forgot password</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>
              Enter your email and we'll send{'\n'}you a reset link.
            </Text>
          </View>

          {/* Email input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#A8C4D8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Ionicons name="create-outline" size={20} color="#A8C4D8" />
            </View>
          </View>

          {/* Bottom - Send reset link + Back to Login */}
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendResetLink}>
              <Text style={styles.sendButtonText}>Send reset link</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backToLogin}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Success Modal */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={handleModalClose}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={handleModalClose}
          >
            <View style={styles.modalCard}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={40} color="#22C55E" />
              </View>
              <Text style={styles.modalTitle}>Done!</Text>
              <Text style={styles.modalMessage}>
                Reset link sent!{'\n'}Check your email.
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleSection: {
    alignItems: 'center',
    paddingTop: 90,
    marginBottom: 50,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 14,
    textAlign: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#A8C4D8',
    width: '100%',
    marginBottom: 20,
  },
  subtitle: {
    color: '#D0E4F0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputSection: {
    width: '100%',
  },
  label: {
    color: '#D0E4F0',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#A8C4D8',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 52,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 55,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  sendButton: {
    width: '85%',
    backgroundColor: '#1A3050',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  backToLogin: {
    color: '#D0E4F0',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 50,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#1A2E45',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalMessage: {
    color: '#3D6080',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});