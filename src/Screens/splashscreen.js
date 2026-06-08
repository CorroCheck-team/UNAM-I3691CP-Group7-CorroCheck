import { useEffect } from "react";

import { authAssets, ScreenshotScreen } from "../components/AuthLayout";

export default function SplashScreen({ navigation, onFinish }) {
  useEffect(() => {
    const finish = onFinish || (() => navigation.replace("Login"));
    const timer = setTimeout(finish, 3000);

    return () => clearTimeout(timer);
  }, [navigation, onFinish]);

  return <ScreenshotScreen source={authAssets.splash} />;
}
