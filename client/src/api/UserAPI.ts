import { IUser, RolesEnum } from '@/models/IUser';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';

export default class UserAPI {
    static demoUsers: IUser[] = [
        {
            id: 1,
            name: 'My first company',
            email: 'admin@myFirCom.com',
            role: RolesEnum.COMPANY,
            companyName: 'My First Company',
            companyAlias: '/myfircom',
        },
        {
            id: 2,
            name: 'Company Exapmle',
            email: 'eren-yeager@myFirCom.com',
            role: RolesEnum.CLIENT,
            companyName: 'My First Company',
            companyAlias: '/myfircom',
        },
        {
            id: 3,
            name: 'Company Exapmle',
            email: 'levi-ackerman@myFirCom.com',
            role: RolesEnum.MASTER,
            companyName: 'My First Company',
            companyAlias: '/myfircom',
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
}
