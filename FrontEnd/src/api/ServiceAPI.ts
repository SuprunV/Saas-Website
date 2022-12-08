import { $host } from '@/config';
import { $authHost } from '@/config';
import { IService, IServiceMaster } from '@/models/IService';
import axios from 'axios';
import { serialize } from 'v8';
export interface IServiceMasters {
    serviceId: number;
    masters: { masterId: number | undefined }[];
}

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

     static async addService(service: IService) {
        var formData = new FormData();

        formData.append('files', service.files);

        try {
            const uploadFile = await $authHost.post<string>(
                `/Service/${service.id}/post-photo`,
                formData,
            );
            service.img = uploadFile.data;
        } catch(e) {
            service.img = null;
        }



        console.log('new service', service);
        const response = await $authHost.post<IService[]>(`/Service`, service);
        console.log('response new service', response);
        return response.data;
    }


        
        static async updateCompanyServices(id: number, item: IService): Promise<IService> {
            var formData = new FormData();

            formData.append('files', item.files);

            try {
                const uploadFile = await $authHost.post<string>(
                    `/Service/${id}/post-photo`,
                    formData,
                );
                item.img = uploadFile.data;
            } catch(e) {
                item.img = null;
            }



                const response = await $authHost.put<IService>(
                    `/Service/${id}`, item,
                );
               // console.log('masters', response.data);
                return response.data;
        }
       

    static async  getServiceById(serviceId: number): Promise<IService> {
        const response = await $authHost.get<IService>(
            `/Service/${serviceId}`,
        );
        return response.data;
    }

    static async getServiceMasters(serviceId: number) {
        const response = await $authHost.get(`/service/${serviceId}/masters`);
        return response.data;
    }
  
    static async addServiceMasters(
        serviceId: number,
        serviceMasters: IServiceMaster[],
    ) {
        const response = await $authHost.post(
            `/service/${serviceId}/update-masters`,
            serviceMasters,)
        }

    static async deleteCompanyService(id: number): Promise<IService> {
        const response = await $authHost.delete<IService>(`/Service/${id}`);
        // console.log('services', response.data);
        return response.data;
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
