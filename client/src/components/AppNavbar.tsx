import React, { FC } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { RoutePaths } from "../routes/routes";
import "../styles/navbar.scss";
const AppNavbar: FC = () => {
  const logoutAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("action for logout");
  };
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href={RoutePaths.HOME}> React Bootstrap</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href={RoutePaths.AUTH}>Authorization</Nav.Link>
          <Nav.Link href="#pricing">Page 2</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <span className="navbar-user">Leonid</span>{" "}
            <a onClick={logoutAction} href="#">
              {" "}
              Log Out
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AppNavbar;
