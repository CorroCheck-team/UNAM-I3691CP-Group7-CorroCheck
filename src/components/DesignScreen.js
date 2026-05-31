import { Image, ImageBackground, Pressable, StatusBar, StyleSheet, TextInput, View } from "react-native";

export const designAssets = {
  emptyHistory: require("../../docs/designs/UI designs/Empty History screen.png"),
  error: require("../../docs/designs/UI designs/Error state.png"),
  forgotPassword: require("../../docs/designs/UI designs/Forgot password screen.png"),
  history: require("../../docs/designs/UI designs/History Screen.png"),
  historyDetails: require("../../docs/designs/UI designs/History Details Screen.png"),
  home: require("../../docs/designs/UI designs/Home Screen.png"),
  loading: require("../../docs/designs/UI designs/Loading spinner.png"),
  login: require("../../docs/designs/UI designs/Login screen.png"),
  profile: require("../../docs/designs/UI designs/Profile screen.png"),
  resetSuccess: require("../../docs/designs/UI designs/reset link success.png"),
  results: require("../../docs/designs/UI designs/Results Screen.png"),
  selectType: require("../../docs/designs/UI designs/Select type dropdown.png"),
  signUp: require("../../docs/designs/UI designs/Sign Up screen.png"),
  splash: require("../../docs/designs/UI designs/Splash Screen.png"),
  success: require("../../docs/designs/UI designs/Success alert.png"),
  upload: require("../../docs/designs/UI designs/Upload Screen.png"),
};

export default function DesignScreen({ children, source }) {
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <ImageBackground fadeDuration={0} resizeMode="stretch" source={source} style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
}

export function DesignImage({ source, style }) {
  return <Image fadeDuration={0} resizeMode="stretch" source={source} style={style} />;
}

export function HitArea({ children, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.hitArea, style]}>
      {children}
    </Pressable>
  );
}

export function GhostInput({ multiline, onChangeText, secureTextEntry, style, value }) {
  return (
    <TextInput
      multiline={multiline}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      value={value}
    />
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
    flex: 1,
    width: "100%",
    backgroundColor: "#f4f4f4",
  },
  image: {
    flex: 1,
  },
  hitArea: {
    position: "absolute",
  },
  input: {
    position: "absolute",
    color: "transparent",
    padding: 0,
  },
});
