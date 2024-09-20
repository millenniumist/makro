const express = require('express');
const router = express.router()
const productController = require('../controllers/product-controller')

router.get('/', productController.getAllProducts)
router.post('/create', productController.createProduct)