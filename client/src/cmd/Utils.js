export const removeAnsiCodes = (str) => {
    return str.replace(/\x1b\[[0-9;]*[mHJKG]/g, '');
};