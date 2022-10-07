import { IUser, RolesEnum } from '@/models/IUser';
import { LocalStorageItemEnum } from '@/types/LocalStorageItemEnum';

export class UserAPI {
    static demoUsers: IUser[] = [
        {
            id: 1,
            name: 'My first company',
            email: 'admin@myfircom.com',
            role: RolesEnum.COMPANY,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
        },
        {
            id: 2,
            name: 'Eren Yeager',
            email: 'eren-yeager@myfircom.com',
            role: RolesEnum.CLIENT,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
        },
        {
            id: 3,
            img:'https://img.freepik.com/premium-vector/smiling-girl-avatar_102172-32.jpg',
            name: 'Levi ackerman',
            email: 'levi-ackerman@myfircom.com',
            role: RolesEnum.MASTER,
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
            var demoUser:any
            let users: IUser[] = [];
            if(role!=null)
            {
                users = this.demoUsers.filter(
                    (c) => c.role === role,  );       
            }
            else{   
                for (let i = (page - 1) * limit + 1; i <= count; i++) {
                demoUser = this.demoUsers[i % 3];
                users.push({ ...demoUser, id: i });
            }}
            return users;
        });
    }

    static getUserByRole(role: RolesEnum):Promise<IUser> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const userIndex = this.demoUsers.findIndex(
                (c) => c.role === role,
            );
            if (userIndex >= 0) {
                return this.demoUsers[userIndex];
            } else throw Error("this role doesn't exists!");
        });
    }
}

