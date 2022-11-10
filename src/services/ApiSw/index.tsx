import axios from 'axios';

const apiSW = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_SW
});

export default apiSW;