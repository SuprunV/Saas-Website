import React, { FC, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { IValidateOptions, useValidateObj } from '../hooks/useValidateObj';
import { RolesEnum } from '../types/systemRoles';
import FormWrap, { StatusEnum } from './UI/FormWrap';

interface IRegData {
    login: string;
    password: string;
    role: RolesEnum;
}

const RegForm = () => {
    const [regData, setRegData] = useState<IRegData>({ login: "", password: "", role: RolesEnum.client } as IRegData);
    const [status, setStatus] = useState<{ type: StatusEnum; text: string; }>({ type: StatusEnum.ERROR, text: "" });
    const { msgTexts, validateObj, isValidCur } = useValidateObj(regData, {
        login: { email: true, minLength: 3 } as IValidateOptions,
        password: { minLength: 3 } as IValidateOptions
    })
    const registrate = () => {
        validateObj();
        if (isValidCur.current) {
            alert(JSON.stringify(regData));
        }
    };


    const inputRoleOption = (role: RolesEnum) => {
        setRegData({ ...regData, role: role })
    }
    return (
        <FormWrap msgStatus={StatusEnum.ERROR} msgText="" submitAction={registrate}>
            <div className="form-invalid">
                {msgTexts && "login" in msgTexts && (msgTexts.login as string[]).map(error => <p key={error}>{error}</p>)}
            </div>
            <div className="input-group mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="">Login</span>
                </div>
                <input
                    onChange={(e) => setRegData({ ...regData, login: e.target.value })}
                    type="text"
                    className="form-control"
                    placeholder="Login"
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
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    type="text"
                    className="form-control"
                    placeholder="Password" />
            </div>
            <div className="mt-3">
                <h6>Choose your role:</h6>
                <div className="form-check">
                    <input type="radio" className="form-check-input" onChange={(e) => inputRoleOption(RolesEnum.client)} value={RolesEnum.client} checked={regData.role === RolesEnum.client} />
                    <label className='form-check-label'>Client</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" onChange={(e) => inputRoleOption(RolesEnum.companyProvider)} value={RolesEnum.companyProvider} checked={regData.role === RolesEnum.companyProvider} />
                    <label className='form-check-label'>Company provider</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" onChange={(e) => inputRoleOption(RolesEnum.serviceProvider)} value={RolesEnum.serviceProvider} checked={regData.role === RolesEnum.serviceProvider} />
                    <label className='form-check-label'>Service provider</label>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Button type='submit' className='btn btn-primary btn-lg btn-to-catalog btn-dark mt-3'>Confirm</Button>
            </div>
        </FormWrap >
    )
}
export default RegForm;