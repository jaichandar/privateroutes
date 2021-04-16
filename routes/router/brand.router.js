const express = require('express')
const router = express.Router()
const brand_controller = require('../../controller/brand.controller')
const Auth = require('../../verifyToken')

router.get('/getall',Auth,brand_controller.getAll)
router.get('/getall/:id',brand_controller.getById)
router.post('/create',brand_controller.create)
router.put('/update/:id',brand_controller.updateId)
router.delete('/delete/:id',brand_controller.deleteId)


module.exports = router