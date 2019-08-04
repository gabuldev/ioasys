class Endereco {
  constructor(id, name, cep, cidade, bairro, rua, complemento, estado,userId) {
    this.id = id;
    this.name = name;
    this.cep = cep;
    this.cidade = cidade;
    this.bairro = bairro;
    this.rua = rua;
    this.complemento = complemento;
    this.estado = estado;
    this.userId = userId;
  }

  toJson() {
    return {
      name: this.name,
      id: this.id,
      cep: this.cep,
      cidade: this.cidade,
      bairro: this.bairro,
      rua: this.rua,
      complemento: this.complemento,
      estado: this.estado
    };
  }

  static fromJson(data) {
    return new Endereco(
      data.id,
      data.name,
      data.cep,
      data.cidade,
      data.bairro,
      data.rua,
      data.complemento,
      data.estado,
      data.userId
    );
  }

  static fromGraphQL(data) {
    return {
      name: data.end_name,
      id: data.end_id,
      cep: data.end_cep,
      cidade: data.end_cidade,
      bairro: data.end_bairro,
      rua: data.end_rua,
      complemento: data.end_complemento,
      estado: data.end_estado,
    };
  }

  toGraphQL() {
    return `{ 
          end_name: "${this.name}",
          end_cep: "${this.cep}",
          end_cidade: "${this.cidade}",
          end_bairro: "${this.bairro}",
          end_rua: "${this.rua}",
          end_complemento: "${this.complemento}",
          end_estado: "${this.estado}",
          usr_id: "${this.userId}" 
        }`;
  }

  toGraphQLUpdate() {
    var mapToString = "";
    if (this.id != null) mapToString += `end_id: "${this.id}",`;
    if (this.name != null) mapToString += `end_name: "${this.name}",`;
    if (this.cep != null) mapToString += `end_cep: "${this.cep}",`;
    if (this.cidade != null) mapToString += `end_cidade: "${this.cidade}",`;
    if (this.bairro != null) mapToString += `end_bairro: "${this.bairro}",`;
    if (this.rua != null) mapToString += `end_rua: "${this.rua}",`;
    if (this.complemento != null) mapToString += `end_complemento: "${this.complemento}",`;
    if (this.estado != null) mapToString += `end_estado: "${this.estado}",`;
    return `{
         ${mapToString}
        }`;
  }

  static getAll(userId) {
    return `{
          endereco(where: {usr_id: {_eq: "${userId}"}}){
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
  }

  insert() {
    return `mutation {
            insert_endereco(objects: ${this.toGraphQL()}) {
              affected_rows
            }
          }`;
  }

  update() {
    return `mutation {
            update_endereco(where: {end_id: {_eq:${
              this.id
            }}}, _set: ${this.toGraphQLUpdate()}) {
              affected_rows
            }
          }
            `;
  }
}

module.exports = { Endereco };
