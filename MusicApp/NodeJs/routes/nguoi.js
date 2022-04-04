const express = require('express')
const router = express.Router()
const nguoiController = require('../controllers/nguoiController')

router.get('/', nguoiController.index)

module.exports = router;