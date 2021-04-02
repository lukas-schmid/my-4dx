export function randomItemFromArray(arr, not) {
    const item = arr[Math.floor(Math.random() * arr.length)];
    if(item === not) return randomItemFromArray(arr, not);
    return item;
}

export function getWeek(year,month,day) {
    function serial(days) { return 86400000*days; }
    function dateserial(year,month,day) { return (new Date(year,month-1,day).valueOf()); }
    function weekday(date) { return (new Date(date)).getDay()+1; }
    function yearserial(date) { return (new Date(date)).getFullYear(); }
    var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year,month,day), 
        date2 = dateserial(yearserial(date - serial(weekday(date-serial(1))) + serial(4)),1,3);
    return ~~((date - date2 + serial(weekday(date2) + 5))/ serial(7));
}

export function addDays(argDate, days) {
    var date = new Date(argDate);
    date.setDate(date.getDate() + days);
    return date;
}

export function subtractDays(argDate, days) {
    var date = new Date(argDate);
    date.setDate(date.getDate() - days);
    return date;
}

export function getMondayDate(argDate) {
    const dateCopy = new Date(argDate);
    const currentDay = dateCopy.getDay();
    let date;
    switch (currentDay) {
        case 0:
            //date = subtractDays(dateCopy, 6);
            date =  dateCopy.setDate(dateCopy.getDate() - 6)
            break;
        case 1:
            date = dateCopy;
            break;
        default:
            //date = subtractDays(dateCopy, (currentDay - 1));
            date =  dateCopy.setDate(dateCopy.getDate() - (currentDay - 1))
    }
    return new Date(date);
}

export function getFirstOfMonth(argDate) {
    const dateCopy = new Date(argDate);
    const dayDate = dateCopy.getDate();
    const firstOfMonth = dateCopy.setDate(dateCopy.getDate() - (dayDate - 1));
    return new Date(firstOfMonth);
}

export function decimalToPercent(decimal) {
    const float = parseFloat(decimal);
    return `${float * 100}%`;
}

export function formatMonthYear(date) {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const month = new Date(date).getMonth();
    const year = new Date(date).getUTCFullYear();
    return `${monthNames[month]} ${year}`
}

export function formatWeekFromTo(date) {
    const mon = getMondayDate(date);
    const sun = addDays(mon, 7);

    const monDDMMYY = `${mon.getDate()}/${mon.getMonth()}-${mon.getFullYear()}`;
    const sunDDMMYY = `${sun.getDate()}/${sun.getMonth()}-${sun.getFullYear()}`;

    return `(${monDDMMYY} > ${sunDDMMYY})`;
}