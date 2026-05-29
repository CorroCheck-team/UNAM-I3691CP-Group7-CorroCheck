import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import DesignScreen, { box, designAssets, GhostInput, HitArea } from "../../components/DesignScreen";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <DesignScreen source={designAssets.forgotPassword}>
      <GhostInput onChangeText={setEmail} style={box(24, 40, 52, 4)} value={email} />
      <HitArea onPress={() => setSent(true)} style={box(17, 78, 66, 7)} />
      <HitArea onPress={() => navigation.navigate("Login")} style={box(35, 86, 30, 4)} />

      <Modal transparent visible={sent} animationType="fade">
        <View style={styles.overlay}>
          <Pressable onPress={() => navigation.navigate("Login")} style={styles.alert}>
            <DesignScreen source={designAssets.resetSuccess} />
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
});
