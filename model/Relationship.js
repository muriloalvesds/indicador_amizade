//Relationship.js
const DB = require('../DB');
module.exports = class User{   
    
    constructor(cpf1,cpf2) {
        this.cpf1(cpf1);
        this.cpf2(cpf2);
        
    }
    cpf1(value) {
        if (value != null ) {
            this.cpf1=value;
        }
        return this.cpf1
    }
    cpf2(value) {
        if (value != null ) {
            this.cpf2=value;
        }
        return this.cpf2
    }
    name(value=null) {
        if (value != null ) {
            this.name=value;
        }
        return this.name
    }
    save() {
        let relationship = DB.relationship.filter( el => (el.cpf1 == this.cpf1 && el.cpf2 == this.cpf2 ) || (el.cpf1 == this.cpf2 && el.cpf2 == this.cpf1 ))
        if (relationship.length >= 1) {
            throw 'O relacionamento já existe';
        }
        DB.relationship.push(this)
    }
    find(cpf) {
        return DB.users.find(el => el.cpf == cpf);
    }
    clean(){
        /*DB.users.splice(0,DB.users.length);*/
        DB.users=[];
    }

}
