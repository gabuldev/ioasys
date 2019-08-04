const { CategoriaRepo } = require("../repositors/categoria_repo");
const { Categoria } = require("../models/categoria");
const { Response } = require("../models/response");
const validator = require("../validators/categoria_validators");

class CategoriaService {
  static async create(body) {
    var categoria = body;
    //Validate in JOI
    var validate = validator.insert(categoria);
    console.log(validate);
    //Verify name
    var verify;
    var repo;
    var response;

    if (validate.value == true) {
      verify = await CategoriaRepo.getSearchName(categoria.name);
      if (verify.categoria.length == 0) {
        repo = new CategoriaRepo(Categoria.fromJson(categoria));

        response = await repo.insert();
        if (response.insert_categoria.affected_rows == 1) {
          return new Response(201, { message: "Categoria criada com suceso!" });
        } else {
          return new Response(403, {
            message: "Não foi possível criar a categoria"
          });
        }
      } else {
        return new Response(401, {
          message: "Uma categoria já existe com esse nome!"
        });
      }
    } else {
      //ERRO DE VALIDAÇÃO NO JOI
      return new Response(400, validate.data);
    }
  }

  static async update(categoria) {
    var repo;
    var response;
    var verify;

    verify = await CategoriaRepo.getByName(categoria.name);
    if (verify.categoria.length == 0) {
      repo = new CategoriaRepo(Categoria.fromJson(categoria));
      response = await repo.update();
      console.log(response)
    } else {
      return new Response(403, { message: "Nome já utilizado, tente outro!" });
    }

    if (response.update_categoria.affected_rows > 0) {
      return new Response(200, {
        message: "Categoria atualizada com sucesso!"
      });
    } else {
      return new Response(401, {
        message: "Não foi possível atualizar a categoria"
      });
    }
  }

  static async get(categoria) {
    var response;

    if (categoria.name != null && categoria.id == null){
      console.log("1");
      response = await CategoriaRepo.getByName(categoria.name);
    }
    else if (categoria.id != null && categoria.name == null){
      console.log("2");
      response = await CategoriaRepo.getById(categoria.id);
    }
    else {
      console.log("3");
      response = await CategoriaRepo.getAll();
    }

    if (response == null)
      return new Response(404, { message: "Nenhuma categoria encontrada!" });
    else
      return new Response(
        200,
        response.categoria.map(item => Categoria.fromGraphQL(item))
      );
  }
}

module.exports = { CategoriaService };
