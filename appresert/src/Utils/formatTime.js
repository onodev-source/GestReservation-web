import { format, isToday, isYesterday, subDays, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

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

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;  // Convertit les heures en format 12 heures
        minute = minute ? minute.toString().padStart(2, "0") : "00";  // Ajoute un 0 si les minutes sont inférieures à 10
        return `${hour}:${minute} ${ampm}`;
    }
    if(type ==='GETDATEHOUR'){ 
        //Convertit la chaîne de date en un objet Date
        const date = new Date(time);
        const currentYear = new Date().getFullYear();
        const yearOfDate = date.getFullYear();

        if (isToday(date)) {
            const hoursAgo = formatDistanceToNow(date, { locale: fr, addSuffix: true });

            // Si la date est d'aujourd'hui et qu'il y a moins de 12 heures, afficher "il y a X heures"
            const hoursDifference = Math.abs(new Date().getHours() - date.getHours());
            if (hoursDifference < 12) {
                return hoursAgo;
            }

            // Si la date est d'aujourd'hui mais plus ancienne que 12 heures, afficher "Aujourd'hui, heure"
            return `Aujourd'hui, ${format(date, 'HH:mm', { locale: fr })}`;
        } else if (isYesterday(date)) {
            return `Hier, ${format(date, 'HH:mm', { locale: fr })}`;
        } else if (date >= subDays(new Date(), 2)) {
            return `Avant-hier, ${format(date, 'HH:mm', { locale: fr })}`;
        } else {
            // Formater la date en fonction de l'année
            const dateFormat = yearOfDate === currentYear ? "dd MMM, HH:mm" : "dd MMM yyyy, HH:mm";
            return format(date, dateFormat, { locale: fr });
        }
    } else {
        const [hour, minute] = time?.split(":");
        const formattedHour = hour?.padStart(2, "0");
        const formattedMinute = minute?.padStart(2, "0");
        return `${formattedHour}:${formattedMinute}`;
    }
};