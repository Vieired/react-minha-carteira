
import apiSW from ".";

const ENDPOINT = 'planets';

async function getHomeworld(id: string): Promise<string> {
    const { data } = await apiSW.get(`${ENDPOINT}/${id}`);
    return data;
}

export const planetsService = {
    getHomeworld,
};