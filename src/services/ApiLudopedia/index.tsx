import axios from 'axios';

// const APP_ID = '07051c2489ac83fd';
// const APP_REDIRECT_URI = 'http://localhost:3000/api-ludopedia';

const apiLudopedia = axios.create({
    // baseURL: "ludopedia.com.br/api/v1/",
    // baseURL: "http://ludopedia.com.br/api/v1/" //301
    // baseURL: "https://ludopedia.com.br/api/v1/"
    // baseURL: 'http://localhost:3000/api-ludopedia',
    // baseURL: "https://localhost:3000/api-ludopedia/ludopedia.com.br/api/v1/"
    // baseURL: "localhost:3000/api-ludopedia/ludopedia.com.br/api/v1/"
    // baseURL: "localhost:3000/api-ludopedia/ludopedia.com.br/api/v1/"
    // baseURL: 'localhost:3000/api-ludopedia',
    // baseURL: 'localhost:3000/',
    // headers: { Authorization: `Bearer ${token}` }
    // baseURL: "http://localhost:3000/api-ludopedia/ludopedia.com.br/api/v1/"
    // baseURL: process.env.REACT_APP_API_LUDOPEDIA_COM_HTTPS
    // baseURL: process.env.REACT_APP_API_LUDOPEDIA_SEM_HTTPS
    // baseURL: process.env.REACT_APP_API_LUDOPEDIA_COM_HTTP
    // baseURL: process.env.REACT_APP_API_URL
    baseURL: 'https://www.ludopedia.com.br/api/ludopedia.com.br/api/v1/'
    // baseURL: 'https://gitlab.com/api/v4/'
    // baseURL: `https://ludopedia.com.br/oauth?app_id=${APP_ID}&redirect_uri=${APP_REDIRECT_URI}`
    // baseURL: "https://ludopedia.com.br/tokenrequest"
    // baseURL: "http://localhost:3000/api-ludopedia?code=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjoiNTc4NTAiLCJhcHBfaWQiOiIwNzA1MWMyNDg5YWM4M2ZkIiwiZXhwIjoxNjM4MTQwMjYzfQ.hvHSaGZX72GsOoB6J3os1NGT1-hYes1eY4ND2uacEnk/ludopedia.com.br/api/v1/"
});

// const token = '6f655b678f09ac0f9f12e69d1fb255fa';
// apiLudopedia.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// axios.defaults.baseURL = 'https://ludopedia.com.br/api/v1/';
// axios.defaults.baseURL = 'api-ludopedia';
// axios.defaults.baseURL = 'ludopedia.com.br/api/v1/';
// axios.defaults.baseURL = 'ludopedia.com.br';
// apiLudopedia.defaults.baseURL = 'https://www.ludopedia.com.br/api/ludopedia.com.br/api/v1/jogos';
// apiLudopedia.defaults.baseURL = 'https://www.ludopedia.com.br/api/ludopedia.com.br/api/v1/';
// apiLudopedia.defaults.baseURL = '/ludopedia.com.br/api/v1/';
// apiLudopedia.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// axios.defaults.headers.common['Authorization'] = `token ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application-json';
axios.defaults.headers.get['Content-Type'] = 'application-json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// apiLudopedia.interceptors.request.use(req => {

//     if (token) {
//         req.headers = {
//         ...req.headers,
//         Authorization: `Bearer ${token}`,
//         };
//     }

//     return req;
// });

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

export default apiLudopedia;