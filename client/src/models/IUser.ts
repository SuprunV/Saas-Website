export interface IUser {
    name: string;
    email: string;
    role: RolesEnum;
}

export enum RolesEnum {
    CLIENT = 'CLIENT',
    COMPANY = 'COMPANY',
    MASTER = 'MASTER',
}
