export interface Response {
    config: IConfig;
    headers?: any;
    request?: any;
    status?: any;
    statusText?: string;
}

export interface IPeople {
    birth_year: string;
    eye_color: string;
    skin_color: string;
    hair_color: string;
    films: string[];
    gender: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    created: string;
    edited: string;
    species: string[];
    starships: string[];
}

export interface IDataPages {
    count: number;
    next: string | null;
    previous: string | null;
    results?: IPeople[];
}

export interface IDataFilm {
    title: string;
    episode_id?: number;
    opening_crawl?: string;
    director?: string,
    producer?: string,
    release_date: string;
    url?: string;
}

export interface IConfig {
    url: string;
    baseURL?: string;
    method?: string;
}

export interface IResponseFilm extends Response {
    data: IDataFilm;
}

export interface IDataStarship {
    pilots?: string[];
    MGLT?: string;
    cargo_capacity?: string;
    consumables?: string;
    cost_in_credits?: string;
    created?: string;
    crew?: string;
    edited?: string;
    films?: string[];
    hyperdrive_rating?: string;
    length?: string;
    manufacturer?: string;
    max_atmosphering_speed?: string;
    model: string;
    name: string;
    passengers?: string;
    starship_class?: string;
    url?: string;
}

export interface IResponseStarships extends Response {
    data: IDataStarship;
}