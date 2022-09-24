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
    const { User } = useContext(Context);
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
                navigate(RoutePaths.HOME);
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
            case RolesEnum.client:
                setLoginData({ login: "eren@mail.ru", password: "123" });
                break;
            case RolesEnum.company:
                setLoginData({ login: "ervin@mail.ru", password: "123" });
                break;
            case RolesEnum.master:
                setLoginData({ login: "levi@mail.ru", password: "123" });
                break;
        }
    };

    return (
        <FormWrap msgStatus={status} msgText={msg} submitAction={login}>
            Demo versions For:
            <div className="d-flex justify-content-between">
                <Button
                    onClick={() => authLike(RolesEnum.client)}
                    variant="outline-secondary"
                >
                    Client account
                </Button>
                <Button
                    onClick={() => authLike(RolesEnum.company)}
                    variant="outline-dark"
                >
                    Company account
                </Button>
                <Button
                    onClick={() => authLike(RolesEnum.master)}
                    variant="outline-info"
                >
                    Master account
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
