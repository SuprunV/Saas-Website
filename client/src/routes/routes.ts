import AuthPage from "../pages/AuthPage";
import CalendarPage from "../pages/CalendarPage";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import { RolesEnum } from "../types/SystemRoles";

interface IRoute {
    path: string;
    Component: React.ComponentType;
    label?: string;
}

export enum RoutePaths {
    MAIN = "/",
    AUTH = "/auth",
    HOME = "/home",
    SEARCH_PAGE = "/search",
    CALENDAR = "/calendar",
}

export const routesByRole = (role: RolesEnum | undefined | null): IRoute[] => {
    switch (role) {
        case RolesEnum.client:
            return privateClientRoutes;
        default:
            return publicRoutes;
    }
};

export const publicRoutes: IRoute[] = [
    { path: RoutePaths.MAIN, Component: MainPage, label: "Home" },
    { path: RoutePaths.AUTH, Component: AuthPage, label: "Authorization" },
];

export const privateClientRoutes: IRoute[] = [
    { path: RoutePaths.HOME, Component: HomePage },
    {
        path: RoutePaths.SEARCH_PAGE,
        Component: SearchPage,
        label: "Find your master",
    },
    {
        path: RoutePaths.CALENDAR,
        Component: CalendarPage,
        label: "Your events",
    },
];
