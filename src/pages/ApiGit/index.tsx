import React, { useEffect, useState } from 'react';
import { Container, Content, Header, Loading } from './styles';
// import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiGit from '../../services/ApiGit';

const ApiGit: React.FC = () => {

    // const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = '6d956a80b38b385a1bec';
        const config = {
            params: {
                access_token: token,
                // username: "logominus@gmail.com"
            },
            headers: {
                // 'Authorization': `token ${token}`,
                'Authorization': `Bearer ${token}`,
                // method: 'GET',
            }
        }
        
        // GET
        apiGit.get(
            "/user/repos"
            // "/orgs/{org}/projects"
            , config
        )
        .then(response => console.log("Response", response))
        .catch((err) => {
            console.log("There is a error!", err)
        })
        .finally(() => {
            setIsLoading(false);
            console.log("Finalizou o request.")
        });

        // POST TOKENREQUEST ENVIANDO CODE - PARA ADIQUIRIR TOKEN DE ACESSO
        /*const CODE = new URLSearchParams(window.location.search).get("code");
        const params = {
            params: {
                access_token: CODE,
                username: "logominus@gmail.com"
            }
        };
        if(CODE) {
            apiGit.post(
                ''
                // '/user'
                , params
                , config
                // ,{
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
                console.log(CODE);
                console.log(response)
            })
            .catch((err) => {
                console.log("There is a error!", err)
            })
            .finally(() => {
                console.log("Code retornado: ", CODE);
                console.log("Finalizou o request.")
            });
        }*/
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
            <Header>API GIt</Header>
            <Content>
                {<a href="https://github.com/login/oauth/authorize?scope=user:logominus@gmail.com&client_id=6d956a80b38b385a1bec">Autorizar usuário no Git</a>}
                { isLoading && <Loading/> }
                {/* { !isLoading && console.log(items)} */}
            </Content>
        </Container>
    )
};

export default ApiGit;