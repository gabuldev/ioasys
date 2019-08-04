const {Hasura} = require("../config/hasura");
const{Produto} = require("../models/Produto");

class ProdutoRepo{


    constructor(produto){
        this.produto = produto;
    }


    async insert(){
      return  Hasura.send(this.produto.insert())
    }

    async update(){
        return Hasura.send(this.produto.update());
    }


 //? STATIC METHODS

   static async getByName(name){
        return Hasura.send(Produto.getByName(name)); 
    }

    static async getSearchName(name){
      return Hasura.send(Produto.getSearchName(name)); 
  }

  static async getById(id){
        return Hasura.send(Produto.getById(id)); 
    }
    static async getByCategoria(id){
      return Hasura.send(Produto.getByCategoria(id)); 
  }
    static async getAll(){
      return Hasura.send(Produto.getAll()); 
  }






}

module.exports = {ProdutoRepo}