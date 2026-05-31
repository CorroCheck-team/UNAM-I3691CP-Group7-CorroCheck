import { Image, ImageBackground, Pressable, StyleSheet, TextInput, View } from "react-native";

export const authAssets = {
  forgotPassword: require("../../docs/designs/UI designs/Forgot password screen.png"),
  login: require("../../docs/designs/UI designs/Login screen.png"),
  resetSuccess: require("../../docs/designs/UI designs/reset link success.png"),
  signUp: require("../../docs/designs/UI designs/Sign Up screen.png"),
  splash: require("../../docs/designs/UI designs/Splash Screen.png"),
};

export function ScreenshotScreen({ children, source }) {
  return (
    <View style={styles.screen}>
      <ImageBackground fadeDuration={0} resizeMode="stretch" source={source} style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
}

export function HitBox({ onPress, style }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.hitBox, style, pressed && styles.pressed]} />;
}

export function OverlayInput({ onChangeText, secureTextEntry, style, value }) {
  return (
    <TextInput
      autoCapitalize="none"
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      value={value}
    />
  );
}

export function SuccessImageCard({ onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.successCard, pressed && styles.pressed]}>
      <Image fadeDuration={0} resizeMode="stretch" source={authAssets.resetSuccess} style={styles.successImage} />
    </Pressable>
  );
}

export function box(left, top, width, height) {
  return {
    height: `${height}%`,
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
  };
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#d7d7d7",
    flex: 1,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  hitBox: {
    position: "absolute",
  },
  input: {
    color: "#c1cede",
    fontSize: 14,
    padding: 0,
    paddingHorizontal: 10,
    position: "absolute",
  },
  pressed: {
    opacity: 0.72,
  },
  successCard: {
    height: 226,
    maxWidth: 330,
    width: "82%",
  },
  successImage: {
    height: "100%",
    width: "100%",
  },
});
