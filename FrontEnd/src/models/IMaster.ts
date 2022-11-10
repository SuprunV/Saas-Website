import { GenderEnum } from './IUser';

export interface IMaster {
    Id: number;
    name: string;
    surname: string;
    DoB: string;
    gender: GenderEnum;
    userId: number;
}
