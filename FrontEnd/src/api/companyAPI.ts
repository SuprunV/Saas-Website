import { $host } from '@/config';
import { ICompany } from '@/models/ICompany';
import { IMaster } from '@/models/IMaster';
import { IUser } from '@/models/IUser';
import axios from 'axios';

const companyImgUrl =
    'https://static8.depositphotos.com/1378583/1010/i/600/depositphotos_10108949-stock-photo-blue-flame-logo.jpg';

const companyImgUrl2 =
    'https://www.logodesign.net/logo/bar-graph-with-swooshes-arrow-168ld.png';

const starplast =
    'https://starplast.ee/wp-content/uploads/elementor/thumbs/logo_for_png-pm7lafk3amqbwy9sve6x409mmv8egtljt9iak8hc2q.png';

export class CompanyAPI {
    static demoCompanies: ICompany[] = [
        {
            id: 1,
            img: companyImgUrl,
            name: 'My First Company',
            alias: 'myfircom',
        },
        {
            id: 2,
            img: companyImgUrl2,
            name: 'My Second Company',
            alias: 'myseccom',
        },
        {
            id: 3,
            img: starplast,
            name: 'Starplast',
            alias: 'starplast',
        },
    ];

    static getPublicCompanies(
        limit: number,
        page: number,
    ): Promise<ICompany[]> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            // create fake companies
            // limit is 5. page is 1. neede to get 1,2,3,4,5
            // limit is 5. page is 2. neede to get 6,7,8,9,10
            const count = limit * page;
            let companies: ICompany[] = [];
            for (let i = (page - 1) * limit + 1; i <= count; i++) {
                var demoCompany = this.demoCompanies[i % 3];
                companies.push({ ...demoCompany, id: i });
            }
            return companies;
        });
    }

    static async getCompanyMasters(companyId: number): Promise<IMaster[]> {
        try {
            const response = await axios.get<IMaster[]>(
                `${$host}/company/${companyId}/masters`,
            );
            console.log('masters', response.data);
            return response.data;
        } catch (e) {
            return [];
        }
        // return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        //     // create fake companies
        //     // limit is 5. page is 1. neede to get 1,2,3,4,5
        //     // limit is 5. page is 2. neede to get 6,7,8,9,10
        //     const count = limit * page;
        //     let companies: ICompany[] = [];
        //     for (let i = (page - 1) * limit + 1; i <= count; i++) {
        //         var demoCompany = this.demoCompanies[i % 3];
        //         companies.push({ ...demoCompany, id: i });
        //     }
        //     return companies;
        // });
    }
    static getCompanyById(id: number): Promise<ICompany> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const companyIndex = this.demoCompanies.findIndex(
                (c) => c.id === id,
            );
            if (companyIndex >= 0) {
                return this.demoCompanies[companyIndex];
            } else throw Error("this company doesn't exists!");
        });
    }
    static getCompanyByAlias(alias: string): Promise<ICompany> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const companyIndex = this.demoCompanies.findIndex(
                (c) => c.alias === alias,
            );
            if (companyIndex >= 0) {
                return this.demoCompanies[companyIndex];
            } else throw Error("this company doesn't exists!");
        });
    }
}
