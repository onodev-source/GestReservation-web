
export const formatDate = (dateString) => {
    // Convertir la chaîne de date en objet Date
    const date = new Date(dateString);
  
    // Options de formatage pour le jour et le mois
    const options = { day: '2-digit', month: 'short' };
  
    // Formatter la date
    const formattedDate = date.toLocaleDateString('fr-FR', options);
  
    return formattedDate;
};