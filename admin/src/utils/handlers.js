import dateFormat from "dateformat";

export const formatDate = (date, options) => {
  return dateFormat(date, options ? options : "dd/mm/yyyy  h:MM TT");
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  if (!token || !tokenExpiry) {
    return null;
  }

  const now = new Date().getTime();
  if (now > tokenExpiry) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
    return null;
  }
  return token;
};
