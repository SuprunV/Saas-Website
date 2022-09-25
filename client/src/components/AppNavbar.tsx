import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { Link, NavLink } from "react-router-dom";
import { Context } from "..";
import { RoutePaths, routesByRole } from "../routes/routes";
import "../styles/navbar.scss";
import { LocalStorageItemEnum } from "../types/LocalStorageItemEnum";
import { ThemeEnums } from "../types/Themes";
import { IUserToken } from "../types/UserTypes";
const AppNavbar: FC = observer(() => {
    const { User, Theme } = useContext(Context);
    const routes = routesByRole(User.user);

    const logoutAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        User.setIsAuth(false);
        User.setUser({} as IUserToken);
        localStorage.removeItem(LocalStorageItemEnum.userJson);
        Theme.setTheme(ThemeEnums.main);
    };

    return (
        <Navbar className="navbar">
            <Container>
                <Navbar.Brand href={RoutePaths.MAIN}>
                    Beauty managment
                </Navbar.Brand>
                <Nav className="me-auto">
                    {routes.map(
                        (route) =>
                            route.label && (
                                <Link
                                    key={route.path}
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
                                    to={RoutePaths.MAIN}
                                >
                                    {User.user.name}
                                </Link>
                            </span>{" "}
                            <a
                                onClick={logoutAction}
                                className="cursor-pointer"
                            >
                                Log Out
                            </a>
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
