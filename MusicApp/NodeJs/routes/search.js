const express = require('express')
const router = express.Router()
const searchController = require('../controllers/SearchController')

router.get('/', searchController.get)
router.post('/', searchController.post)
router.post('/theloai', searchController.theLoai)
module.exports = router;