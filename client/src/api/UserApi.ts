import { useContext } from "react";
import { Context } from "..";
import { UserStore } from "../store/UserStore";
import { LocalStorageItemEnum } from "../types/LocalStorageItemEnum";
import { RolesEnum } from "../types/SystemRoles";
import { IUserToken } from "../types/UserTypes";

export default class UserApi {
    static demoUsers: IUserToken[] = [
        {
            id: 1,
            name: "Company Exapmle",
            email: "company-example@gmail.com",
            role: RolesEnum.company,
            company: "company-example",
        },
        {
            id: 2,
            name: "Eren Yeager",
            email: "eren@company-example.com",
            role: RolesEnum.client,
            company: "company-example",
        },
        {
            id: 3,
            name: "Levi Ackerman",
            email: "levi@company-example.com",
            role: RolesEnum.master,
            company: "company-example",
        },
    ];

    static async login(email: string, password: string): Promise<IUserToken> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            let userIndex = this.demoUsers.findIndex((u) => u.email == email);
            if (userIndex >= 0) {
                const user = this.demoUsers[userIndex];
                localStorage.setItem(
                    LocalStorageItemEnum.userJson,
                    JSON.stringify(user)
                );
                return user;
            } else throw new Error("Incorrect demo email");
        });
    }
}
