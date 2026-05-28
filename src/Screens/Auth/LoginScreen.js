import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.screen}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <LinearGradient
          colors={['#1f426d', '#68849f', '#b6cce0']}
          locations={[0, 0.52, 1]}
          style={styles.panel}
        >
          <View style={styles.avatarOuter}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarBody} />
          </View>

          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#d4deeb"
                style={styles.input}
              />
              <Ionicons name="create-outline" size={20} color="#d4deeb" />
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#d4deeb"
                secureTextEntry={!passwordVisible}
                style={styles.input}
              />
              <TouchableOpacity
                accessibilityLabel="Toggle password visibility"
                onPress={() => setPasswordVisible((visible) => !visible)}
              >
                <Ionicons
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#d4deeb"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupPrompt}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  panel: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 56,
    paddingTop: 112,
  },
  avatarOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 10,
    borderColor: '#bdd0e7',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 45,
  },
  avatarHead: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#bdd0e7',
    marginTop: 11,
  },
  avatarBody: {
    position: 'absolute',
    bottom: -9,
    width: 88,
    height: 45,
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    backgroundColor: '#bdd0e7',
  },
  form: {
    width: '100%',
  },
  inputWrap: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: '#c6d6e6',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 9,
    marginBottom: 14,
    shadowColor: '#19395d',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    paddingVertical: 0,
  },
  bottomSpacer: {
    flex: 1,
  },
  forgotText: {
    color: '#1f426d',
    fontSize: 11,
  },
  loginButton: {
    width: 166,
    height: 41,
    borderRadius: 21,
    backgroundColor: '#1f426d',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 27,
  },
  loginText: {
    color: '#c6d6e6',
    fontSize: 20,
    fontWeight: '700',
  },
  signupRow: {
    width: '100%',
    marginTop: 16,
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signupPrompt: {
    color: '#1f426d',
    fontSize: 11,
  },
  signupText: {
    color: '#1f426d',
    fontSize: 11,
  },
});
