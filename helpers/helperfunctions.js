exports.getMondayDate = (argDate) => {
  const dateCopy = new Date(argDate);
  const currentDay = dateCopy.getDay();
  let date;
  switch (currentDay) {
    case 0:
      //date = subtractDays(dateCopy, 6);
      date = dateCopy.setDate(dateCopy.getDate() - 6);
      break;
    case 1:
      date = dateCopy;
      break;
    default:
      //date = subtractDays(dateCopy, (currentDay - 1));
      date = dateCopy.setDate(dateCopy.getDate() - (currentDay - 1));
  }
  return new Date(date);
};

exports.getFirstOfMonth = (argDate) => {
  let date = new Date(argDate);
  date = new Date(date.getFullYear(), date.getMonth(), 1);
  return new Date(date.setDate(date.getDate() + 1));
};

exports.addDays = (argDate, days) => {
  let date = new Date(argDate);
  date.setDate(date.getDate() + days);
  return date;
};

exports.addMonth = (argDate) => {
  return new Date(argDate.setMonth(argDate.getMonth() + 1));
};

exports.addDay = (argDate) => {
  return new Date(argDate.setDate(argDate.getDate() + 1));
};

exports.formatDate = (argDate) => {
  return argDate.toISOString().split("T")[0];
};
