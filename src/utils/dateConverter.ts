export default function convertDate(dateString: string) {
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