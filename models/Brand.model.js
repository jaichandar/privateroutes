const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brandName:{type:String,required:true},
    brandType:{type:String,required:true},
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Model = mongoose.model('brand',brandSchema)
module.exports = Model
