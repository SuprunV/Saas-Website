export interface ITimetable {
    id: number;
    companyId: number;
    startTime: string;
    endTime: string;
    weekday: Weekday;
}

export enum Weekday {
    Mon = 'Mon',
    Tue = 'Tue',
    Wed = 'Wed',
    Thu = 'Thu',
    Fri = 'Fri',
    Sat = 'Sat',
    Sun = 'Sun',
}
