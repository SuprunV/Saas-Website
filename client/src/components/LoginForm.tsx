import React, { FC, useEffect, useMemo, useState } from 'react';
import FormWrap, { StatusEnum } from './UI/FormWrap';
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useValidateObj, IValidateOptions } from '../hooks/useValidateObj';
interface ILoginData {
    login: string;
    password: string;
}

const LoginForm = () => {
    const [loginData, setLoginData] = useState<ILoginData>({ login: "", password: "" } as ILoginData);
    const [status, setStatus] = useState<{ type: StatusEnum; text: string; }>({ type: StatusEnum.ERROR, text: "" });
    const { msgTexts, msgTextsCurrent, isValid, isValidCur, validateObj } = useValidateObj(loginData, {
        login: { minLength: 3, email: true } as IValidateOptions,
        password: { minLength: 3 } as IValidateOptions
    } as ILoginData);
    const login = () => {
        validateObj();
        if (isValidCur.current) {
            setStatus({
                type: StatusEnum.LOADING,
                text: "Please wait to authorize..."
            });
            alert("Is valid, start fetching");
            setTimeout(() => {
                setStatus({
                    type: StatusEnum.ERROR,
                    text: "Server Error"
                });
                setTimeout(() => {
                    setStatus({
                        type: StatusEnum.ERROR,
                        text: ""
                    });
                }, 3000);
            }, 3000);
        }
    };

    return (
        <FormWrap msgStatus={status.type} msgText={status.text} submitAction={login}>
            <div className="form-invalid">
                {msgTexts && "login" in msgTexts && (msgTexts.login as string[]).map(error => <p key={error}>{error}</p>)}
            </div>
            <div className="input-group mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Login</span>
                </div>
                <input
                    onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                    type="text"
                    className="form-control"
                    placeholder="Login"
                    data-isinvalid={(msgTexts && msgTexts.login && true)}
                />
            </div>
            <div className="form-invalid">
                {msgTexts && "password" in msgTexts && (msgTexts.password as string[]).map(error => <p key={error}>{error}</p>)}
            </div>
            <div className="input-group mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Password</span>
                </div>
                <input
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    data-isinvalid={msgTexts && msgTexts.password && true}
                />
            </div>
            <div className="d-flex justify-content-end">
                <Button type='submit' className='btn btn-primary btn-lg btn-to-catalog btn-dark mt-3'>Confirm</Button>
            </div>
        </FormWrap>
    )
}
export default LoginForm;