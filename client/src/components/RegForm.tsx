import React, { FC, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { IValidateOptions, useValidateObj } from "../hooks/useValidateObj";
import { RolesEnum } from "../types/systemRoles";
import FormWrap, { StatusEnum } from "./UI/FormWrap";
import ValidInput from "./UI/ValidInput";

interface IRegData {
    login: string;
    password: string;
    role: RolesEnum;
}

const RegForm = () => {
    const [regData, setRegData] = useState<IRegData>({
        login: "",
        password: "",
        role: RolesEnum.client,
    } as IRegData);

    const { msgTexts, validateObj, isValidCur } = useValidateObj(regData, {
        login: { email: true, minLength: 3 } as IValidateOptions,
        password: { minLength: 3 } as IValidateOptions,
    });

    const registrate = () => {
        validateObj();
        if (isValidCur.current) {
            alert(JSON.stringify(regData));
        }
    };

    const inputRoleOption = (role: RolesEnum) => {
        setRegData({ ...regData, role: role });
    };
    const showError = (error: string) => <p key={error}>{error}</p>;

    return (
        <FormWrap
            msgStatus={StatusEnum.ERROR}
            msgText=""
            submitAction={registrate}
        >
            <ValidInput
                onChange={(e) =>
                    setRegData({ ...regData, login: e.target.value })
                }
                placeholder={"Input your login..."}
                showError={showError}
                title="Login"
                value={msgTexts.login}
            />
            <ValidInput
                onChange={(e) =>
                    setRegData({ ...regData, password: e.target.value })
                }
                placeholder={"Input your password..."}
                showError={showError}
                title="Password"
                value={msgTexts.password}
                type="password"
            />
            <div className="mt-3">
                <h6>Choose your role:</h6>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        onChange={(e) => inputRoleOption(RolesEnum.client)}
                        value={RolesEnum.client}
                        checked={regData.role === RolesEnum.client}
                    />
                    <label className="form-check-label">Client</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        onChange={(e) => inputRoleOption(RolesEnum.company)}
                        value={RolesEnum.company}
                        checked={regData.role === RolesEnum.company}
                    />
                    <label className="form-check-label">Company provider</label>
                </div>
                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        onChange={(e) => inputRoleOption(RolesEnum.master)}
                        value={RolesEnum.master}
                        checked={regData.role === RolesEnum.master}
                    />
                    <label className="form-check-label">Service provider</label>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Button type="submit" variant="dark" size="lg" className="mt-3">
                    Confirm
                </Button>
            </div>
        </FormWrap>
    );
};
export default RegForm;
