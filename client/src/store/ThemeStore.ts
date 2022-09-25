import { makeAutoObservable } from "mobx";
import { ThemeEnums } from "../types/Themes";

export class ThemeStore {
    private _theme: ThemeEnums;
    constructor() {
        this._theme = ThemeEnums.main;
        makeAutoObservable(this);
    }

    // _theme
    setTheme(theme: ThemeEnums) {
        this._theme = theme;
    }
    get theme(): ThemeEnums {
        return this._theme;
    }
}
