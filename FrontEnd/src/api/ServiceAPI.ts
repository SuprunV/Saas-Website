import { $host } from '@/config';
import { IService } from '@/models/IService';
import axios from 'axios';

const nailsService =
    'https://s3.amazonaws.com/salonclouds-uploads/blog/blog_1575589880234492352.png';

const hairCut =
    'https://maneaddicts.com/wp-content/uploads/2022/06/summer-haircut-trends-featured-060622.jpg';

const massage =
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spa-woman-female-enjoying-massage-in-spa-centre-royalty-free-image-492676582-1549988720.jpg';

export class ServiceAPI {
    static async getPublicServices(
        companyAlias: string,
        limit: number,
        page: number,
    ): Promise<IService[]> {
        try {
            const response = await $host.get<IService[]>(
                `/company/alias-${companyAlias}/services`,
            );
            return response.data;
        } catch (e) {
            return [];
        }

    //     // return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    //     //     // create fake services
    //     //     // limit is 5. page is 1. neede to get 1,2,3,4,5
    //     //     // limit is 5. page is 2. neede to get 6,7,8,9,10
    //     //     const count = limit * page;
    //     //     let services: IService[] = [];
    //     //     for (let i = (page - 1) * limit + 1; i <= count; i++) {
    //     //         var demoService = this.demoServices[i % 3];
    //     //         services.push({ ...demoService, id: i });
    //     //     }
    //     //     return services;
    //     // });
     }

     static async postPublicServices(
            companyAlias: string,
            limit: number,
            page: number,
        ): Promise<IService[]> {
            try {
                const response = await $host.delete<IService[]>(
                    `/company/alias-${companyAlias}/services`,
                );
                return response.request;
            } catch (e) {
                return [];
            }
        }
    static getServiceById(id: number): Promise<IService> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            // const serviceIndex = this.demoServices.findIndex(
            //     (c) => c.id === id,
            // );
            // if (serviceIndex >= 0) {
            //     return this.demoServices[serviceIndex];
            // } else
            throw Error("this service doesn't exists!");
        });
    }
    static getServiceByName(name: string): Promise<IService> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            // const companyIndex = this.demoServices.findIndex(
            //     (c) => c.name === name,
            // );
            // if (companyIndex >= 0) {
            //     return this.demoServices[companyIndex];
            // } else
            throw Error("this company doesn't exists!");
        });
    }
}
