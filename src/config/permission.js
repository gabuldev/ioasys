class Permission {
  static verify(path, method, typeUser) {
    if (typeUser == 1) {
      //USER COMUM
      var mapPermission = {
        GET: ["/categoria", "/produto", "/endereco","/pedido"],
        PUT: ["/user", "/endereco"],
        POST: ["/endereco","/pedido"]
      };

      if (mapPermission[method].includes(path)) {
        return true;
      } else {
        return false;
      }
    }

    else if (typeUser == 10) {
      //DONO DO SISTEMA
      return true;
    }

    else{
        return false;
    }
  }
}

module.exports={Permission}