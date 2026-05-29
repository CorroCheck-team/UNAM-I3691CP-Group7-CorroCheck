import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import DesignScreen, { box, designAssets, GhostInput, HitArea } from "../../components/DesignScreen";

export default function UploadScreen({ navigation }) {
  const [typeOpen, setTypeOpen] = useState(false);
  const [photoSelected, setPhotoSelected] = useState(false);
  const [typeSelected, setTypeSelected] = useState(false);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const submit = () => {
    setLoading(true);
    setFailed(false);

    setTimeout(() => {
      setLoading(false);
      if (!photoSelected || !typeSelected || !location.trim()) {
        setFailed(true);
        return;
      }

      navigation.navigate("Results");
    }, 350);
  };

  return (
    <DesignScreen source={designAssets.upload}>
      <HitArea onPress={() => setPhotoSelected(true)} style={box(7, 10, 86, 22)} />
      <HitArea onPress={() => setTypeOpen(true)} style={box(6, 34, 88, 6)} />
      <GhostInput onChangeText={setLocation} style={box(9, 52, 82, 5)} value={location} />
      <GhostInput multiline onChangeText={setNotes} style={box(9, 61, 82, 10)} value={notes} />
      <HitArea onPress={submit} style={box(6, 78, 88, 8)} />
      <HitArea onPress={() => navigation.navigate("Home")} style={box(10, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Upload")} style={box(30, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("History")} style={box(51, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Profile")} style={box(73, 88, 15, 8)} />

      <Modal transparent visible={typeOpen} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setTypeOpen(false)}>
          <View style={styles.dropdown}>
            <DesignScreen source={designAssets.selectType}>
              {[0, 1, 2, 3].map((index) => (
                <HitArea
                  key={index}
                  onPress={() => {
                    setTypeSelected(true);
                    setTypeOpen(false);
                  }}
                  style={box(0, index * 25, 100, 25)}
                />
              ))}
            </DesignScreen>
          </View>
        </Pressable>
      </Modal>

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alert}>
            <DesignScreen source={designAssets.loading} />
          </View>
        </View>
      </Modal>

      <Modal transparent visible={failed} animationType="fade">
        <Pressable onPress={() => setFailed(false)} style={styles.overlay}>
          <View style={styles.alert}>
            <DesignScreen source={designAssets.error} />
          </View>
        </Pressable>
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
  dropdown: {
    width: 210,
    height: 220,
  },
  alert: {
    width: "92%",
    height: "34%",
  },
});
