import { $host } from '@/config';
import { IAppointment } from '@/models/IAppointment';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class AppointmentAPI {
    static async getEvents(selectedDate: Date): Promise<IAppointment[]> {
        try {
            const date = selectedDate.toISOString().split('T')[0];
            const response = await $host.get<IAppointment[]>(
                `/appointment/${date}/events`,
            );
            console.log('appointments', response.data);
            return response.data;
        } catch (e) {
            return [];
        }

        /*         return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            var selectedEvents: IAppointment[] = [];

            selectedEvents = this.demoEvents.filter(
                (e) =>
                    e.date.toLocaleDateString() ==
                    selectedDate.toLocaleDateString(),
            );

            return selectedEvents;
        }); */
    }

    static async getFreeEvents(
        selectedDate: Date,
        companyId: number,
        serviceId: number,
    ): Promise<IAppointment[]> {
        try {
            const date = selectedDate.toISOString().split('T')[0];
            const response = await $host.get<IAppointment[]>(
                `/company/${companyId}/free-appointments?date=${date}&serviceId=${serviceId}`,
            );
            return response.data;
        } catch (e) {
            return [];
        }
    }
    static async addEvent(appointment: IAppointment) {
        console.log('new appointment', appointment);
        const response = await $host.post<IAppointment[]>(
            `/appointment`,
            appointment,
        );

        console.log('response new appointmnet', response);
        return response.data;
    }

    static async getEventsByMonthAndYear(
        month: number,
        year: number,
    ): Promise<IAppointment[]> {
        try {
            const response = await $host.get<IAppointment[]>(
                `/appointment/eventsByMonthAndYear?month=${month.toString()}&year=${year.toString()}`,
            );

            return response.data;
        } catch (e) {
            return [];
        }

        /*   return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
            var selectedEvents: IAppointment[] = [];

            selectedEvents = this.demoEvents.filter(
                (e) =>
                    new Date(e.date).getMonth() == month &&
                    new Date(e.date).getFullYear() == year,
            );

            return selectedEvents;
        });  */
    }
}
