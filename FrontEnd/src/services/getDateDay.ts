const WEEKDAYS = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getDateDay = (date: string | Date): string => {
    if (typeof date == 'object') {
        return WEEKDAYS[date.getDay()];
    } else if (typeof date == 'string') {
        return WEEKDAYS[new Date(date).getDay()];
    }

    return '-1';
};
