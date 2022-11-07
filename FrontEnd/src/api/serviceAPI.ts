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
    static demoServices: IService[] = [
        {
            id: 1,
            img: nailsService,
            name: 'Classic manicure',
            description:
                'You are always welcome to the Spa salon to put the problems of your day aside for a moment and enjoy our excellent care!',
            duration: 30,
            price: 25,
        },
        {
            id: 2,
            img: hairCut,
            name: 'Scissor haircut for men',
            description:
                'We offer a wide selection of services, allowing you to conveniently receive all beauty services in a single place. Our skilled and creative employees love their work and will gladly help you figure out the best solution to suit your wishes and needs. Making your dreams come true is our greatest pleasure.',
            duration: 40,
            price: 27,
        },
        {
            id: 3,
            img: massage,
            name: 'Therapeutic massage',
            description:
                'We specialize in massage services and you can book for them at our salons, hotel room, home or even at your office!',
            duration: 60,
            price: 40,
        },
    ];

    static async getPublicServices(
        companyId: number,
        limit: number,
        page: number,
    ): Promise<IService[]> {
        try {
            const response = await axios.get<IService[]>(
                `${$host}/company/${companyId}/services`,
            );

            console.log(response.data);

            return response.data;
        } catch (e) {
            return [];
        }

        // return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        //     // create fake services
        //     // limit is 5. page is 1. neede to get 1,2,3,4,5
        //     // limit is 5. page is 2. neede to get 6,7,8,9,10
        //     const count = limit * page;
        //     let services: IService[] = [];
        //     for (let i = (page - 1) * limit + 1; i <= count; i++) {
        //         var demoService = this.demoServices[i % 3];
        //         services.push({ ...demoService, id: i });
        //     }
        //     return services;
        // });
    }
    static getServiceById(id: number): Promise<IService> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const serviceIndex = this.demoServices.findIndex(
                (c) => c.id === id,
            );
            if (serviceIndex >= 0) {
                return this.demoServices[serviceIndex];
            } else throw Error("this service doesn't exists!");
        });
    }
    static getServiceByName(name: string): Promise<IService> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            const companyIndex = this.demoServices.findIndex(
                (c) => c.name === name,
            );
            if (companyIndex >= 0) {
                return this.demoServices[companyIndex];
            } else throw Error("this company doesn't exists!");
        });
    }
}
