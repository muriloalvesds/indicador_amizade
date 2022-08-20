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
        "name": "asd",
        "cpf": "06285363993"
    },
    {
        "name": "asd",
        "cpf": "06285363994"
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
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);