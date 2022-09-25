import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppNavbar from "./components/AppNavbar";
import AppRouter from "./components/AppRouter";
import { LocalStorageItemEnum } from "./types/LocalStorageItemEnum";
import { ThemeEnums } from "./types/Themes";

const App = observer(() => {
    const { User, Theme } = useContext(Context);
    useEffect(() => {
        const userJson = localStorage.getItem(LocalStorageItemEnum.userJson);
        if (userJson) {
            const user = JSON.parse(userJson);
            if (user) {
                User.setUser(user);
                User.setIsAuth(true);
                console.log(user);
                Theme.setTheme((user.role + "-them") as ThemeEnums);
            }
        }
    }, []);
    return (
        <BrowserRouter>
            <div className={Theme.theme}>
                <AppNavbar />
                <AppRouter />
            </div>
        </BrowserRouter>
    );
});
export default App;
