export default function calculateDuration(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  let startTotalMinutes = startHour * 60 + startMinute;
  let endTotalMinutes = endHour * 60 + endMinute;
  // If the end time is less than the start time, it means the end time is on the next day.
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60;
  }
  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const durationHours = Math.floor(durationMinutes / 60);
  const remainingMinutes = durationMinutes % 60;
  if (remainingMinutes === 0) {
    return `${durationHours} hours`;
  } else {
    return `${durationHours} hours and ${remainingMinutes} minutes`;
  }
}