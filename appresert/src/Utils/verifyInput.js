export const verifyInput = (input, type) => {
    if (type === 'tel') {
        // Regex pour accepter un numéro au format '237698664144'
        const telPattern = /^2376\d{8}$/;
        return telPattern.test(input);
        
    } else {
        const emailPattern = /^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/;
    
        return emailPattern.test(input)
    }
}