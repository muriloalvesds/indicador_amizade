Para instalar:
Instalar Docker https://docs.docker.com/desktop/install/windows-install/ (adicionar ao path das variaveis de ambiente)

Docker: 

terminal ./> docker build . -t muriloalvesds/indicador_amizade
terminal ./> docker run -p 3000:3000  -d 'muriloalvesds/indicador_amizade'
terminal ./> docker-compose up --build

sem docker: terminal ./> npm install 
Para rodar o projeto:
terminal ./> npm start

Utilizar postman com as requests do diretório (importar no postman)./postman/Ewally.postman_collection.json

Rota GET/fill-tests: 
**Alimenta com registros contendo numeros de CPF e nomes ficticios de acordo como modelo solicitado
**Caso queira alimentar os registros manualmente não chamar a rota GET/fill-tests ou subistituir o Json na rota " app.get('/fill-tests'... " em server.js 

Rota POST/person :
Cadastra novo nome e cpf

Rota GET/person:
Recebe um cpf e retorna os dados completos

Rota GET/Clean:
Limpa todos os registros

Rota POST/Relationship:
Cadastrar relacionamentos com de 2 numeros de CPF

Rota GET/recomendation:
Sugere relacionamentos a partir de relacionamentos já cadastrados ou alimentados com a rota GET/fill-tests



