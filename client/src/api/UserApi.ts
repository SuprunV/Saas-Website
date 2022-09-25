import { useContext } from "react";
import { Context } from "..";
import { UserStore } from "../store/UserStore";
import { RolesEnum } from "../types/SystemRoles";
import { IUserToken } from "../types/UserTypes";

export default class UserApi {
    static demoUsers: IUserToken[] = [
        {
            id: 1,
            name: "Erwin Smith",
            email: "ervin@mail.ru",
            role: RolesEnum.company,
        },
        {
            id: 2,
            name: "Eren Yeager",
            email: "eren@mail.ru",
            role: RolesEnum.client,
        },
        {
            id: 3,
            name: "Levi Ackerman",
            email: "levi@mail.ru",
            role: RolesEnum.master,
        },
    ];

    static async login(email: string, password: string): Promise<IUserToken> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            let userIndex = this.demoUsers.findIndex((u) => u.email == email);
            console.log(email, userIndex);
            if (userIndex >= 0) {
                const user = this.demoUsers[userIndex];
                localStorage.setItem("userJson", JSON.stringify(user));
                console.log("return user");
                return user;
            } else throw new Error("Incorrect demo email");
        });
    }
}
