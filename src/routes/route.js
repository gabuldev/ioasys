const { Security } = require("../config/security");

//  MY CONTROLLERS

const { UsuarioController } = require("../controllers/usuario_controller");
const { CategoriaController } = require("../controllers/categoria_controller");
const { ProdutoController } = require("../controllers/produto_controller");
const { EnderecoController } = require("../controllers/endereco_controller");
const {PedidoController} = require("../controllers/pedido_controller");

class Route {
  static init(server) {
    //ROUTES - USUARIO
    server.post("/user", UsuarioController.createAccount);
    server.post("/sign_in", UsuarioController.login, Security.signIn);
  

    //ROUTES - CATEGORIA
    server.get("/categoria", CategoriaController.getCategoria);
    server.post("/categoria", CategoriaController.createCategoria);
    server.put("/categoria", CategoriaController.updateCategoria);

    //ROUTES - PRODUTO

    server.get("/produto", ProdutoController.getProduto);
    server.post("/produto", ProdutoController.createProduto);
    server.put("/produto", ProdutoController.updateProduto);

    //ROUTES - ENDERECO

    server.get("/endereco", Security.verifyJWT, EnderecoController.getEndereco);
    server.post(
      "/endereco",
      Security.verifyJWT,
      EnderecoController.createEndereco
    );
    server.put(
      "/endereco",
      Security.verifyJWT,
      EnderecoController.updateEndereco
    );

    //ROUTES - PEDIDO
    server.post("/pedido",Security.verifyJWT,PedidoController.createPedido);
    server.get("/pedido",Security.verifyJWT,PedidoController.getPedido);
  }
}

module.exports = { Route };
