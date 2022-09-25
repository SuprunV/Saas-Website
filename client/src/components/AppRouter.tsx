import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "..";
import { publicRoutes, RoutePaths, routesByRole } from "../routes/routes";

const AppRouter = observer(({}) => {
    const { User } = useContext(Context);
    const routes = routesByRole(User.user);
    const navigateTo = User.user.company ? `/${User.user.company}` : "/";
    console.log("routes", routes, navigateTo);
    return (
        <Routes>
            {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="/*" element={<Navigate to={navigateTo} replace />} />
        </Routes>
    );
});
export default AppRouter;
