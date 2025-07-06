export const getFormattedDate = ():string => {
const now = new Date();

const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0');
const yy = String(now.getFullYear()).slice(-2);

const hh = String(now.getHours()).padStart(2, '0');
const min = String(now.getMinutes()).padStart(2, '0');
const ss = String(now.getSeconds()).padStart(2, '0');

const formattedDate:string = `${dd}${mm}${yy}_${hh}${min}${ss}`;

return formattedDate;

 
};
