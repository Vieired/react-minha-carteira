
import apiSW from ".";
import { IDataPages } from "../../shared/models/StarWars";

const ENDPOINT = 'people';

async function list(): Promise<IDataPages> {
    const {data} = await apiSW.get(`${ENDPOINT}/`);
    return data;
}

async function listNext(page: string): Promise<IDataPages> {
    const { data } = await apiSW.get(`${ENDPOINT}/?page=${page}`);
    return data;
}

async function listPrevious(page: string): Promise<IDataPages> {
    const { data } = await apiSW.get(`${ENDPOINT}/?page=${page}`);
    return data;
}

export const peopleService = {
    list,
    listNext,
    listPrevious,
};