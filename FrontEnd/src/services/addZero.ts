export const addZero = (num: number): string => {
    if (num <= 9) return `0${num}`;
    else return `${num}`;
};
