import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { IGlobalContext } from "./types/GlobalContext";
import { createContext } from "react";
import { UserStore } from "./store/UserStore";
import App from "./App";

export const Context = createContext<IGlobalContext>({} as IGlobalContext);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Context.Provider
        value={{
            User: new UserStore(),
        }}
    >
        <App />
    </Context.Provider>
);
