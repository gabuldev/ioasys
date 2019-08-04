
class Produto {
    constructor(
     id,
     name,
     preco,
     catId,
     photo
    ) {
      this.id = id;
      this.name = name;
      this.preco = preco;
      this.catId = catId;
      this.photo = photo;
    }
  
    toJson() {
      return {
        id: this.id,
        name: this.name,
        preco: this.preco,
        catId: this.catId,
        photo: this.photo
      };
    }
  
    static fromJson(data) {
      return new Produto(
        data.id,
        data.name,
        data.preco,
        data.catId,
        data.photo
      );
    }
  
  
    static fromGraphQL(data) {
      return {
        id: data.pro_id,
        name: data.pro_name,
        preco: data.pro_preco,
        catId: data.cat_id,
        photo: data.pro_photo
      };
    }
  
    toGraphQL() {
      return `{ 
          pro_name: "${this.name}", 
          pro_preco: ${this.preco}, 
          cat_id: ${this.catId}, 
          pro_photo: "${this.photo}", 
        }`;
    }
  
    toGraphQLUpdate() {
      var mapToString = "";
      if (this.name != null)
        mapToString += `pro_name: "${this.name}",`;
        if (this.preco != null)
        mapToString += `pro_preco: "${this.preco}",`;
        if (this.photo != null)
        mapToString += `pro_photo: "${this.photo}",`;
        if (this.catId != null)
        mapToString += `cat_id: "${this.catId}",`;
      return `{
         ${mapToString}
        }`;
    }
  
    static getAll() {
      return `{
          produto{
            pro_id
            pro_name
            pro_photo
            pro_preco
            cat_id
          }
        }
        `;
    } 
  
    static getByName(name) {
      return `{
          produto (where: {pro_name: {_eq: "${name}"}}) {
            pro_id
            pro_name
            pro_photo
            pro_preco
            cat_id
          }
        }
        `;
    }
  
    static getSearchName(name) {
      return `{
          produto (where: {pro_name: {_like: "%${name}%"}}) {
            pro_id
            pro_name
            pro_photo
            pro_preco
            cat_id
          }
        }
        `;
    }
  
    static getById(id) {
      return `{
          produto(where: {pro_id: {_eq: "${id}"}}) {
            pro_id
            pro_name
            pro_photo
            pro_preco
            cat_id
          }
        }
        `;
    }

    static getByCategoria(id) {
      return `{
          produto(where: {cat_id: {_eq: "${id}"}}) {
            pro_id
            pro_name
            pro_photo
            pro_preco
            cat_id
          }
        }
        `;
    }
  
  
    insert() {
      return `mutation {
            insert_produto(objects: ${this.toGraphQL()}) {
              affected_rows
            }
          }`;
    }
  
    update() {
      return `mutation {
            update_produto(where: {pro_id: {_eq:${
              this.id
            }}}, _set: ${this.toGraphQLUpdate()}) {
              affected_rows
            }
          }
            `;
    }
  }
  
  module.exports = { Produto };
  