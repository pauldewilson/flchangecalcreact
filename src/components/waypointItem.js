import React, { useContext } from "react";
import altitudeContext from "../context/altitudeContext";
import DescentCalculator from './calculator';
import { Card, Button } from "@material-ui/core";

const WaypointItem = ({ waypointItem }) => {
  const { dispatch } = useContext(altitudeContext);
  const removeItem = () => {
      dispatch({type:"REMOVE_ONE", uuid:waypointItem.uuid})
  };
  const calc = new DescentCalculator(waypointItem.altStart,waypointItem.altEnd,waypointItem.kias,waypointItem.nm)
  calc.run();
  return (
    <Card>
      Name: {waypointItem.waypoint}
      <br></br>
      Alt 1: {waypointItem.altStart}
      <br></br>
      Alt 2: {waypointItem.altEnd}
      <br></br>
      KIAS: {waypointItem.kias}
      <br></br>
      NM: {waypointItem.altEnd}
      <br></br>
      FPM Required: {-calc.fpm_with_speed}
      <br></br>
      <Button variant={"outlined"} color={"secondary"} onClick={removeItem}>X</Button>
    </Card>
  );
};

export default WaypointItem;
