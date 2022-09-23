import React, { FC, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, RoutePaths } from "../routes/routes";
interface AppRouterProps {}

const AppRouter: FC<AppRouterProps> = ({}) => {
  const role = "";

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="/*" element={<Navigate to={RoutePaths.HOME} replace />} />
    </Routes>
  );
};
export default AppRouter;
