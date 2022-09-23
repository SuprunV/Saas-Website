import AuthPage from "../components/pages/AuthPage";
import HomePage from "../components/pages/HomePage";

interface IRoute {
  path: string;
  Component: React.ComponentType;
  label?: string;
}

export enum RoutePaths {
  HOME = "/home",
  AUTH = "/auth",
}

export const publicRoutes: IRoute[] = [
  { path: RoutePaths.HOME, Component: HomePage, label: "Home" },
  { path: RoutePaths.AUTH, Component: AuthPage, label: "Authorization" },
];
