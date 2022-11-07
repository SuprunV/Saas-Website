import { IMaster } from './IMaster';

export interface IAppointment {
    Id: number;
    clientName: string;
    master: IMaster;
    date: Date;
    serviceId: number;
    serviceName: string;
    clientId: number;
}
