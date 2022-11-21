import dayjs from "ant-design-vue/lib/date-picker/dayjs";
import { ICompany } from "./ICompany";

export interface IUserToken {
    id: number;
    img?: string;
    name: string;
    email: string;
    role: RolesEnum;
    companyName: string;
    companyAlias: string;
    companyId: number;
}


export interface IUser{ 
    id: number;
    login?: string;
    password?: string;
    name?: string;
    surname?: string;
    doB: any;
    gender: GenderEnum;
    role: RolesEnum;
    img?: string;
    companyId?: number;
    company?: ICompany;
}

export enum RolesEnum {
    CLIENT = 'CLIENT',
    COMPANY = 'ADMIN',
    MASTER = 'MASTER',
}

export enum GenderEnum {
    Female = 'Female',
    Male = 'Male',
}

export interface IRegClientForm {
    companyId: number;
    login: string;
    password: string;
}
