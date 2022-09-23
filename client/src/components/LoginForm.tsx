import React, { FC, useEffect, useMemo, useState } from "react";
import FormWrap, { StatusEnum } from "./UI/FormWrap";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useValidateObj, IValidateOptions } from "../hooks/useValidateObj";
import ValidInput from "./UI/ValidInput";
interface ILoginData {
    login: string;
    password: string;
}

const LoginForm = () => {
    const [loginData, setLoginData] = useState<ILoginData>({
        login: "",
        password: "",
    } as ILoginData);
    const { msgTexts, msgTextsCurrent, isValid, isValidCur, validateObj } =
        useValidateObj(loginData, {
            login: { minLength: 3, email: true } as IValidateOptions,
            password: { minLength: 3 } as IValidateOptions,
        } as ILoginData);

    const login = () => {
        validateObj();
        if (isValidCur.current) {
            // make fetching
            alert("fetching...");
        }
    };

    const showError = (error: string) => <p key={error}>{error}</p>;

    return (
        <FormWrap
            msgStatus={StatusEnum.ERROR}
            msgText={""}
            submitAction={login}
        >
            <ValidInput
                onChange={(e) =>
                    setLoginData({ ...loginData, login: e.target.value })
                }
                showError={showError}
                value={msgTexts.login}
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
                value={msgTexts.password}
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
