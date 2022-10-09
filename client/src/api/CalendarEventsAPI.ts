import { ICalendarEvents } from "@/models/ICalendarEvents";


export  class CalendarEventsAPI{
    static demoEvents: ICalendarEvents[] = [
        {
            Id: 1,
            clientName: 'Nadja Tupikova',
            date: new Date(2022, 9, 9, 15, 30),
        },
        {
            Id: 2,
            clientName: 'Henri Kuuper',
            date: new Date(2022, 9, 9, 17, 45),
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
};





