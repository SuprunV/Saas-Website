export interface IUser {
    id: number;
    name: string;
    email: string;
    role: RolesEnum;
    companyName: string;
    companyPath: string;
}

export enum RolesEnum {
    CLIENT = 'CLIENT',
    COMPANY = 'COMPANY',
    MASTER = 'MASTER',
}
