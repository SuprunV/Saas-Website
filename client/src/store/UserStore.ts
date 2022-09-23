import { makeAutoObservable } from "mobx";
import { IUserToken } from "../types/UserTypes";

export class UserStore {
    private _user: IUserToken;
    private _isAuth: boolean;
    constructor() {
        this._isAuth = false;
        this._user = {} as IUserToken;
        makeAutoObservable(this);
    }

    // _isAuth
    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth;
    }
    get isAuth(): boolean {
        return this._isAuth;
    }
    // _user
    setUser(user: IUserToken) {
        this._user = user;
    }
    get user(): IUserToken {
        return this._user;
    }
}
