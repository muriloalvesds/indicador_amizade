'use strict';

const express = require('express');
var bodyParser  = require("body-parser");
const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const User = require('./model/User');
const Relationship = require('./model/Relationship');
const DB = require('./DB');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const users =[]
// App
app.get('/fill-tests', (req, res) => {
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
    }
  ];

  DB.relationship=[
    {
        "cpf1": "11111111190",
        "cpf2": "11111111191"
    },
    {
        "cpf1": "11111111190",
        "cpf2": "11111111192"
    },
    {
        "cpf1": "11111111192",
        "cpf2": "11111111194"
    },
    {
        "cpf1": "11111111191",
        "cpf2": "11111111193"
    },
    {
        "cpf1": "11111111193",
        "cpf2": "11111111192"
    }
  ];

  res.send({"users": DB.users, "relationships": DB.relationship });
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

app.get('/Recommendations/:cpf',function(req,res){
    try {
        let user = (new User(null, req.params.cpf)).find()
       
        if (!user) {
            res.status(404).send();
        }
        // busca todos os amigos de user
        let list_of_relations = DB.relationship.filter(relation => (relation.cpf1 == user.cpf || relation.cpf2 == user.cpf) );
          
        const list_friends = []
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
                let friends_relation = DB.relationship.filter(relation => ((relation.cpf1 == friend && relation.cpf2 != user.cpf) || (relation.cpf2 == friend && relation.cpf1 != user.cpf)) );
                // filtra todos os amigos que nao sao amigos de User
                let friends_sugestions = friends_relation.map(relation => {
                    
                    if( relation.cpf1 == friend && !list_friends.includes(relation.cpf2)){

                        return relation.cpf2;
                    }
                    if(relation.cpf2 == friend && !list_friends.includes(relation.cpf1)) {
                        return relation.cpf1;
                    }
                });
                friends_sugestions.forEach(function(sugestion){
                    
                    // Chave composta para melhor performance
                    let key = user.cpf + sugestion;
                    if(key in DB.recommendations) {
                        DB.recommendations[key]['relevance']++;
                    } else {
                        DB.recommendations[key]={
                            'user_cpf' : user.cpf,
                            'sugested_friend' : sugestion,
                            'relevance' : 1
                        }
                    }
                })
        });
        const reorder = Object.values(DB.recommendations);
        reorder.sort(function(a, b){return  b.relevance - a.relevance });
        const resp = reorder.map(i => i['sugested_friend']);
        res.send(resp);

    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);