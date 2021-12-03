import axios from 'axios';

const apiGitLab = axios.create({
    baseURL: "https://gitlab.com/api/v4"
});

// console.log("Axios: .env: ", process.env.TOKEN_GITLAB);

export default apiGitLab;