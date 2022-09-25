import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppRouter from "./components/AppRouter";

const App = () => {
    
    return (
        <BrowserRouter>
            <AppNavbar />
            <AppRouter />
        </BrowserRouter>
    );
};
export default App;
