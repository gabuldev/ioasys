const {CategoriaService} = require("../services/categoria_service");


class CategoriaController{


    static async createCategoria(req,res,next){
        try{
        var result = await CategoriaService.create(req.body);
        return res.send(result.status,result.message);
        }catch(e){
            console.log("ERROR: Create Categoria",e)
            return res.send(500,{"message": "Erro interno servidor"}); 
        }
    }


    static async updateCategoria(req,res,next){

        try{
            var categoria = req.body;
            var result = await CategoriaService.update(categoria);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Update Categoria",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }
    }

    static async getCategoria(req,res,next){
        try{
            var categoria = req.query;
            var result = await CategoriaService.get(categoria);
            return res.send(result.status,result.message);

            
        }catch(e){
            console.log("ERROR: Get Categoria",e);
            return res.send(500,{"message":"Erro interno no servidor!"});
        }

    }
}

module.exports={CategoriaController}