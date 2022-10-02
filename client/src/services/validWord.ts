export const validWord = (word: string, maxLen: number): string => {
    var parts = word.split(' ');
    console.log(parts);
    parts = parts.map((p) => p.replace(/[^a-z0-9]/gi, '').toLowerCase());
    console.log(parts);

    if (parts.length == 1) {
        word = parts[0].substring(0, maxLen);
    } else if (parts.length === 2) {
        word = parts
            .map((w, i) =>
                i
                    ? capitalizeFirstLetter(w.substring(0, maxLen / 2))
                    : w.substring(0, maxLen / 2),
            )
            .join('');
    } else if (parts.length >= 3) {
        word = parts
            .slice(0, 3)
            .map((w, i) =>
                i
                    ? capitalizeFirstLetter(w.substring(0, maxLen / 3))
                    : w.substring(0, maxLen / 3),
            )
            .join('');
    }
    return word;
};

export function capitalizeFirstLetter(string: string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
