
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