import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

import DesignScreen, { box, designAssets, DesignImage, HitArea } from "../../components/DesignScreen";
import { defaultInspection } from "../../data/inspections";

export default function ResultScreen({ navigation }) {
  const [saved, setSaved] = useState(false);

  const viewHistory = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigation.navigate("HistoryDetails", { item: defaultInspection });
    }, 900);
  };

  return (
    <DesignScreen source={designAssets.results}>
      <HitArea onPress={viewHistory} style={box(7, 82, 86, 6)} />
      <HitArea onPress={() => navigation.navigate("Home")} style={box(7, 90, 86, 6)} />

      <Modal transparent visible={saved} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alert}>
            <DesignImage source={designAssets.success} style={styles.alertImage} />
          </View>
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
    backgroundColor: "rgba(30, 63, 104, 0.35)",
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
