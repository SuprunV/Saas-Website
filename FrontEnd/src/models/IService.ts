export interface IService {
    id: number;
    img?: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    companyId?: number;
}

export interface IServiceMaster {
    Id: number;
    masterId: number | undefined;
    serviceId: number;
}
