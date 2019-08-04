const {EnderecoService} = require("../services/endereco_service");


class EnderecoController{


    static async createEndereco(req,res,next){
        try{
        var result = await EnderecoService.create(req.body,req.user.id);
        return res.send(result.status,result.message);
        }catch(e){
            console.log("ERROR: Create Endereco",e)
            return res.send(500,{"message": "Erro interno servidor"}); 
        }
    }


    static async updateEndereco(req,res,next){

        try{
            var endereco = req.body;
            var result = await EnderecoService.update(endereco,req.user.id);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Update Endereco",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }
    }

    static async getEndereco(req,res,next){
        try{
            var endereco = req.query;
            var result = await EnderecoService.get(endereco,req.user.id);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Get Endereco",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }

    }
}

module.exports={EnderecoController}