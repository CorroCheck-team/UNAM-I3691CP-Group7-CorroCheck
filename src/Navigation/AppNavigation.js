import { useState } from "react";

import SignUpScreen from "../Screens/Auth/SignUpScreen";
import SplashScreen from "../Screens/splashscreen";

export default function AppNavigation() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <SignUpScreen />;
}
