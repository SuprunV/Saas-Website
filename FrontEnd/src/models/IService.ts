export interface IService{
    id: number;
    img?:string;
    name: string;
    description: string;
    duration: number;
    price: number;
    companyId?: number;
}
    