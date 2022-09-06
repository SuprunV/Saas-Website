import AuthPage from "../components/pages/AuthPage";
import HomePage from "../components/pages/HomePage";


interface IRoute {
    path: string;
    element: React.ComponentType;
    label?: string;
}


export enum RouteNames {
    HOME = "/home",
    AUTH = "/auth"
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.HOME, element: HomePage, label: "Home" },
    { path: RouteNames.AUTH, element: AuthPage, label: "Authorization" },
]


