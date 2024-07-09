## Versão do Node
14.16.1

## Variáveis de Ambiente
Antes de rodar a aplicação, criar um arquivo com nome ".env.local" na raíz do projeto e incluir nele a url base a ser consumida. Este arquivo não deve ser enviado para o repositório e já se encontra no gitignore.
No projeto existe um exemplo do arquivo com o nome ".env.example".

A variável deve ser usada no código da seguinte forma:

process.env.REACT_APP_BASE_URL

## Login
Para funcionar a autenticação via Google é necessário adicionar o ID do Cliente Google na variável de ambiente REACT_GOOGLE_APP_CLIENT_ID do arquivo "env".

### Mockup:
E-mail: meu e-mail
Senha: 123

## Testes Com Servidor Fake Na Tela Administração de Orçamentos
Instalar a lib Json Server, configurá-la em uma porta diferente da usada para rodar a aplicação (ex.3333) e rodar o comando "yarn server" para levantar um servidor fake para testes.