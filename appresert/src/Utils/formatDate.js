import { format, isToday, isYesterday, subDays, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (dateString, formatPost) => {
    if (formatPost === 'SEND') {
        const formattedDate = new Date(dateString).toISOString().slice(0, 10);
        return formattedDate;
    } else if (formatPost === 'GET') {
        
        const options = { year: 'numeric', month: 'long', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
        
    }else if (formatPost === 'HOUR') {
        const date = new Date(dateString);
        
        // Obtenir les heures, minutes et secondes
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
        
        // Format hh:mm:ss.uuuuuu
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
        
    } else if(formatPost ==='GETDATE'){ 
        //Convertit la chaîne de date en un objet Date
        const date = new Date(dateString);
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
            return `Aujourd'hui`;
        } else if (isYesterday(date)) {
            return `Hier`;
        } else if (date >= subDays(new Date(), 2)) {
            return `Avant-hier`;
        } else {
            // Formater la date en fonction de l'année
            const dateFormat = yearOfDate === currentYear ? "dd MMM" : "dd MMM yyyy";
            return format(date, dateFormat, { locale: fr });
        }
        
    } else {
        // Convertir la chaîne de date en objet Date
        const date = new Date(dateString);
      
        // Options de formatage pour le jour et le mois
        const options = { day: '2-digit', month: 'short' };
      
        // Formatter la date
        const formattedDate = date.toLocaleDateString('fr-FR', options);
      
        return formattedDate;
    }
};