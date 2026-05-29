import DesignScreen, { box, designAssets, HitArea } from "../../components/DesignScreen";

export default function HistoryDetailsScreen({ navigation }) {
  return (
    <DesignScreen source={designAssets.historyDetails}>
      <HitArea onPress={() => navigation.navigate("Home")} style={box(8, 3, 13, 8)} />
      <HitArea onPress={() => navigation.navigate("History")} style={box(7, 83, 86, 8)} />
    </DesignScreen>
  );
}
