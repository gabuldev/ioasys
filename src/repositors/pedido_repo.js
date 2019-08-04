const {Hasura} = require("../config/hasura");
const{Pedido} = require("../models/pedido");

class PedidoRepo{


    constructor(pedido){
        this.pedido = pedido;
    }


    async insert(){
      return  Hasura.send(this.pedido.insert())
    }

    async update(){
        return Hasura.send(this.pedido.update());
    }


 //? STATIC METHODS

 static async getAll(userId){
    return Hasura.send(Pedido.getAll(userId)); 
}






}

module.exports = {PedidoRepo}