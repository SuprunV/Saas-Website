import { $host } from '@/config';
import { IAppointment } from '@/models/IAppointment';
import axios from 'axios';

export class AppointmentAPI {
    static demoEvents: IAppointment[] = [
        {
            Id: 1,
            clientName: 'Nadja Tupikova',
            masterName: 'Agnetta Puu',
            date: new Date(2022, 9, 9, 15, 30),
            serviceName: 'Nail extensions',
        },
        {
            Id: 2,
            clientName: 'Henri Kuuper',
            date: new Date(2022, 9, 9, 17, 45),
            masterName: 'Angetta Puu',
            serviceName: 'Hand massage',
        },
        {
            Id: 3,
            clientName: 'Kerli Toiker',
            date: new Date(2022, 9, 9, 19, 0),
            masterName: 'Angetta Puu',
            serviceName: 'Gel polish correction',
        },
        {
            Id: 4,
            clientName: 'Liina Illipe',
            date: new Date(2022, 9, 15, 13, 20),
            masterName: 'Angetta Puu',
            serviceName: 'Gel polish correction',
        },
        {
            Id: 5,
            clientName: 'Sofia Senkiv',
            date: new Date(2022, 9, 21, 16, 0),
            masterName: 'Angetta Puu',
            serviceName: 'Hand massage',
        },
        {
            Id: 5,
            clientName: 'Leonid Demidov',
            date: new Date(2022, 9, 21, 17, 30),
            masterName: 'Angetta Puu',
            serviceName: 'Gel polish correction',
        },
    ];

    static getEvents(selectedDate: Date): Promise<IAppointment[]> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            var selectedEvents: IAppointment[] = [];

            selectedEvents = this.demoEvents.filter(
                (e) =>
                    e.date.toLocaleDateString() ==
                    selectedDate.toLocaleDateString(),
            );

            return selectedEvents;
        });
    }

    static async getFreeEvents(
        selectedDate: Date,
        companyId: number,
    ): Promise<IAppointment[]> {
        try {
            const response = await axios.get<IAppointment[]>(`${$host}/appointment/`);
            return [];
        } catch (e) {
            return [];
        }
    }

    static getEventsByMonthAndYear(
        month: number,
        year: number,
    ): Promise<IAppointment[]> {
        return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            var selectedEvents: IAppointment[] = [];

            selectedEvents = this.demoEvents.filter(
                (e) =>
                    e.date.getMonth() == month && e.date.getFullYear() == year,
            );

            return selectedEvents;
        });
    }
}
