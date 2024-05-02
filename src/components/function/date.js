const currentDate = new Date();
const year = currentDate.getFullYear();
let prevMonth = currentDate.getMonth();
let month = currentDate.getMonth() + 1; 
let date = currentDate.getDate();
if (month < 10) {
  month = '0'+month
}
if (date < 10) {
  date = '0'+date
}

// Format Date
export const formatIndDate = (originalDate) => {
    const parts = originalDate.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
export const formatStandartDate = (originalDate) => {
    const parts = originalDate.split("-");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

// Get Data
export const getFullDate = () => {
    return year+'-'+month+'-'+date
}
export const getMonth = () => {
    return year+'-'+month
}
export const getPrevMonth = () => {
    return year+'-'+prevMonth
}

