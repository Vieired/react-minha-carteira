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

export interface IResponseFilm {
    config: IConfig;
    data: IDataFilm;
}

export interface IDataStarships {
    name: string;
    model?: string;
    manufacturer?: string;
    starship_class?: string;
    cost_in_credits?: string;
    length?: string;
    max_atmosphering_speed?: string;
}

export interface IResponseStarships {
    config: IConfig;
    data: IDataStarships;
}