const Brand = require('../models/Brand.model')


module.exports.create = async(req,res)=>{
    try{
     const brand = await Brand()
     buildNewBrand(req,brand)
     let docs = await brand.save()
     res.status(201).json({
         message:'created',
         uid:docs._id
     })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}

function buildNewBrand(req,brand){
    brand.brandName = req.body.brandName || brand.brandName
    brand.brandType = req.body.brandType || brand.brandType
}

module.exports.getAll = async(req,res)=>{
    try{
     const brand = await Brand.find().select('brandName')
     res.status(200).json({
         message:'success',
         value:brand
     })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}


module.exports.getById = async(req,res)=>{
    try{
       const brand = await Brand.findById({_id:req.params.id})
       res.status(200).json({
           message:'success',
           value:brand
       })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}


module.exports.updateId = async(req,res)=>{
    try{
      const brand = await Brand.findByIdAndUpdate({_id:req.params.id})
      buildNewBrand(req,brand)
      let docs = await brand.save()
      res.status(200).json({
          message:'success',
          value:docs
      })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}

module.exports.deleteId = async(req,res)=>{
    try{
      const brand = await Brand.deleteOne({_id:req.params.id})
      res.status(200).json({
          message:'success',
          value:'deleted'
      })
    }catch(err){
        res.status(400).json({
            message:'failure',
            error:err
        })
    }
}