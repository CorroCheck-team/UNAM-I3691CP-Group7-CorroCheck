import { useEffect } from "react";

import DesignScreen, { designAssets } from "../components/DesignScreen";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 700);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return <DesignScreen source={designAssets.splash} />;
}
