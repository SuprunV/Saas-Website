import React, { FC, useEffect, useContext, useMemo, useState } from "react";
import FormWrap, { StatusEnum } from "./UI/FormWrap";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useValidateObj, IValidateOptions } from "../hooks/useValidateObj";
import ValidInput from "./UI/ValidInput";
import { RolesEnum } from "../types/SystemRoles";
import { IUserToken } from "../types/UserTypes";
import UserApi from "../api/UserApi";
import { Context } from "..";
import { useFetching } from "../hooks/useFetching";
import { error } from "console";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../routes/routes";
import { ThemeEnums } from "../types/Themes";
interface ILoginData {
    login: string;
    password: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<ILoginData>({
        login: "",
        password: "",
    } as ILoginData);
    const { User, Theme } = useContext(Context);
    const { msgTexts, msgTextsCurrent, isValid, isValidCur, validateObj } =
        useValidateObj(loginData, {
            login: { minLength: 3, email: true } as IValidateOptions,
            password: { minLength: 3 } as IValidateOptions,
        } as ILoginData);

    const {
        fetching: loginAsync,
        status,
        msg,
    } = useFetching(async () => {
        const user = await UserApi.login(loginData.login, loginData.password);
        if (user) {
            setTimeout(() => {
                User.setIsAuth(true);
                User.setUser(user);
                navigate(`${RoutePaths.MAIN}${User.user.company}`);
                Theme.setTheme(ThemeEnums.company);
            }, 2000);
        }
    });

    const login = () => {
        validateObj();
        if (isValidCur.current) {
            loginAsync();
        }
    };

    const showError = (error: string) => <p key={error}>{error}</p>;

    const authLike = (role: RolesEnum) => {
        switch (role) {
            case RolesEnum.company:
                setLoginData({
                    login: "company-example@gmail.com",
                    password: "123",
                });
                break;
        }
    };

    return (
        <FormWrap msgStatus={status} msgText={msg} submitAction={login}>
            Demo version:
            <div className="d-flex justify-content-between">
                <Button
                    onClick={() => authLike(RolesEnum.company)}
                    variant="outline-secondary"
                >
                    Company account
                </Button>
            </div>
            <ValidInput
                onChange={(e) =>
                    setLoginData({ ...loginData, login: e.target.value })
                }
                showError={showError}
                value={loginData.login}
                errors={msgTexts.login}
                placeholder={"Input your login..."}
                title={"Login"}
            />
            <ValidInput
                onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                }
                showError={showError}
                title={"Password"}
                placeholder={"Input your password..."}
                type={"password"}
                errors={msgTexts.password}
                value={loginData.password}
            />
            <div className="d-flex justify-content-end">
                <Button type="submit" variant="dark" size="lg" className="mt-3">
                    Confirm
                </Button>
            </div>
        </FormWrap>
    );
};
export default LoginForm;
