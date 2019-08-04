const {Permission} = require("../config/permission");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Security {

  static verifyJWT(req, res, next) {
    var token = req.headers["authorization"];
    var permission;
    if (!token)
      return res.send(400, { message: "O token não foi enviado no header!" });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      //500
      if (err)
        return res.send(401, {
          auth: false,
          message: "Token negado, tente realizar login novamente!"
        });
      // se tudo estiver ok, salva no request para uso posterior
      else {
        req.user = decoded.user;
        permission = Permission.verify(req.url,req.method,req.user.tipousuario);
        if(permission){
   
        next();
        }
        else{
          return res.send(401, { message: "Usuário não tem permissão para acessar esse recurso!" });
        }
      }
    });
  }

  static signIn(req,res,next,){
    var token = jwt.sign({"user":req.user},process.env.SECRET,{
      expiresIn : 216000//24h
    })
    res.header("access-token",token)
    return res.send(200,{
      investor:req.user,
      success:true,
      enterprise:null
    });

  }

  static singInChangePassword(user){
    console.log(user);
    var token = jwt.sign({"user":user},process.env.SECRET,{
      expiresIn : 1800//30 min
    });
    return token;
  }

  




}

module.exports={Security}
