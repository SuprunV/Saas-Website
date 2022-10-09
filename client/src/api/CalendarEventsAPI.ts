import { ICalendarEvents } from "@/models/ICalendarEvents";


export  class CalendarEventsAPI{
    static demoEvents: ICalendarEvents[] = [
        {
            Id: 1,
            clientName: 'Nadja Tupikova',
            masterName: 'Agnetta Puu',
            date: new Date(2022, 9, 9, 15, 30),
            serviceName: 'Nail extensions'
        },
        {
            Id: 2,
            clientName: 'Henri Kuuper',
            date: new Date(2022, 9, 9, 17, 45),
            masterName: 'Angetta Puu',
            serviceName: 'Hand massage'
        },    {
            Id: 3,
            clientName: 'Kerli Toiker',
            date: new Date(2022, 9, 9, 19, 0),
            masterName: 'Angetta Puu',
            serviceName: 'Gel polish correction'
        },   
]; 

static getEvents(selectedDate: Date): Promise<ICalendarEvents[]> {
    
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        var selectedEvents: ICalendarEvents[] = [];

    selectedEvents = this.demoEvents.filter( e=> 
         e.date.toLocaleDateString() == selectedDate.toLocaleDateString()
    );

        return selectedEvents;
    });
}
static getEventsByMonthAndYear(month: number, year: number): Promise<ICalendarEvents[]> {
    
    return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        var selectedEvents: ICalendarEvents[] = [];

    selectedEvents = this.demoEvents.filter( e=> 
        e.date.getMonth() == month && e.date.getFullYear() == year
    );

        return selectedEvents;
    });
}
};





