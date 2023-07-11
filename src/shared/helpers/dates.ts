
export const dateFormatter = (date: string | undefined): string => {
    if(date == null || date === '') return '';
    return new Date(date).toLocaleDateString();
}

export const isValidDate = (dateString: string): boolean => {
    let date = new Date(dateString);
    return !isNaN(date.getTime());
}

export const isValidDateRegx = (dateString:string): boolean => {
    let patternA = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd
    let patternB = /^\d{2}\/\d{2}\/\d{4}$/; // dd-mm-yyyy
    return patternA.test(dateString) || patternB.test(dateString);
}