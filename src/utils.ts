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
const SUPPORTED_DB_TYPES:string[]=["postgres","mysql"];
export const checkDBTypeParams=(dbType:string):boolean=>{
try{
return SUPPORTED_DB_TYPES.includes(dbType.toLowerCase());
}
catch(err:any)
{
    console.error(err);
    return false;
}
}
