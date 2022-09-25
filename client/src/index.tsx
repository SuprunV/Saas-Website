import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/themes.scss";
import { IGlobalContext } from "./types/GlobalContext";
import { createContext } from "react";
import { UserStore } from "./store/UserStore";
import App from "./App";
import { ThemeStore } from "./store/ThemeStore";

export const Context = createContext<IGlobalContext>({} as IGlobalContext);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Context.Provider
        value={{
            User: new UserStore(),
            Theme: new ThemeStore(),
        }}
    >
        <App />
    </Context.Provider>
);
