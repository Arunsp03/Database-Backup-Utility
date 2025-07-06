"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDBTypeParams = exports.getFormattedDate = void 0;
const getFormattedDate = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const formattedDate = `${dd}${mm}${yy}_${hh}${min}${ss}`;
    return formattedDate;
};
exports.getFormattedDate = getFormattedDate;
const SUPPORTED_DB_TYPES = ["postgres", "mysql"];
const checkDBTypeParams = (dbType) => {
    try {
        return SUPPORTED_DB_TYPES.includes(dbType.toLowerCase());
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
exports.checkDBTypeParams = checkDBTypeParams;
