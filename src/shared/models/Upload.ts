export interface CustomFile extends File {
    preview: string;
}

export interface ServerFile {
    // id?: string;
    name: string;
    data?: string;
    size?: number;
    // description?: string;
}
  
export interface Download {
    name: string;
    data: string;
}