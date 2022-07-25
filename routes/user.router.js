const express = require('express')
const userControler = require('../controller/userController')
const router = express.Router()

router.get('/', userControler.index)


module.exports = router