const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('pt-BR',{timeZone:"UTC"});
};

export default formatDate;