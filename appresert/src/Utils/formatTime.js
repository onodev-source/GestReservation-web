export const formatTime = (time, type) => {
    // Vérifie si "time" est défini, est une chaîne de caractères et contient ":"
    if (!time || typeof time !== "string" || !time.includes(":")) {
        // Retourne une chaîne vide ou gère le cas invalide selon le besoin
        return "";
    }
    if(type ==='GET'){
        let [hour, minute] = time?.split(":");
        hour = parseInt(hour, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute?.padStart(2, "0")} ${ampm}`;
    } else {
        const [hour, minute] = time?.split(":");
        const formattedHour = hour?.padStart(2, "0");
        const formattedMinute = minute?.padStart(2, "0");
        return `${formattedHour}:${formattedMinute}`;
    }
};