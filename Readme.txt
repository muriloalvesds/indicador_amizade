Para instalar:
Instalar node https://nodejs.org/en/download/
terminal ./> npm install 
Para rodar o projeto:
terminal ./> npm start

Docker: 

Utilizar postman com as requests do diretório (importar no postman)./postman/Ewally.postman_collection.json

Rota GET/fill-tests: 
**Alimenta com registros contendo numeros de CPF e nomes ficticios de acordo como modelo solicitado
**Caso queira alimentar os registros manualmente não chamar a rota GET/fill-tests ou subistituir o Json na rota " app.get('/fill-tests'... " em server.js 

Rota person post:
Cadastra novo nome e cpf

Rota person get:
Recebe um cpf e retorna os dados completos

Rota Clean:
Limpa todos os registros

Rota e Relationship:
Cadastrar relacionamentos com de 2 numeros de CPF
Rota recomendation:
Sugere relacionamentos



