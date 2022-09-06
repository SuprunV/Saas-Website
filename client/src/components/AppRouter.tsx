import React, { FC, useCallback } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, RouteNames } from '../routes/routes';
interface AppRouterProps {

}

const AppRouter: FC<AppRouterProps> = ({ }) => {
    const role = "";


    const getPublicRoutes = (): React.ReactElement => {
        return (
            <Routes>
                {publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
                <Route path="/*" element={<Navigate to={RouteNames.HOME} replace />} />
            </Routes>
        );
    }

    const getRoutes = useCallback(() => {
        switch (role) {
            default: return getPublicRoutes();
        }
    }, [role]);
    return (
        <>
            {getRoutes()}
        </>
    )
}
export default AppRouter;