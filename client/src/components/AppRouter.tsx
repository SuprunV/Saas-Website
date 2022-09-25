import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "..";
import { publicRoutes, RoutePaths, routesByRole } from "../routes/routes";

const AppRouter = observer(({}) => {
    const { User } = useContext(Context);
    return (
        <Routes>
            {routesByRole(User.user.role).map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route
                path="/*"
                element={<Navigate to={RoutePaths.MAIN} replace />}
            />
        </Routes>
    );
});
export default AppRouter;
