export const timecalculation=(mongoDateString, toDate = new Date())=>{
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const fromDate = new Date(mongoDateString);
    const elapsed = toDate - fromDate;

    if (elapsed < msPerMinute) {
         return 'just now';
    } else if (elapsed < msPerHour) {
         const minutes = Math.round(elapsed / msPerMinute);
         return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsed < msPerDay) {
         const hours = Math.round(elapsed / msPerHour);
         return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
         const days = Math.round(elapsed / msPerDay);
         return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}