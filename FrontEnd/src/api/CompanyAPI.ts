import { $authHost, $host } from '@/config';
import { ICompany } from '@/models/ICompany';
import { IMaster } from '@/models/IMaster';
import { IUser, IUserToken } from '@/models/IUser';
import axios from 'axios';

const companyImgUrl= null;

const companyImgUrl2 =
    'https://www.logodesign.net/logo/bar-graph-with-swooshes-arrow-168ld.png';

const starplast =
    'https://starplast.ee/wp-content/uploads/elementor/thumbs/logo_for_png-pm7lafk3amqbwy9sve6x409mmv8egtljt9iak8hc2q.png';

export class CompanyAPI {
    static demoCompanies: ICompany[] = [
        {
            id: 1,
            img: companyImgUrl,
            companyName: 'My First Company',
            companyAlias: 'myfircom',
            address: ''
        },
        {
            id: 2,
            img: companyImgUrl2,
            companyName: 'My Second Company',
            companyAlias: 'myseccom',
            address: ''
        },
        {
            id: 3,
            img: starplast,
            companyName: 'Starplast',
            companyAlias: 'starplast',
            address: ''
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
    static async getCompany(companyId: number): Promise<ICompany> {
        const response = await $authHost.get<ICompany>(`/company/${companyId}`);
        console.log('company', response.data);
        return response.data;
    }

    static async getCompanyWithAlias(companyAlias: string): Promise<ICompany> {
        const response = await $host.get<ICompany>(`/company/alias-${companyAlias}`);
        console.log('company', response.data);
        return response.data;
    }

    static async updateCompany(companyId: number, company: ICompany): Promise<ICompany> {
        var formData = new FormData();
        formData.append('files', company.files);
        try{
            const uploadFile = await $authHost.post<string>(
                `/company/${companyId}/post-photo`,
                formData,);
                company.img = uploadFile.data;
        }
        catch(e){
            company.img = null;
        }

        const response = await $authHost.put<ICompany>(`/company/${companyId}`, company);
        console.log('updated company', response.data);
        return response.data;
    }

    static async getCompanyServicesCount(companyAlias: string): Promise<number> {
        try {
            const response = await $host.get<number>(
                `/company/alias-${companyAlias}/servicesCount`,
            );
            console.log('servicesCount', response.data);
            return response.data;
        } catch (e) {
            return -1;
        }
    }

    static async getCompanyMastersCount(companyAlias: string): Promise<number> {
        try {
            const response = await $host.get<number>(
                `/company/alias-${companyAlias}/mastersCount`,
            );
            console.log('mastersCount', response.data);
            return response.data;
        } catch (e) {
            return -1;
        }
    }

    static async getCompanyClientsCount(companyAlias: string): Promise<number> {
        try {
            const response = await $host.get<number>(
                `/company/alias-${companyAlias}/clientsCount`,
            );
            console.log('clientsCount', response.data);
            return response.data;
        } catch (e) {
            return -1;
        }
    }

    static async getCompanyMastersByAlias(companyAlias: string): Promise<IUser[]> {
        const response = await $host.get<IUser[]>(`/company/alias-${companyAlias}/masters`);
        console.log('company masters', response.data);
        return response.data;
    }

    static async getCompanyMasters(companyId: number): Promise<IUser[]> {
        try {
            const response = await $host.get<IUser[]>(
                `/Company/${companyId}/masters`,
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

    static async getCompanyDoneAppointmentsCount(companyAlias: string): Promise<number> {
        try {
            const response = await $host.get<number>(
                `/appointment/alias-${companyAlias}/companyDoneAppointmentsCount`,
            );
            console.log('companyDoneAppointments', response.data);
            return response.data;
        } catch (e) {
            return -1;
        }
    }
    static async getCompanyIncome(companyAlias: string): Promise<number> {
        try {
            const response = await $host.get<number>(
                `/company/alias-${companyAlias}/companyIncome`,
            );
            console.log('companyIncome', response.data);
            return response.data;
        } catch (e) {
            return -1;
        }
    }

    static async deleteCompanyMasters(Id: number): Promise<IUserToken[]> {
        try {
            const response = await $authHost.delete<IUserToken[]>(
                `/User/${Id}`,
            );
            console.log('masters', response.data);
            return response.data;
        } catch (e) {
            return [];
        }
    }

    static async postCompanyMasters(companyId: number): Promise<IUserToken[]> {
        try {
            const response = await $host.post<IUserToken[]>(
                `/Company/${companyId}/masters`,
            );
            console.log('masters', response.data);
            return response.data;
        } catch (e) {
            return [];
        }
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
                (c) => c.companyAlias === alias,
            );
            if (companyIndex >= 0) {
                return this.demoCompanies[companyIndex];
            } else throw Error("this company doesn't exists!");
        });
    }
}
