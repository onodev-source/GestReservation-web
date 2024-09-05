
export const formatDate = (dateString, formatPost) => {
    if (formatPost === 'SEND') {
        const formattedDate = new Date(dateString).toISOString().slice(0, 10);
        return formattedDate;
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