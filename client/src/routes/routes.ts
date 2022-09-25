import AuthPage from "../pages/AuthPage";
import CalendarPage from "../pages/CalendarPage";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import { RolesEnum } from "../types/SystemRoles";
import { IUserToken } from "../types/UserTypes";

interface IRoute {
    path: string;
    Component: React.ComponentType;
    label?: string;
    isMain?: boolean;
}

export enum RoutePaths {
    MAIN = "/",
    AUTH = "/auth",
    SEARCH_PAGE = "/search",
    CALENDAR = "/calendar",
}

export const routesByRole = (user: IUserToken | undefined | null): IRoute[] => {
    var addBaseUrl = (route: IRoute) => {
        return {
            ...route,
            path: `/${user?.company}${route.path.length > 1 ? route.path : ""}`,
        };
    };
    switch (user?.role) {
        case RolesEnum.company:
            return privateCompanyRoutes.map(addBaseUrl);
        default:
            return publicRoutes;
    }
};

export const publicRoutes: IRoute[] = [
    { path: RoutePaths.MAIN, Component: MainPage, label: "Home" },
    { path: RoutePaths.AUTH, Component: AuthPage, label: "Authorization" },
];

export const privateCompanyRoutes: IRoute[] = [
    { path: RoutePaths.MAIN, Component: HomePage, label: "Home" },
];
