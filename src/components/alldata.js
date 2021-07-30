import React from "react";
import UserContext from "./context.js";
import { Table } from "react-bootstrap";
import NumberFormat from "react-number-format";

function AllData() {
  const ctx = React.useContext(UserContext);

  const getRowsData = () => {
    return ctx.users.map((user, index) => {
      return (
        <tr>
          <td>{index}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
            <NumberFormat
              value={user.balance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"  $"}
              decimalScale={"2"}
              fixedDecimalScale={true}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <td
            colSpan="45"
            align="center"
            style={{ backgroundColor: "green", color: "white" }}
          >
            USER ACCOUNTS
          </td>
        </tr>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>{getRowsData()}</tbody>
    </Table>
  );
}

export default AllData;
