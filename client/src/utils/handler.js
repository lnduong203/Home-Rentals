import dateFormat from "dateformat";

export const ratingStar = (rate) => {
  if (rate === 5) {
    return "Excellent";
  } else if (rate === 4) {
    return "Good";
  } else if (rate === 3) {
    return "Average";
  } else if (rate === 2) {
    return "Poor";
  } else {
    return "Terrible";
  }
};

export const formatDate = (date, options) => {
  return dateFormat(date, options ? options : "dd/mm/yyyy  h:MM TT"); 
}
