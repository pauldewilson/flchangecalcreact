// react imports
import React, { useState, useContext } from "react";
import AltitudeContext from "../context/altitudeContext";
// material UI imports
import {
  Container,
  FormControl,
  FormGroup,
  Input,
  Button,
  Paper,
} from "@material-ui/core";
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
    const inputValue = e.target.value;
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "FLstart":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          altStartChange(parseInt(inputValue));
        }
        break;
      case "FLEnd":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          altEndChange(parseInt(inputValue));
        }
        break;
      case "KIAS":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          kiasChange(parseInt(inputValue));
        }
        break;
      case "NauticalMiles":
        if ((/^\d*$/.test(inputValue) && inputValue.length < 4) || "") {
          nmChange(parseInt(inputValue));
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
      e.target.parentNode.parentNode.elements[0].focus();
    } else {
      e.target.elements[0].focus();
    }
  };
  const submitFunc = (e) => {
    e.preventDefault();
    if ((altStart && altEnd && kias && nm)) {
      dispatch({
        type: "ADD",
        waypoint: {
          altStart,
          altEnd,
          kias,
          nm,
          waypoint,
          uuid:uuid(),
        },
      });
      resetForm(e);
    } else {
      console.log("Form invalid");
    }
  };
  return (
    <Container>
      <h1>Flight Level Change Calculator</h1>
      <Paper>
        <form onSubmit={submitFunc}>
          <FormGroup>
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
                autoFocus
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
                autoFocus
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
                autoFocus
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
                autoFocus
                id={"WayPoint"}
                name={"WayPoint"}
                placeholder={"Waypoint (optional)"}
                type={"text"}
                value={waypoint}
                onChange={stateChanger}
              />
            </FormControl>
          </FormGroup>
          <Button variant={"contained"} color={"primary"} type={"submit"}>
            Submit
          </Button>
          <Button variant={"text"} type={"reset"} onClick={resetForm}>
            Reset
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FormInput;
