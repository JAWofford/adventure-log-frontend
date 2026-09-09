export function getXsrfToken(cookieString){
const xsrfToken = cookieString
  .split("; ")
  .find(cookie => cookie.startsWith("XSRF-TOKEN="))
  ?.split("=")
  .slice(1)
  .join("="); //added to handle any token that has and equal sign as part of the string.
   
  return xsrfToken

}