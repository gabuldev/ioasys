const {Hasura} = require("../config/hasura");
const{Categoria} = require("../models/categoria");

class CategoriaRepo{


    constructor(categoria){
        this.categoria = categoria;
    }


    async insert(){
      return  Hasura.send(this.categoria.insert())
    }

    async update(){
        return Hasura.send(this.categoria.update());
    }


 //? STATIC METHODS

   static async getByName(name){
        return Hasura.send(Categoria.getByName(name)); 
    }

  static async getById(id){
        return Hasura.send(Categoria.getById(id)); 
    }
    static async getAll(){
      return Hasura.send(Categoria.getAll()); 
  }

  static async getSearchName(name){
    return Hasura.send(Categoria.getSearchName(name)); 
}






}

module.exports = {CategoriaRepo}