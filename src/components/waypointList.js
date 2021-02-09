import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import altitudeContext from "../context/altitudeContext";
import DescentCalculator from "./calculator";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const TableMaterialUI = () => {
  const { waypoint, dispatch } = useContext(altitudeContext);
  return (
    <TableContainer>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>Waypoint</TableCell>
            <TableCell>FL Start</TableCell>
            <TableCell>FL End</TableCell>
            <TableCell>KIAS</TableCell>
            <TableCell>N. Miles</TableCell>
            <TableCell><strong>Req. FPM</strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {waypoint.map((row) => {
            const removeItem = () => {
              dispatch({ type: "REMOVE_ONE", uuid: row.uuid });
            };
            const calc = new DescentCalculator(
              row.altStart,
              row.altEnd,
              row.kias,
              row.nm
            );
            calc.run();
            return (
              <TableRow key={row.uuid}>
                <TableCell>{row.waypoint}</TableCell>
                <TableCell>{row.altStart}</TableCell>
                <TableCell>{row.altEnd}</TableCell>
                <TableCell>{row.kias}</TableCell>
                <TableCell>{row.nm}</TableCell>
                <TableCell><strong>{isNaN(calc.fpm_with_speed) ? 0 : -Math.floor(calc.fpm_with_speed)}</strong></TableCell>
                <TableCell padding={"none"}>
                  <DeleteIcon onClick={removeItem} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMaterialUI;
