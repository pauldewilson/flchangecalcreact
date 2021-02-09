// react imports
import React, { useEffect, useReducer } from "react";
import waypointReducer from "../reducer/waypointReducer";
import AltitudeContext from "../context/altitudeContext";
import FormInput from "./formInput";
import WaypointList from "./waypointList";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from '@material-ui/core/Link';
// material UI imports

const App = () => {
  // use effect to get from local storage and clean on close
  useEffect(() => {
    // use effect to load from localstorage and set to state where exists
    const waypointsFromLS = JSON.parse(localStorage.getItem("waypointsFromLS"));
    if (waypointsFromLS) {
      dispatch({ type: "ADD_FROM_LS", waypointsFromLS });
    }
  }, []);
  // use reducer to mimic redux store and get dispatch
  const [waypoint, dispatch] = useReducer(waypointReducer, []);
  useEffect(() => {
    // use effect to set waypoints to local storage on state update
    localStorage.setItem("waypointsFromLS", JSON.stringify(waypoint));
  }, [waypoint]);
  return (
    <AltitudeContext.Provider value={{ waypoint, dispatch }}>
      <Container>
        <Typography paragraph align={"center"} variant={"h2"} component={"h2"}>
          FL Change Calculator
        </Typography>
        <Typography align={"center"}>
        <Link target="_blank" href="https://github.com/pauldewilson/flchangecalcreact">GitHub Repo</Link>
        </Typography>
        <FormInput />
        <hr></hr>
        <WaypointList />
      </Container>
    </AltitudeContext.Provider>
  );
};

export default App;
