export const formatTime = (time, type) => {
    if(type ==='GET'){
        let [hour, minute] = time.split(":");
        hour = parseInt(hour, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute.padStart(2, "0")} ${ampm}`;
    } else {
        const [hour, minute] = time.split(":");
        const formattedHour = hour.padStart(2, "0");
        const formattedMinute = minute.padStart(2, "0");
        return `${formattedHour}:${formattedMinute}`;
    }
};