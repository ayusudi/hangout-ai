export default function formatDate(dateString) {
  if (typeof dateString === "string" && dateString.indexOf(",") !== -1) {
    return dateString
  }
  let date = new Date(dateString);
  if (typeof dateString == 'string' && dateString.indexOf("/") !== -1) {
    const [day, month, year] = dateString.split('/')
    date = new Date(year, month - 1, day)
  }
  const optionsDay = { weekday: 'long' };
  let day = date.toLocaleDateString('en-US', optionsDay);
  if (day === "Invalid Date") {
    date = new Date()
    day = date.toLocaleDateString('en-US', optionsDay);
  }
  // if (dateString.split('').includes(",")) {
  //   return dateString
  // }
  const dayOfMonth = date.getDate();
  const optionsMonth = { month: 'short' };
  const month = date.toLocaleDateString('en-US', optionsMonth).toUpperCase();
  const year = date.getFullYear();
  return `${day}, ${dayOfMonth} ${month} ${year}`;
}
