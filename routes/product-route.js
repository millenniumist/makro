const express = require('express');
const router = express.Router()
const productController = require('../controllers/product-controller')

router.get('/', productController.getAllProducts)
router.post('/create', productController.createProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router