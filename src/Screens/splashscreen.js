import { useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";

const splashDesign = require("../../docs/designs/screens/Splash Screen.png");

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 7000);

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
    backgroundColor: "#202020",
  },
  design: {
    width: "100%",
    height: "100%",
  },
});
