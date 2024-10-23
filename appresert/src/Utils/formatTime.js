export const formatTime = (time, type) => {
    
    // Vérifie si "time" est défini, est une chaîne de caractères et contient ":"
    if (!time || typeof time !== "string" || !time.includes(":")) {
        // Retourne une chaîne vide ou gère le cas invalide selon le besoin
        return "";
    }
    if(type ==='GET'){ 
        // Convertit la chaîne de date en un objet Date
        const date = new Date(time);
    
        // Récupère les heures et minutes depuis l'objet Date
        let hour = date.getUTCHours(); // Utilise getUTCHours() pour la gestion de l'heure en UTC
        let minute = date.getUTCMinutes(); // getUTCMinutes() pour les minutes en UTC

        //let [hour, minute] = time?.split(":");
        /*hour = parseInt(hour, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute?.padStart(2, "0")} ${ampm}`;*/

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;  // Convertit les heures en format 12 heures
        minute = minute ? minute.toString().padStart(2, "0") : "00";  // Ajoute un 0 si les minutes sont inférieures à 10
        return `${hour}:${minute} ${ampm}`;
    } else {
        const [hour, minute] = time?.split(":");
        const formattedHour = hour?.padStart(2, "0");
        const formattedMinute = minute?.padStart(2, "0");
        return `${formattedHour}:${formattedMinute}`;
    }
};