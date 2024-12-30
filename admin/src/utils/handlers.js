import dateFormat from "dateformat";

export const formatDate = (date, options) => {
    return dateFormat(date, options ? options : "dd/mm/yyyy  h:MM TT"); 
  }
  