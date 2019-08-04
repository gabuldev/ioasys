const { EnderecoRepo } = require("../repositors/endereco_repo");
const { Endereco } = require("../models/endereco");
const { Response } = require("../models/response");
const validator = require("../validators/endereco_validators");

class EnderecoService {
  static async create(body,userId) {
    var endereco = body;
    //Validate in JOI
    var validate = validator.insert(endereco);
    console.log(validate);
    //Verify name
    var verify;
    var repo;
    var response;

    if (validate.value == true) {
      verify = await EnderecoRepo.getSearchName(endereco.name,userId);
      if (verify.endereco.length == 0) {
        endereco.userId = userId;
        repo = new EnderecoRepo(Endereco.fromJson(endereco));

        response = await repo.insert();
        if (response.insert_endereco.affected_rows == 1) {
          return new Response(201, { message: "Endereço criado com suceso!" });
        } else {
          return new Response(403, {
            message: "Não foi possível criar o endereço"
          });
        }
      } else {
        return new Response(401, {
          message: "Um endereço já existe com esse nome!"
        });
      }
    } else {
      //ERRO DE VALIDAÇÃO NO JOI
      return new Response(400, validate.data);
    }
  }

  static async update(endereco,userId) {
    var repo;
    var response;
    var verify;

    verify = await EnderecoRepo.getByName(endereco.name,userId);
    if (verify.endereco.length == 0) {
      repo = new EnderecoRepo(Endereco.fromJson(endereco));
      response = await repo.update();
      console.log(response)
    } else {
      return new Response(403, { message: "Nome já utilizado, tente outro!" });
    }

    if (response.update_endereco.affected_rows > 0) {
      return new Response(200, {
        message: "Endereco atualizado com sucesso!"
      });
    } else {
      return new Response(401, {
        message: "Não foi possível atualizar  o endereço"
      });
    }
  }

  static async get(endereco,userId) {
    var response;

    if (endereco.name != null && endereco.id == null){
      console.log("1");
      response = await EnderecoRepo.getSearchName(endereco.name,userId);
    }
    else if (endereco.id != null && endereco.name == null){
      console.log("2");
      response = await EnderecoRepo.getById(endereco.id);
    }
    else {
      console.log("3");
      response = await EnderecoRepo.getAll(userId);
    }

    if (response == null)
      return new Response(404, { message: "Nenhum endereço cadastrado!" });
    else
      return new Response(
        200,
        response.endereco.map(item =>Endereco.fromGraphQL(item))
      );
  }
}

module.exports = { EnderecoService };
