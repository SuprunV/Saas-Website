import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { Link, NavLink } from "react-router-dom";
import { Context } from "..";
import { RoutePaths, routesByRole } from "../routes/routes";
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
                <Navbar.Brand href={RoutePaths.MAIN}>
                    {" "}
                    React Bootstrap
                </Navbar.Brand>
                <Nav className="me-auto">
                    {routesByRole(User.user.role).map(
                        (route) =>
                            route.label && (
                                <Link
                                    role="button"
                                    className="nav-link"
                                    to={route.path}
                                >
                                    {route.label}
                                </Link>
                            )
                    )}
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    {User.isAuth ? (
                        <Navbar.Text className="d-flex align-items-center">
                            <span className="navbar-user">
                                <Link
                                    role="button"
                                    className="nav-link"
                                    to={RoutePaths.HOME}
                                >
                                    {User.user.name}
                                </Link>
                            </span>{" "}
                            <a onClick={logoutAction} className="cursor-pointer">Log Out</a>
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
