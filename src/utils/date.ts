export function convertDate(dateString: string) {
    const date = new Date(dateString);
    // Extracting day, month, and year from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed, so we add 1
    const year = date.getFullYear();

    // Padding day and month with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Formatted date in dd/mm/yyyy format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
}
export function convertDateTime(dateTimeString: string) {
    const dateObj = new Date(dateTimeString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}
export function isValidDateRange(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return startDate < endDate;
}