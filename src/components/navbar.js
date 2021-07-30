import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import bankImage from "../images/bank.jpeg";
import UserContext from "./context.js";

const NavBar = (props) => {
  const ctx = useContext(UserContext);
  const handleLogOut = () => {
    ctx.setCurrentUser(-1);
    props.setLoggedIn(false);
    return <Redirect to="/" />;
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#/home/">
          <img
            src={bankImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Bad Bank Logo"
          />{" "}
          Bad Bank
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="#/createaccount/" disabled={!props.loggedIn}>
            Create Account
          </Nav.Link>
          <Nav.Link href="#/deposit/" disabled={!props.loggedIn}>
            Deposit
          </Nav.Link>
          <Nav.Link href="#/withdraw/" disabled={!props.loggedIn}>
            Withdraw
          </Nav.Link>
          <Nav.Link href="#/alldata/" disabled={!props.loggedIn}>
            All Data
          </Nav.Link>
          {ctx.currentUser !== -1 && (
            <NavDropdown
              title={ctx.users[ctx.currentUser].name}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onSelect={handleLogOut}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>{" "}
      </Container>
    </Navbar>
  );
};

export default NavBar;
