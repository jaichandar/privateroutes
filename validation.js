const Joi = require('joi')

module.exports.RegisterValidation = (value)=>{
    const schema = Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    })
    return schema.validate(value)
}

module.exports.LoginValidation = (value)=>{
    const schema = Joi.object({
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    })
    return schema.validate(value)
}
