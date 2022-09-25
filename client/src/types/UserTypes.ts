import { RolesEnum } from "./SystemRoles";

export interface IUserToken {
    id: number;
    role: RolesEnum;
    name: string;
    email: string;
    company: string;
}
