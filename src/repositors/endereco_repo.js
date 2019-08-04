const {Hasura} = require("../config/hasura");
const{Endereco} = require("../models/endereco");

class EnderecoRepo{


    constructor(endereco){
        this.endereco = endereco;
    }


    async insert(){
      return  Hasura.send(this.endereco.insert())
    }

    async update(){
        return Hasura.send(this.endereco.update());
    }


 //? STATIC METHODS

   static async getByName(name,userId){
        return Hasura.send(Endereco.getByName(name,userId)); 
    }

  static async getById(id){
        return Hasura.send(Endereco.getById(id)); 
    }
    static async getAll(userId){
      return Hasura.send(Endereco.getAll(userId)); 
  }

  static async getSearchName(name,userId){
    return Hasura.send(Endereco.getSearchName(name,userId)); 
}






}

module.exports = {EnderecoRepo}