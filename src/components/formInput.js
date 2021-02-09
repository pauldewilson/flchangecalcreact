// react imports
import React, { useState, useContext } from "react";
import AltitudeContext from "../context/altitudeContext";
// material UI imports
import { FormControl, FormGroup, Input, Button, Grid } from "@material-ui/core";
// other imports
import { v4 as uuid } from "uuid";

const FormInput = () => {
  // state components
  const { dispatch } = useContext(AltitudeContext);
  const [altStart, altStartChange] = useState("");
  const [altEnd, altEndChange] = useState("");
  const [kias, kiasChange] = useState("");
  const [nm, nmChange] = useState("");
  const [waypoint, waypointChange] = useState("");
  const stateChanger = (e) => {
    // function manages state changes
    let inputValue = e.target.value;
    console.log(isNaN(inputValue));
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "FLstart":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          altStartChange(inputValue);
        }
        break;
      case "FLEnd":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          altEndChange(inputValue);
        }
        break;
      case "KIAS":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          kiasChange(inputValue);
        }
        break;
      case "NauticalMiles":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          nmChange(inputValue);
        }
        break;
      case "WayPoint":
        // minimal validation required, optional
        if (inputValue.length < 11) {
          waypointChange(inputValue.toUpperCase());
        }
        break;
    }
    // work only for number input
  };
  const resetForm = (e) => {
    e.preventDefault();
    altStartChange("");
    altEndChange("");
    kiasChange("");
    nmChange("");
    waypointChange("");
    // ensure correct focus is set depending on whether submit or reset
    if (e.target.innerText === "RESET") {
      e.target.parentNode.parentNode.parentNode.elements[0].focus();
    } else {
      e.target.elements[0].focus();
    }
  };
  const submitFunc = (e) => {
    e.preventDefault();
    if (altStart && altEnd && kias && nm) {
      dispatch({
        type: "ADD",
        waypoint: {
          altStart,
          altEnd,
          kias,
          nm,
          waypoint: waypoint === "" ? "-" : waypoint,
          uuid: uuid(),
        },
      });
      resetForm(e);
    };
  };
  return (
    <form onSubmit={submitFunc}>
      <FormGroup>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <FormControl>
            <Input
              autoFocus
              id={"FLstart"}
              name={"FLstart"}
              placeholder={"FL Start (350)"}
              type={"text"}
              value={altStart}
              onChange={stateChanger}
            />
          </FormControl>
          <FormControl>
            <Input
              id={"FLEnd"}
              name={"FLEnd"}
              placeholder={"FL End (050)"}
              type={"text"}
              value={altEnd}
              onChange={stateChanger}
            />
          </FormControl>
          <FormControl>
            <Input
              id={"KIAS"}
              name={"KIAS"}
              placeholder={"KIAS"}
              type={"text"}
              value={kias}
              onChange={stateChanger}
            />
          </FormControl>
          <FormControl>
            <Input
              id={"NauticalMiles"}
              name={"NauticalMiles"}
              placeholder={"Nautical Miles"}
              type={"text"}
              value={nm}
              onChange={stateChanger}
            />
          </FormControl>
          <FormControl>
            <Input
              id={"WayPoint"}
              name={"WayPoint"}
              placeholder={"Waypoint (optional)"}
              type={"text"}
              value={waypoint}
              onChange={stateChanger}
            />
          </FormControl>
        </Grid>
      </FormGroup>
      <br></br>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button variant={"contained"} color={"primary"} type={"submit"}>
          Submit
        </Button>
        <Button variant={"text"} type={"reset"} onClick={resetForm}>
          Reset
        </Button>
      </Grid>
    </form>
  );
};

export default FormInput;
