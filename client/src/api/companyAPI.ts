import { ICompany } from '@/models/ICompany';

const companyImgUrl =
    'https://static8.depositphotos.com/1378583/1010/i/600/depositphotos_10108949-stock-photo-blue-flame-logo.jpg';

export class companyAPI {
    static demoCompanies: ICompany[] = [
        {
            id: 1,
            img: companyImgUrl,
            name: 'My First Company',
            alias: '/myfircom',
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
                companies.push({ ...this.demoCompanies[0], id: i });
            }
            return companies;
        });
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
