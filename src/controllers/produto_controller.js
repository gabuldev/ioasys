const {ProdutoService} = require("../services/produto_service");


class ProdutoController{

    
    static async createProduto(req,res,next){
        try{
        var result = await ProdutoService.create(req.body);
        return res.send(result.status,result.message);
        }catch(e){
            console.log("ERROR: Create produto",e)
            return res.send(500,{"message": "Erro interno servidor"}); 
        }
    }


    static async updateProduto(req,res,next){

        try{
            var produto = req.body;
            var result = await ProdutoService.update(produto);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Update produto",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }
    }

    static async getProduto(req,res,next){
        try{
            var produto = req.query;
            var result = await ProdutoService.get(produto);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Get produto",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }

    }
}

module.exports={ProdutoController}