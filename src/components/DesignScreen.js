import { Image, ImageBackground, Pressable, StyleSheet, TextInput, View } from "react-native";

export const designAssets = {
  emptyHistory: require("../../docs/designs/UI designs/Empty History screen.png"),
  error: require("../../docs/designs/UI designs/Error state.png"),
  history: require("../../docs/designs/UI designs/History Screen.png"),
  historyDetails: require("../../docs/designs/UI designs/History Details Screen.png"),
  home: require("../../docs/designs/UI designs/Home Screen.png"),
  loading: require("../../docs/designs/UI designs/Loading spinner.png"),
  profile: require("../../docs/designs/UI designs/Profile screen.png"),
  results: require("../../docs/designs/UI designs/Results Screen.png"),
  selectType: require("../../docs/designs/UI designs/Select type dropdown.png"),
  success: require("../../docs/designs/UI designs/Success alert.png"),
  upload: require("../../docs/designs/UI designs/Upload Screen.png"),
};

export function ImageScreen({ children, source }) {
  return (
    <View style={styles.screen}>
      <ImageBackground fadeDuration={0} resizeMode="stretch" source={source} style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
}

export function DesignImage({ source, style }) {
  return <Image fadeDuration={0} resizeMode="stretch" source={source} style={style} />;
}

export function HitBox({ onPress, style }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.hitBox, style, pressed && styles.pressed]} />;
}

export function OverlayInput({ multiline, onChangeText, secureTextEntry, style, value }) {
  return (
    <TextInput
      autoCapitalize="none"
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
    textAlignVertical: "top",
  },
  pressed: {
    opacity: 0.72,
  },
});
