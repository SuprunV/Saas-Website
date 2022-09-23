import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { Link, NavLink } from "react-router-dom";
import { Context } from "..";
import { RoutePaths } from "../routes/routes";
import "../styles/navbar.scss";
import { IUserToken } from "../types/UserTypes";
const AppNavbar: FC = observer(() => {
    const { User } = useContext(Context);

    const logoutAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        User.setIsAuth(false);
        User.setUser({} as IUserToken);
    };

    return (
        <Navbar bg="dark" variant="dark" className="navbar">
            <Container>
                <Navbar.Brand href={RoutePaths.HOME}>
                    {" "}
                    React Bootstrap
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={RoutePaths.AUTH}>Authorization</Nav.Link>
                    <Nav.Link href="#pricing">Page 2</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {User.isAuth ? (
                        <Navbar.Text>
                            <span className="navbar-user">
                                {User.user.name}
                            </span>{" "}
                            <a onClick={logoutAction}>Log Out</a>
                        </Navbar.Text>
                    ) : (
                        <Navbar.Text>
                            <Link to={RoutePaths.AUTH}>Log in</Link>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});
export default AppNavbar;
