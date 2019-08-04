const {PedidoProduto} = require("../models/pedido_produto");
class Pedido {
    constructor(id, obs,dataInicio,dataFinalizou,isEntrega,dataEntrega,dataSaiu,senha,idEndereco,preco,troco,status,tipoPagamento,userId,produtos) {
      this.id = id;
      this.obs = obs;
      this.dataInicio = dataInicio;
      this.dataFinalizou = dataFinalizou;
      this.isEntrega = isEntrega;
      this.dataEntrega = dataEntrega;
      this.dataSaiu = dataSaiu;
      this.senha = senha;
      this.idEndereco = idEndereco;
      this.preco = preco;
      this.troco = troco;
      this.status = status;
      this.tipoPagamento = tipoPagamento;
      this.userId = userId;
      this.produtos = produtos;
    }
  
    toJson() {
      return {
        id: this.id,
        obs : this.obs,
        dataInicio : this.dataInicio,
        dataFinalizou : this.dataFinalizou,
        isEntrega : this.isEntrega,
        dataEntrega : this.dataEntrega,
        dataSaiu : this.dataSaiu,
        senha : this.senha,
        idEndereco : this.idEndereco,
        preco : this.preco,
        troco : this.troco,
        status : this.status,
        tipoPagamento : this.tipoPagamento,
        userId : this.userId,
        produtos: this.produtos
      };
    }
  
    static fromJson(data) {
      return new Pedido(
       data.id,
       data.obs,
       data.dataInicio,
       data.dataFinalizou,
       data.isEntrega,
       data.dataEntrega,
       data.dataSaiu,
       data.senha,
       data.idEndereco,
       data.preco,
       data.troco,
       data.status,
       data.tipoPagamento,
       data.userId,
       data.produtos.map((item) => PedidoProduto.fromJson(item))
      );
    }
  
    static fromGraphQL(data) {
      return {
        id: data.ped_id,
        obs : data.ped_obs,
        dataInicio : data.ped_data_inicio,
        dataFinalizou : data.ped_data_finalizou,
        isEntrega : data.ped_entrega,
        dataEntrega : data.ped_data_entrega,
        dataSaiu : data.ped_data_saiu,
        senha : data.ped_senha,
        idEndereco : data.ped_id_endereco,
        preco : data.ped_preco,
        troco : data.ped_troco,
        status : data.ped_status,
        tipoPagamento : data.tpa_id,
        userId : data.usr_id,
       produtos: data.pedido_produtos.map((item) => PedidoProduto.fromGraphQL(item))
      };
    }
  
    toGraphQL() {
      return `{ 
        ped_obs : "${this.obs}",
        ped_entrega : "${this.isEntrega}",
        ped_id_endereco : "${this.idEndereco}",
        ped_preco : "${this.preco}",
        ped_troco : "${this.troco}",
        ped_status : "${this.status}",
        tpa_id : "${this.tipoPagamento}",
        usr_id : "${this.userId}",
        pedido_produtos: {
            data: 
               [ ${this.produtos.map((item) => item.toGraphQL())}]
            
        }
          }`;
    }
  
    toGraphQLUpdate() {
      var mapToString = "";
      if (this.dataFinalizou != null) mapToString += `ped_data_finalizou: "${this.dataFinalizou}",`;
      if (this.dataEntrega != null) mapToString += `ped_data_entrega: "${this.dataEntrega}",`;
      if (this.dataSaiu != null) mapToString += `ped_data_saiu: "${this.dataSaiu}",`;
      if (this.senha != null) mapToString += `ped_senha: "${this.senha}",`;
      if (this.status != null) mapToString += `ped_status: "${this.status}",`;
      return `{
           ${mapToString}
          }`;
    }
  
    static getAll(userId) {
      return `{
        pedido(where: {usr_id: {_eq: ${userId}}}) {
          ped_id
          ped_status
          ped_preco
          pedido_produtos {
            produto {
              pro_name
            }
            ppr_qtd
            ppr_obs
          }
        }
      }
          `;
    }
  /*
    static getByName(name,userId) {
      return `{
            endereco (where: {end_name: {_eq: "${name}"},usr_id: {_eq: "${userId}"}}) {
              end_bairro
              end_cep
              end_cidade
              end_complemento
              end_estado
              end_id
              end_name
              end_rua
            }
          }
          `;
    }
  
    static getSearchName(name,userId) {
      return `{
           endereco (where: {end_name: {_ilike: "%${name}%"},usr_id: {_eq: "${userId}"}}) {
              end_bairro
              end_cep
              end_cidade
              end_complemento
              end_estado
              end_id
              end_name
              end_rua
            }
          }
          `;
    }
  
    static getById(id) {
      return `{
            endereco(where: {end_id: {_eq: "${id}"}}) {
              end_bairro
              end_cep
              end_cidade
              end_complemento
              end_estado
              end_id
              end_name
              end_rua
            }
          }
          `;
    }*/
  
    insert() {
      return `mutation {
              insert_pedido(objects: ${this.toGraphQL()}) {
                affected_rows
              }
             
            }`;
    }
  
    update() {
      return `mutation {
              update_pedido(where: {end_id: {_eq:${
                this.id
              }}}, _set: ${this.toGraphQLUpdate()}) {
                affected_rows
              }
            }
              `;
    }
  }
  
  module.exports = { Pedido};
  