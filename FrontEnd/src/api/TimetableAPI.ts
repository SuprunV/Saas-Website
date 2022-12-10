import { $host } from '@/config';
import { $authHost } from '@/config';
import { IService, IServiceMaster } from '@/models/IService';
import { ITimetable } from '@/models/ITimetable';
import axios from 'axios';
import { serialize } from 'v8';
export class TimetableAPI {
    static async addTimetable(companyId: number, timetables: ITimetable[]) {
        const response = await $authHost.put<ITimetable[]>(
            `/company/${companyId}/timetables`,
            timetables,
        );
        return response.data;
    }

    //Return to it
    // static async getTimetableByCompanyId(
    //     companyId: number,
    // ): Promise<ITimetable[]> {
    // const response = await $authHost.get<ITimetable[]>(
    //     `/Service/${companyId}`,
    // );
    // return response.data;
    // }
}
