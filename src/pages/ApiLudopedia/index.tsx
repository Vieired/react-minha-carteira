import React, { useEffect, useState } from 'react';
import { Container, Content, Header, Loading } from './styles';
// import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiLudopedia from '../../services/ApiLudopedia';

const ApiLudopedia: React.FC = () => {

    // const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = '6f655b678f09ac0f9f12e69d1fb255fa';
        // const tokenGitlab = 'WyzSZGjXrXaaPccDJXGo';
        const config = {
            params: {
                code: token,
                // username: "logominus@gmail.com"
            },            
            headers: {
                'Authorization': `Bearer ${token}`,
                // method: 'GET',
            //   'Authorization': `Basic ${token}`,
            //   'Authorization': `token ${token}`,
                // 'Authorization': `o-auth ${token}`
                // 'Authorization': `o-auth2 ${token}`
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                // 'Vary': 'Accept-Encoding,Authorization,User-Agent'
            //   'X-Requested-With': 'XMLHttpRequest'
            //   'Access-Control-Allow-Origin': '*'
            //   "Access-Control-Allow-Methods" : "GET",
            //   "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"          
            }
        }
        // apiLudopedia.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
        // apiLudopedia.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        // apiLudopedia.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // const cors = require("cors");
        // apiLudopedia.options("*", cors({ origin: 'http://localhost:3000/api-ludopedia', optionsSuccessStatus: 200 }));
        // apiLudopedia.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

        // apiLudopedia.defaults.headers.Authorization = `Bearer ${token}`;

        // apiLudopedia.defaults.baseURL = 'https://ludopedia.com.br/api/v1/';
        // apiLudopedia.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // apiLudopedia.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';    

        
        // GET JOGOS - LISTA DE JOGOS CADASTRADOS NO PORTAL
        /*apiLudopedia.get(
            // '',
            "jogos",
            // 'projects',
            // 'https://www.ludopedia.com.br/api/ludopedia.com.br/api/v1/jogos',
            // '/ludopedia.com.br/api/ludopedia.com.br/api/v1/jogos',
            // 'ludopedia.com.br/api/v1/jogos'
            // 'https://ludopedia.com.br/api/v1/jogos'
            config
            // { method: 'get', headers: {'Authorization': `Bearer ${token}`} }
            // {
            //     baseURL: 'https://ludopedia.com.br/api/v1/',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            //     }
            // }
        )
        .then(response => console.log("Response", response.data))
        .catch((err) => {
            console.log("There is a error!", err)
        })
        .finally(() => {
            setIsLoading(false);
            console.log("Finalizou o request.")
        });*/

        // POST TOKENREQUEST ENVIANDO CODE - PARA ADIQUIRIR TOKEN DE ACESSO
        const CODE = new URLSearchParams(window.location.search).get("code");
        const paramsObj = {
            params: {
                code: CODE
            }
        };
        apiLudopedia.post(
            // 'https://ludopedia.com.br/tokenrequest'
            // 'https://ludopedia.com.br'
            '/tokenrequest'
            , {
                code: CODE
            }
            , {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // 'Method': 'POST',
                    // 'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                    // 'Access-Control-Allow-Origin': '*'
                    // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
                    // "Access-Control-Allow-Headers": 'Content-Type, Authorization'
                }
            }
            // , {
            //     headers: {
            //         "Access-Control-Allow-Origin": "*",
            //         // "Access-Control-Allow-Headers": "Authorization",
            //         "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
            //         // "Content-Type": "application/json;charset=UTF-8",
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            //         traditional: true,
            //     }
            // }
        )
        .then((response) => {
            console.log(".then: code enviado: ", CODE);
            console.log(response);
        })
        .catch((err) => {
            console.log("There is a error!", err)
        })
        .finally(() => {
            setIsLoading(false);
            console.log(".finally: code enviado: ", CODE);
            console.log("Finalizou o request.")
        });
    },[]);


    // GET ME - DADOS DO USUÁRIO
    /*apiLudopedia.get('me',config)
    .then((response) => listPersons(response.data))
    .catch((err) => {
        console.log("There is a error!", err)
    })
    .finally(() => {
        setIsLoading(false);
        console.log("Finalizou o request.")
    });    


    const listPersons = (item: any) => {
        console.log("Response:", item)
        setItems(item.results);
    };*/

    return (
        <Container>
            <Header>API Ludopedia</Header>
            <Content>
                <a href="https://ludopedia.com.br/oauth?app_id=07051c2489ac83fd&redirect_uri=http://localhost:3000/api-ludopedia">Autorizar usuário na Ludopedia</a>
                { isLoading && <Loading/> }
                {/* { !isLoading && console.log(items)} */}
            </Content>
        </Container>
    )
};

export default ApiLudopedia;