export const makeEnum = (enumObject: any): any[] => {
    var all = [];
    for (var key in enumObject) {
        all.push(enumObject[key]);
    }
    return all;
};
