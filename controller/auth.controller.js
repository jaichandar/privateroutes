const Register = require('../models/Register')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {RegisterValidation,LoginValidation} = require('../validation')

module.exports.register = async(req,res)=>{
    try{
      const {error} = RegisterValidation(req.body)
      if(error){
          return res.status(400).json({
              message:'failure',
              error:error.details[0].message
          })
      }

      const emailExist = await Register.findOne({email:req.body.email})
      if(emailExist){
          return res.status(400).json({
              message:'failure',
              error:'email already exist'
          })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(req.body.password,salt)

      const register = await Register({
          name:req.body.name,
          email:req.body.email,
          password:hashPassword
      })
      const result = await register.save()
      res.status(201).json({
          message:'created',
          uid:result._id
      })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}


module.exports.Login = async(req,res)=>{
    try{
      const {error} = LoginValidation(req.body)
          if(error){
              return res.status(400).json({
                  message:'failure',
                  error:error.details[0].message
              })
          }
          const user = await Register.findOne({email:req.body.email})
          if(!user){
              return res.status(404).json({
                  message:'failure',
                  value:'invalid credentials'
              })
          }

          const comparePassword = await bcrypt.compare(req.body.password,user.password)
          if(!comparePassword){
              return res.status(400).json({
                  message:'failure',
                  value:'invalid credentials'
              })
          }
        const payload = {
            id:user.id
        }
        const Signature = jwt.sign(payload,process.env.jwtsecret,{
            expiresIn:'5d'
        })
        res.header('auth-token',Signature).json({
            message:'success',
            token:Signature
        })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}
