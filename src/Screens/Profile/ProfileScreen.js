import { useState } from "react";

import DesignScreen, { box, designAssets, GhostInput, HitArea } from "../../components/DesignScreen";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const update = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <DesignScreen source={designAssets.profile}>
      <HitArea onPress={() => navigation.navigate("Home")} style={box(8, 4, 12, 7)} />
      <GhostInput onChangeText={(value) => update("name", value)} style={box(20, 39, 54, 4)} value={profile.name} />
      <GhostInput onChangeText={(value) => update("email", value)} style={box(20, 47, 54, 4)} value={profile.email} />
      <GhostInput
        onChangeText={(value) => update("password", value)}
        secureTextEntry
        style={box(20, 55, 54, 4)}
        value={profile.password}
      />
      <HitArea onPress={() => navigation.replace("Login")} style={box(18, 64, 64, 5)} />
      <HitArea onPress={() => navigation.navigate("Home")} style={box(10, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Upload")} style={box(30, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("History")} style={box(51, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Profile")} style={box(73, 88, 15, 8)} />
    </DesignScreen>
  );
}
