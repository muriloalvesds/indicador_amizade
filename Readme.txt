Para instalar:
npm install 
Para rodar o projeto:
npm start

Utilizar postman com as requests do diretório (importar pelo painel do postman)./postman/Ewally.postman_collection.json
Rota index: 
**Alimenta com 20 registros contendo numeros de CPF e nomes ficticios
**Caso queira alimentar os registros manualmente não chamar a rota index ou subistituir o Json na rota " app.get('/'... " em server.js 
Rota person post:
Cadastra novo nome e cpf
Rota person get:
Recebe um cpf e retorna os dados completos
Rota Clean:
Limpa todos os registros
Rota e Relationship:
Cadastrar relacionamentos com de 2 numeros de CPF
**Adicionar um registro por vez na rota relationship, validação individual
{
    "cpf1": "11111111190",
    "cpf2": "11111111191"
}
{
    "cpf1": "11111111190",
    "cpf2": "11111111192"
}
{
    "cpf1": "11111111192",
    "cpf2": "11111111194"
}
{
    "cpf1": "11111111191",
    "cpf2": "11111111193"
}
{
    "cpf1": "11111111193",
    "cpf2": "11111111192"
}



Rota recomendation:
Sugere relacionamentos



