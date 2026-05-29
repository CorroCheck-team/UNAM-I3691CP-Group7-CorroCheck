import { useState } from "react";

import DesignScreen, { box, designAssets, GhostInput, HitArea } from "../../components/DesignScreen";

export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <DesignScreen source={designAssets.signUp}>
      <GhostInput onChangeText={(value) => update("name", value)} style={box(16, 30, 62, 4)} value={form.name} />
      <GhostInput onChangeText={(value) => update("email", value)} style={box(16, 38, 62, 4)} value={form.email} />
      <GhostInput
        onChangeText={(value) => update("password", value)}
        secureTextEntry
        style={box(16, 46, 62, 4)}
        value={form.password}
      />
      <GhostInput
        onChangeText={(value) => update("confirm", value)}
        secureTextEntry
        style={box(16, 54, 62, 4)}
        value={form.confirm}
      />
      <HitArea onPress={() => navigation.replace("Home")} style={box(35, 70, 30, 7)} />
      <HitArea onPress={() => navigation.navigate("Login")} style={box(61, 79, 20, 4)} />
    </DesignScreen>
  );
}
