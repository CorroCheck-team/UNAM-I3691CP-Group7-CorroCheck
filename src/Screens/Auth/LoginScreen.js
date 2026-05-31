import { useState } from "react";

import DesignScreen, { box, designAssets, GhostInput, HitArea } from "../../components/DesignScreen";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DesignScreen source={designAssets.login}>
      <GhostInput onChangeText={setEmail} style={box(22, 36, 56, 4)} value={email} />
      <GhostInput
        onChangeText={setPassword}
        secureTextEntry
        style={box(22, 41, 56, 4)}
        value={password}
      />
      <HitArea onPress={() => navigation.navigate("ForgotPassword")} style={box(36, 73, 28, 3)} />
      <HitArea onPress={() => navigation.replace("Home")} style={box(22, 79, 56, 6)} />
      <HitArea onPress={() => navigation.navigate("SignUp")} style={box(67, 88, 17, 3)} />
    </DesignScreen>
  );
}
