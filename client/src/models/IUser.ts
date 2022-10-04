export interface IUser {
    id: number;
    name: string;
    email: string;
    role: RolesEnum;
    companyName: string;
    companyAlias: string;
}

export enum RolesEnum {
    CLIENT = 'CLIENT',
    COMPANY = 'COMPANY',
    MASTER = 'MASTER',
}
