
class Categoria {
  constructor(
   id,
   name
  ) {
    this.id = id;
    this.name = name;
  }

  toJson() {
    return {
      name: this.name,
      id: this.id
    };
  }

  static fromJson(data) {
    return new Categoria(
      data.id,
      data.name
    );
  }


  static fromGraphQL(data) {
    return {
      id: data.cat_id,
      name: data.cat_name,
    };
  }

  toGraphQL() {
    return `{ 
        cat_name: "${this.name}", 
      }`;
  }

  toGraphQLUpdate() {
    var mapToString = "";
    if (this.name != null)
      mapToString += `cat_name: "${this.name}",`;
    return `{
       ${mapToString}
      }`;
  }

  static getAll() {
    return `{
        categoria{
          cat_id
          cat_name
        }
      }
      `;
  } 

  static getByName(name) {
    return `{
        categoria (where: {cat_name: {_eq: "${name}"}}) {
          cat_id
          cat_name
        }
      }
      `;
  }

  static getSearchName(name) {
    return `{
        categoria (where: {cat_name: {_like: "%${name}%"}}) {
          cat_id
          cat_name
        }
      }
      `;
  }

  static getById(id) {
    return `{
        categoria(where: {cat_id: {_eq: "${id}"}}) {
          cat_name
        }
      }
      `;
  }


  insert() {
    return `mutation {
          insert_categoria(objects: ${this.toGraphQL()}) {
            affected_rows
          }
        }`;
  }

  update() {
    return `mutation {
          update_categoria(where: {cat_id: {_eq:${
            this.id
          }}}, _set: ${this.toGraphQLUpdate()}) {
            affected_rows
          }
        }
          `;
  }
}

module.exports = { Categoria };
