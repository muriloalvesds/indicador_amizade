'use strict';

const express = require('express');
var bodyParser  = require("body-parser");
const app = express();
const PORT = 3000;
const HOST = '127.0.0.1';
const User = require('./model/User');
const Relationship = require('./model/Relationship');
const DB = require('./DB');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const users =[]
// App
app.get('/', (req, res) => {
  DB.users=[
    {
        "name": "Jimmy Page",
        "cpf": "11111111190"
    },
    {
        "name": "Alan Turing",
        "cpf": "11111111191"
    },
    {
        "name": "Robert Plant",
        "cpf": "11111111192"
    },
    {
        "name": "Albert Einstain",
        "cpf": "11111111193"
    },
    {
        "name": "Fredy Mercury",
        "cpf": "11111111194"
    },
    {
        "name": "Nicola Tesla",
        "cpf": "06285363995"
    },
    {
        "name": "Jimmy Hedrix",
        "cpf": "11111111196"
    },
    {
        "name": "Pitágoras",
        "cpf": "11111111197"
    },
    {
        "name": "Axel Rose",
        "cpf": "11111111198"
    },
    {
        "name": "Junny Simons",
        "cpf": "11111111199"
    },
    {
        "name": "Angus Young",
        "cpf": "11111111180"
    },
    {
        "name": "Monet",
        "cpf": "11111111181"
    },
    {
        "name": "Bil Gates",
        "cpf": "11111111182"
    },
    {
        "name": "Ken Thonpson",
        "cpf": "11111111183"
    },
    {
        "name": "John Lenon",
        "cpf": "11111111184"
    },
    {
        "name": "Richard Stallman",
        "cpf": "11111111185"
    },
    {
        "name": "Elton John",
        "cpf": "11111111186"
    },
    {
        "name": "Donald Knuth",
        "cpf": "11111111187"
    },
    {
        "name": "Marvin Minsky",
        "cpf": "11111111188"
    },
    {
        "name": "Ward Cunningham",
        "cpf": "11111111189"
    }
  ];

  res.send(DB.users);
});

app.post('/person',function(req,res){
    try {    
        let user = new User(req.body.name,req.body.cpf)
        user.save()
        user = null;
        res.send({"success": "true"});
    } catch (error) {
        res.status(400).send(error);
    }    
});
app.get('/person/:cpf',function(req,res){
    try {    
        let user = (new User()).find(req.params.cpf)
        if (!user) {
            throw 'Usuário não encontrado'
        }
        res.send(user);
    } catch (error) {
        res.status(404).send(error);
    }    
});
app.get('/clean',function(req,res){
    let user = (new User()).clean()
    res.send({"success": "true"});
});

app.post('/relationship',function(req,res){
        try {
        let user1 = (new User(null, req.body.cpf1)).find()
        let user2 = (new User(null, req.body.cpf2)).find()
        if (!user1) {
            throw `Usuário ${req.body.cpf1} não encontrado`
        }
        if (!user2) {
            throw `Usuário ${req.body.cpf2} não encontrado`
        }
        let relationship = new Relationship(user1.cpf,user2.cpf)
        relationship.save()
        relationship = null;
        res.send({"success": "true"});
        } catch (error) {
        res.status(400).send(error);
    }    
});

app.get('/Recommendations',function(req,res){
    
    DB.users.forEach(function(user, val){

    // busca todos os amigos de user
    list_of_relations = DB.relationship.filter(relation => (cpf1 == user.cpf || cpf2 == user.cpf) );

    list_friends = []
    list_of_relations.forEach(function(relation) {
        if(relation.cpf1 != user.cpf) {
            list_friends.push(relation.cpf1);
        } 
        if(relation.cpf2 != user.cpf) {
            list_friends.push(relation.cpf2);
        }
            
    });

    list_friends.forEach(function(friend){
            // Busca os relacionamentos do amigo
            friends_relation = DB.relationship.filter(relation => (cpf1 == friend.cpf || cpf2 == friend.cpf) );

            // filtra todos os amigos que nao sao amigos de User
            friends_sugestions = friends_relation.filter(relation => !list_friends.includes(relation.cpf1) || !list_friends.includes(relation.cpf2) );

            friends_sugestions.forEach(function(sugestion){

                // Chave composta para melhor performance
                key = user.cpf + sugestion.cpf;
                
                if(key in DB.recomendations) {
                    DB.recomendations[key]['relevance']++;
                } else {
                    DB.recomendations[key]['user_cpf'] = user.cpf;
                    DB.recomendations[key]['sugested_friend'] = sugestion.cpf;
                    DB.recomendations[key]['relevance'] = 1;
                }
            })

        });
    });
    

    res.send({"success": "true"});
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);