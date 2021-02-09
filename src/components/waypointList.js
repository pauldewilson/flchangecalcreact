import React, { useContext } from "react";
import altitudeContext from "../context/altitudeContext";
import WaypointItem from "./waypointItem";

const WaypointList = () => {
  const { waypoint } = useContext(altitudeContext);
  return (
    <div>
      {waypoint.map((item) => (
        <WaypointItem key={item.uuid} waypointItem={item} />
      ))}
    </div>
  );
};

export default WaypointList;
