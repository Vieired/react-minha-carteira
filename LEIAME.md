## Node version
14.16.1

## Variáveis de Ambiente
Antes de rodar a aplicação, criar um arquivo com nome ".env.local" na raíz do projeto e incluir nele a url base a ser consumida. Este arquivo não deve ser enviado para o repositório e já se encontra no gitignore.
No projeto existe um exemplo do arquivo com o nome ".env.example".

A variável deve ser usada no código da seguinte forma:

process.env.REACT_APP_BASE_URL