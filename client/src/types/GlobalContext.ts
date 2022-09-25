import { ThemeStore } from "../store/ThemeStore";
import { UserStore } from "../store/UserStore";

export type IGlobalContext = {
    User: UserStore;
    Theme: ThemeStore;
};
