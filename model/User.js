//User.js
const DB = require('../DB');
module.exports = class User{   
    
    constructor(name=null, cpf=null) {
        this.name(name);
        this.cpf(cpf);
    }
    cpf(value) {
        const pattern_cpf = new RegExp(/[0-9]{11}/);
        if (value != null ) {
            if (!pattern_cpf.test(value)) {
                throw 'CPF informado tem tamanho diferente de 11 dígitos numéricos'
            }
            this.cpf=value;
        }
        return this.cpf
    }
    name(value=null) {
        if (value != null ) {
            this.name=value;
        }
        return this.name
    }
    save() {
        if (this.find(this.cpf)) {
            throw 'O usuário já está cadastrado';
        }
        DB.users.push(this)
    }
    find(cpf=null) {
        if (cpf==null) {
            cpf=this.cpf;
        }
        return DB.users.find(el => el.cpf == cpf);
    }
    clean(){
        /*DB.users.splice(0,DB.users.length);*/
        DB.users=[];
    }

}
