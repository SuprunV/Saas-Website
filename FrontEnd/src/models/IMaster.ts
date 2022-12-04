import { GenderEnum } from './IUser';

export interface IMaster {
    id: number;
    name: string;
    surname: string;
    DoB: string;
    gender: GenderEnum;
    userId: number;
    companyId?: number;
    login?: string;
    password?: string;
}
