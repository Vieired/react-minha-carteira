import React, { useEffect, useState } from 'react';
import { Container, Content, Header, Loading } from './styles';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import apiGitLab from '../../services/ApiGitLab';
import formatDate from '../../utils/formatDate';
// import dotenv from 'dotenv';

interface IData {
    id: number;
    name: string;
    name_with_namespace: string;
    web_url: string;
    created_at: string;
    description: string;
    default_branch: string;
    last_activity_at: string;
    namespace: {
      id: number;
      name: string;
    };
    permissions: {
      project_access: {
        access_level: number;
      };
      group_access: {
        access_level: number;
      };
    };    
}

const ApiGitLab: React.FC = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // console.log(".env token: ", process.env.TOKEN);

    useEffect(() => {
        let token = window.localStorage.getItem('token');
        if(!token || token === "") {
            let token = prompt("Por favor, insira o token de autenticação.", "");
            window.localStorage.setItem('token', (token ? token : ""));
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        
        apiGitLab.get("/projects", config)
        .then(response => listPersons(response.data))
        .catch((err) => {
            console.log("There is a error!");
            window.localStorage.setItem('token', "");
        })
        .finally(() => {
            setIsLoading(false);
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
    });*/ 


    const listPersons = (item: any) => {
        // console.log("Response:", item)
        setItems(item);
    };

    return (
        <Container>
            <Header>API GitLab</Header>
            <Content>
                { isLoading && <Loading/> }
                { !isLoading && items?.map((data:IData) => (
                    <HistoryFinanceCard
                        key={data.id}
                        title={data.name}
                        subtitle={`${data.description}cm . Branch: ${data.default_branch} . Última atividade em: ${formatDate(data.last_activity_at)} . Criado em: ${formatDate(data.created_at)}`}
                        amount=""
                        tagColor={"yellow"} />
                ))}
            </Content>
        </Container>
    )
};

export default ApiGitLab;