import { IMaster } from './IMaster';

export interface IAppointment {
    Id: number;
    masterId: number;
    date: string;
    serviceId: number;
    clientId: number;
    clientName?: string;
    clientEmail?: string;
    master?: IMaster;
    serviceName?: string;
}
