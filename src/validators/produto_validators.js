const Joi = require("@hapi/joi");

module.exports={


    insert(body){
  
        var schema = Joi.object().keys({
            name: Joi.string().max(30).min(1).required(),
            preco: Joi.number().required(),
            catId :Joi.number().required(),
            photo: Joi.string().required(),
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