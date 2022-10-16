export const calculateDaysBetween = (startDate: Date, endDate: Date): number => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const diff = end - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const dateToString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isPalindrome = (str: string | number): boolean => {
    if (typeof str === "number") {
        return isPalindrome(str.toString());
    }
    const reversed = str.split("").reverse().join("");
    return reversed === str;
};
