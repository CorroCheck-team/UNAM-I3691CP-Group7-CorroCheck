import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import DesignScreen, { box, designAssets, DesignImage, GhostInput, HitArea } from "../../components/DesignScreen";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <DesignScreen source={designAssets.forgotPassword}>
      <GhostInput onChangeText={setEmail} style={box(24, 40, 52, 4)} value={email} />
      <HitArea onPress={() => setSent(true)} style={box(16, 78, 68, 7)} />
      <HitArea onPress={() => navigation.navigate("Login")} style={box(34, 86, 32, 4)} />

      <Modal transparent visible={sent} animationType="fade">
        <View style={styles.overlay}>
          <Pressable onPress={() => navigation.navigate("Login")} style={styles.alert}>
            <DesignImage source={designAssets.resetSuccess} style={styles.alertImage} />
          </Pressable>
        </View>
      </Modal>
    </DesignScreen>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 63, 104, 0.42)",
  },
  alert: {
    width: "92%",
    height: "34%",
  },
  alertImage: {
    width: "100%",
    height: "100%",
  },
});
