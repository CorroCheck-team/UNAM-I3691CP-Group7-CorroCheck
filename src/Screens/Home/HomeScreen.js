import DesignScreen, { box, designAssets, HitArea } from "../../components/DesignScreen";
import { inspections } from "../../data/inspections";

export default function HomeScreen({ navigation }) {
  return (
    <DesignScreen source={designAssets.home}>
      <HitArea onPress={() => navigation.navigate("Profile")} style={box(78, 4, 18, 11)} />
      <HitArea onPress={() => navigation.navigate("Upload")} style={box(6, 36, 88, 8)} />
      <HitArea onPress={() => navigation.navigate("History")} style={box(74, 46, 20, 5)} />
      <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: inspections[0] })} style={box(6, 51, 88, 7)} />
      <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: inspections[1] })} style={box(6, 60, 88, 7)} />
      <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: inspections[2] })} style={box(6, 69, 88, 7)} />
      <HitArea onPress={() => navigation.navigate("Home")} style={box(10, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Upload")} style={box(30, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("History")} style={box(51, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Profile")} style={box(73, 88, 15, 8)} />
    </DesignScreen>
  );
}
