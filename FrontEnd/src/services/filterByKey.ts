export function uniqByKeepFirst<T>(a: T[], key: (item: T) => any) {
    let seen = new Set();
    return a.filter((item) => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}
