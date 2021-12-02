import axios from 'axios';

const ApiMarvel = axios.create({
    baseURL: "http://gateway.marvel.com/v1/public/"
    // baseURL: "https://gateway.marvel.com:443/v1/public/"
    // baseURL: "https://gateway.marvel.com:443/v1/public/"
    // baseURL: "http://developer.marvel.com:443/v1/public/"
    // baseURL: "developer.marvel.com" // essa quase foi
    // baseURL: "https://gateway.marvel.com"
    // baseURL: "http://gateway.marvel.com"
    // baseURL: "gateway.marvel.com"
    // baseURL: "https://marvel.dev/api/"
    // baseURL: "https://developer.marvel.com"
    // baseURL: "http://gateway.marvel.com/v1/public/comics"
});

// ApiMarvel.defaults.headers.common['Authorization'] = `Bearer 99708c803f660aaea0ce2bc2332d988e`;

export default ApiMarvel;