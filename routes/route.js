const express = require('express')
const api = express.Router()
const router = require('./router')

api.use('/register',router.register_controller)
api.use('/login',router.login_controller)
api.use('/brand',router.brand_controller)






module.exports = api