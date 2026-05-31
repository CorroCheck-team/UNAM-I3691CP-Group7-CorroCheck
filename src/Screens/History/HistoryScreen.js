import { useMemo, useState } from "react";

import DesignScreen, { box, designAssets, GhostInput, HitArea } from "../../components/DesignScreen";
import { inspections } from "../../data/inspections";

export default function HistoryScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const visibleInspections = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return [...inspections, ...inspections];
    }

    return inspections.filter((item) =>
      [item.title, item.date, item.severity, item.corrosionType]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [query]);
  const empty = visibleInspections.length === 0;

  return (
    <DesignScreen source={empty ? designAssets.emptyHistory : designAssets.history}>
      <GhostInput onChangeText={setQuery} style={box(16, 10, 72, 5)} value={query} />
      {!empty ? (
        <>
          <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: visibleInspections[0] })} style={box(6, 21, 88, 12)} />
          <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: visibleInspections[1] || inspections[1] })} style={box(6, 35, 88, 12)} />
          <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: visibleInspections[2] || inspections[2] })} style={box(6, 49, 88, 12)} />
          <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: visibleInspections[3] || inspections[3] })} style={box(6, 63, 88, 12)} />
          <HitArea onPress={() => navigation.navigate("HistoryDetails", { item: visibleInspections[4] || inspections[0] })} style={box(6, 77, 88, 10)} />
        </>
      ) : null}
      <HitArea onPress={() => navigation.navigate("Home")} style={box(10, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Upload")} style={box(30, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("History")} style={box(51, 88, 15, 8)} />
      <HitArea onPress={() => navigation.navigate("Profile")} style={box(73, 88, 15, 8)} />
    </DesignScreen>
  );
}
