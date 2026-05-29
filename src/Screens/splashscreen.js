import { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";

const splashDesign = require("../../docs/designs/UI designs/Splash Screen.png");

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SafeAreaView style={styles.screen}>
      <Image source={splashDesign} resizeMode="contain" style={styles.design} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  design: {
    width: "100%",
    height: "100%",
  },
});
