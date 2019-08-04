const Joi = require("@hapi/joi");

module.exports={


    insert(body){
  
        var schema = Joi.object().keys({
            name: Joi.string().max(30).min(1).required(),
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