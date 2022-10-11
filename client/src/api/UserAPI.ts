import { IUser, RolesEnum } from '@/models/IUser';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';

const companyImgUrl =
    'https://static8.depositphotos.com/1378583/1010/i/600/depositphotos_10108949-stock-photo-blue-flame-logo.jpg';
const clientImgUrl = 
    'https://static.javatpoint.com/difference/images/client-vs-server.png';
const masterImgUrl = 
    'https://thumbs.dreamstime.com/b/red-color-peel-sticker-label-word-master-gray-background-249615333.jpg';
    export default class UserAPI {
    static demoUsers: IUser[] = [
        {
            id: 1,
            name: 'My first company',
            email: 'admin@myfircom.com',
            role: RolesEnum.COMPANY,
            img: companyImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
        },
        {
            id: 2,
            name: 'Eren Yeager',
            email: 'eren-yeager@myfircom.com',
            role: RolesEnum.CLIENT,
            img: clientImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
        },
        {
            id: 3,
            name: 'Levi ackerman',
            email: 'levi-ackerman@myfircom.com',
            role: RolesEnum.MASTER,
            img: masterImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
        },
    ];

    static async login(email: string, password: string): Promise<IUser> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            let userIndex = this.demoUsers.findIndex((u) => u.email == email);
            if (userIndex >= 0) {
                const user = this.demoUsers[userIndex];
                localStorage.setItem(
                    LocalStorageItemEnum.userJson,
                    JSON.stringify(user),
                );
                return user;
            } else throw new Error('Incorrect demo email');
        });
    }

    static async logout(userData: IUser) {
        // Here will be made request to remove token for this user (userData);
        localStorage.removeItem(LocalStorageItemEnum.userJson);
    }
    static getUserById(id: number): Promise<IUser> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const userIndex = this.demoUsers.findIndex(
                (u) => u.id === id,
            );
            if (userIndex >= 0) {
                return this.demoUsers[userIndex];
            } else throw Error("this company doesn't exists!");
        });
    }
}
