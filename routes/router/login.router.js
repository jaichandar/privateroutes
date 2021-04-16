const express = require('express')
const router = express.Router()
const Login_controller = require('../../controller/auth.controller')

router.post('/',Login_controller.Login)


module.exports = router