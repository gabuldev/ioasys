const Joi = require("@hapi/joi");

module.exports={


    insert(body){
  
        var schema = Joi.object().keys({
            name: Joi.string().max(50).min(1).required(),
            cep: Joi.string().max(10).min(10).required(),
            cidade: Joi.string().max(100).min(1).required(),
            complemento: Joi.string().max(150).min(0),
            estado: Joi.string().max(2).min(2).required(),
            rua: Joi.string().max(100).min(1).required(),
            bairro: Joi.string().max(100).min(1).required(),
        });

        const result = Joi.validate(body,schema);
        if(result.error == null)
            return {
                value : true,
                data : {message : ""}
            };
        else
            return {
                valeu : false,
                data : {message : result.error.message}
            };;    

    }


}