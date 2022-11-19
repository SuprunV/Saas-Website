export interface IUser {
    id: number;
    img?: string;
    name: string;
    email: string;
    role: RolesEnum;
    companyName: string;
    companyAlias: string;
    companyId: number;
}

export enum RolesEnum {
    CLIENT = 'CLIENT',
    COMPANY = 'COMPANY',
    MASTER = 'MASTER',
}

export enum GenderEnum {
    Female = 'Female',
    Male = 'MaleY',
}

export interface    IRegClientForm {
    companyId: number;
    email: string;
    password: string;
}
