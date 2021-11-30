const formatDateYear = (date: string): string => {
    const dateInstance = new Date(date);
    return dateInstance.getUTCFullYear().toString();
};

export default formatDateYear;