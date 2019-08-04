const { ProdutoRepo } = require("../repositors/produto_repo");
const { Produto } = require("../models/produto");
const { Response } = require("../models/response");
const validator = require("../validators/produto_validators");

class ProdutoService {
  static async create(body) {
    var produto = body;
    //Validate in JOI
    var validate = validator.insert(produto);
    console.log(validate);
    //Verify name
    var verify;
    var repo;
    var response;

    if (validate.value == true) {
      verify = await ProdutoRepo.getByName(produto.name);
      if (verify.produto.length == 0) {
        repo = new ProdutoRepo(Produto.fromJson(produto));

        response = await repo.insert();
        if (response.insert_produto.affected_rows == 1) {
          return new Response(201, { message: "produto criado com suceso!" });
        } else {
          return new Response(403, {
            message: "Não foi possível criar a produto"
          });
        }
      } else {
        return new Response(401, {
          message: "Uma produto já existe com esse nome!"
        });
      }
    } else {
      //ERRO DE VALIDAÇÃO NO JOI
      return new Response(400, validate.data);
    }
  }

  static async update(produto) {
    var repo;
    var response;
    var verify;

    verify = await ProdutoRepo.getByName(produto.name);
    if (verify.produto.length == 0) {
      repo = new ProdutoRepo(Produto.fromJson(produto));
      response = await repo.update();
      console.log(response)
    } else {
      return new Response(403, { message: "Nome já utilizado, tente outro!" });
    }

    if (response.update_produto.affected_rows > 0) {
      return new Response(200, {
        message: "Produto atualizado com sucesso!"
      });
    } else {
      return new Response(401, {
        message: "Não foi possível atualizar a produto"
      });
    }
  }

  static async get(produto) {
    var response;

    if (produto.name != null && produto.id == null && produto.categoria == null){
      console.log("1");
      response = await ProdutoRepo.getSearchName(produto.name);
    }
    else if ( produto.categoria != null  && produto.id == null && produto.name == null ){
      console.log("2");
      response = await ProdutoRepo.getByCategoria(produto.categoria);
    }
    else if (produto.id != null && produto.name == null && produto.categoria == null){
      console.log("3");
      response = await ProdutoRepo.getById(produto.id);
    }
    else {
      console.log("4");
      response = await ProdutoRepo.getAll();
    }

    if (response == null)
      return new Response(404, { message: "Nenhuma produto encontrado!" });
    else{
      if(response.produto.length == 0){
        return new Response(404, { message: "Nenhuma produto encontrado!" });
      }
      else{
        return new Response(
          200,
          response.produto.map(item => Produto.fromGraphQL(item))
        );
      }
    }
      
  }
}

module.exports = { ProdutoService };
