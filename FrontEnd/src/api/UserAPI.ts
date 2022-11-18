import { $host } from '@/config';
import { IUser, RolesEnum } from '@/models/IUser';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';
import axios from 'axios';
import { stringify } from 'querystring';

const companyImgUrl =
    'https://static8.depositphotos.com/1378583/1010/i/600/depositphotos_10108949-stock-photo-blue-flame-logo.jpg';
const clientImgUrl =
    'https://static.javatpoint.com/difference/images/client-vs-server.png';
const masterImgUrl =
    'https://thumbs.dreamstime.com/b/red-color-peel-sticker-label-word-master-gray-background-249615333.jpg';

interface ITokenResponse {
    token: string;
}
export class UserAPI {
    static demoUsers: IUser[] = [
        {
            id: 1,
            name: 'My first company',
            email: 'admin@myfircom.com',
            role: RolesEnum.COMPANY,
            img: companyImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
            companyId: 1,
        },
        {
            id: 2,
            name: 'Eren Yeager',
            email: 'eren-yeager@myfircom.com',
            role: RolesEnum.CLIENT,
            img: clientImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
            companyId: 1,
        },
        {
            id: 3,
            name: 'Levi ackerman',
            email: 'levi-ackerman@myfircom.com',
            role: RolesEnum.MASTER,
            img: masterImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
            companyId: 1,
        },
    ];

    static async login(email: string, password: string) {
        const response = await axios.post<ITokenResponse>(
            `${$host}/user/login`,
            { login: email, password },
        );

        localStorage.setItem(LocalStorageItemEnum.token, response.data.token);
        return response.data;
    }

    static async logout(userData: IUser) {
        // Here will be made request to remove token for this user (userData);
        localStorage.removeItem(LocalStorageItemEnum.userJson);
    }

    static getPublicUsers(
        limit: number,
        page: number,
        role?: RolesEnum,
    ): Promise<IUser[]> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            // create fake users
            // limit is 5. page is 1. neede to get 1,2,3,4,5
            // limit is 5. page is 2. neede to get 6,7,8,9,10
            const count = limit * page;
            var demoUser: any;
            let users: IUser[] = [];
            if (role != null) {
                users = this.demoUsers.filter((c) => c.role === role);
            } else {
                for (let i = (page - 1) * limit + 1; i <= count; i++) {
                    demoUser = this.demoUsers[i % 3];
                    users.push({ ...demoUser, id: i });
                }
            }
            return users;
        });
    }

    static getUserByRole(role: RolesEnum): Promise<IUser> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const userIndex = this.demoUsers.findIndex((c) => c.role === role);
            if (userIndex >= 0) {
                return this.demoUsers[userIndex];
            } else throw Error("this role doesn't exists!");
        });
    }
}
