class PedidoProduto {
  constructor(id, idProduto, idPedido, obs, qtd, adicional) {
    this.id = id;
    this.obs = obs;
    this.idProduto = idProduto;
    this.idPedido = idPedido;
    this.qtd = qtd;
    this.adicional = adicional;
  }

  toJson() {
    return {
      id: this.id,
      obs: this.obs,
      idProduto: this.idProduto,
      idPedido: this.idPedido,
      qtd: this.qtd,
      adicional: this.adicional
    };
  }

  static fromJson(data) {
    return new PedidoProduto(
        data.id,
        data.idProduto,
        data.idPedido,
        data.obs,
        data.qtd,
        data.adicional,
    );
  }

  static fromGraphQL(data) {
    return {
      name: data.produto.pro_name,
      qtd: data.ppr_qtd,
      obs: data.ppr_obs,
     
    };
  }

  toGraphQL() {
    return `{ 
        ppr_obs: "${this.obs}",
        pro_id: "${this.idProduto}",
        ppr_qtd: "${this.qtd}",
        ppr_adicional: "${this.adicional}"
          }`;
  }
}

module.exports = { PedidoProduto };
