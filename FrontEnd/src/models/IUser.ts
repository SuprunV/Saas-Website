import dayjs from "ant-design-vue/lib/date-picker/dayjs";
import { ICompany } from "./ICompany";

export interface IUserToken {
    id: number;
    img?: any;
    name: string;
    email: string;
    role: RolesEnum;
    companyName: string;
    companyAlias: string;
    companyId: number;
}


export interface IUser{ 
    files?:any;
    id: number;
    login: string;
    password?: string;
    name: string;
    surname: string;
    doB: any;
    gender: GenderEnum;
    role: RolesEnum;
    img?: any;
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

// export interface IRegMasterForm {
//     companyId: number;
//     login: string;
//     password: string;
// }
