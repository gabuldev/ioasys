const {PedidoService} = require("../services/pedido_service");


class PedidoController{


    static async createPedido(req,res,next){
        try{
            var pedido = req.body;
            pedido.userId = req.user.id;
        var result = await PedidoService.create(req.body);
        return res.send(result.status,result.message);
        }catch(e){
            console.log("ERROR: Create Pedido",e)
            return res.send(500,{"message": "Erro interno servidor"}); 
        }
    }


    static async updatePedido(req,res,next){

        try{
            var pedido = req.body;
            var result = await PedidoService.update(pedido);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Update Pedido",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }
    }

    static async getPedido(req,res,next){
        try{
            var pedido = req.query;
            pedido.userId = req.user.id;
            var result = await PedidoService.get(pedido);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Get Pedido",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }

    }
}

module.exports={PedidoController}