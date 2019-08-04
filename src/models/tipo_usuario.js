
class TipoUsuario{

    constructor(nome){
        this.nome = nome;
        this.id = id;
    }

    toJson(){
        return {
            "nome" : this.nome,
            "id" : this.nome
        }
    }

   get(id,nome){

        if(id == null && nome == null){
            return `
            {
                tipo_usuario {
                  tus_nome
                  tus_id
                }
              }`
        }else{
            if(id !=null && nome == null){
                return `
                {
                    tipo_usuario(where: {tus_id: {_eq: ${id}}}) {
                      tus_nome
                      tus_id
                    }
                  }
                  
                `
            }
            if(id == null && nome != null){
                return `
                {
                    tipo_usuario(where: {tus_nome: {_eq: ${nome}}}) {
                      tus_nome
                      tus_id
                    }
                  }
                  
                `
            }
        }

        

    }

 insert(nome){
        return `mutation {
            insert_tipo_usuario(objects: {tus_nome: ${nome}}) {
              affected_rows
            }
          }`
    }

  delete(id){
        return `
        mutation {
            delete_tipo_usuario(where: {tus_id: {_eq: ${id}}}) {
              affected_rows
            }
          }    
        `
    }

   update(id,nome){
        return `mutation {
            update_tipo_usuario(where: {tus_id: {_eq: ${id}}}, _set: {tus_nome: ${nome}}) {
              affected_rows
            }
          }
          `
    }

}

module.exports = {TipoUsuario}