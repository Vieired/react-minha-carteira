import axios from 'axios';

const apiGitLab = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_GIT
});

// console.log("Axios: .env: ", process.env.TOKEN_GITLAB);

export default apiGitLab;