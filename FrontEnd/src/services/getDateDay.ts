const WEEKDAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export const getDateDay = (date: string | Date): string => {
    if (typeof date == 'object') {
        return WEEKDAYS[date.getDay() - 1];
    } else if (typeof date == 'string') {
        return WEEKDAYS[new Date(date).getDay() - 1];
    }

    return '-1';
};
