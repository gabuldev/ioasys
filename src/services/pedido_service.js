const { PedidoRepo } = require("../repositors/pedido_repo");
const { Pedido } = require("../models/pedido");
const { Response } = require("../models/response");
//const validator = require("../validators/pedido_validators");

class PedidoService {
  static async create(body) {
    var pedido = body;
    //Validate in JOI
    var validate =  true;//validator.insert(pedido);
    var repo;
    var response;

    if (validate == true) {
        repo = new PedidoRepo(Pedido.fromJson(pedido));

        response = await repo.insert();
        console.log(response);
        if (response.insert_pedido.affected_rows > 1) {
          return new Response(201, { message: "Pedido criado com suceso!" });
        } else {
          return new Response(403, {
            message: "Não foi possível criar o seu pedido"
          });
        }
    } else {
      //ERRO DE VALIDAÇÃO NO JOI
      return new Response(400, validate.data);
    }
  }

  static async update(pedido) {
    var repo;
    var response;
    var verify;

    /*verify = await pedidoRepo.getByName(pedido.name);
    if (verify.pedido.length == 0) {
      repo = new pedidoRepo(pedido.fromJson(pedido));
      response = await repo.update();
      console.log(response)
    } else {
      return new Response(403, { message: "Nome já utilizado, tente outro!" });
    }*/
    repo = new PedidoRepo(Pedido.fromJson(pedido));
    response = await repo.update();

    if (response.update_pedido.affected_rows > 0) {
      return new Response(200, {
        message: "Pedido atualizada com sucesso!"
      });
    } else {
      return new Response(401, {
        message: "Não foi possível atualizar o pedido"
      });
    }
  }

  static async get(pedido) {
    var response;
/*
    if (pedido.name != null && pedido.id == null){
      console.log("1");
      response = await pedidoRepo.getByName(pedido.name);
    }
    else if (pedido.id != null && pedido.name == null){
      console.log("2");
      response = await pedidoRepo.getById(pedido.id);
    }
    else {
      console.log("3");
      response = await pedidoRepo.getAll();
    }*/

    response = await PedidoRepo.getAll(pedido.userId);

    if (response == null)
      return new Response(404, { message: "Nenhum pedido encontrado!" });
    else
      return new Response(
        200,
        response.pedido.map(item => Pedido.fromGraphQL(item))
      );
  }
}

module.exports = { PedidoService };
