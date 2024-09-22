const express = require('express');
const prisma = require('../config/prisma');
const multer = require('multer');
const { create } = require('domain');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });


exports.getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ products });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, detail, categoryId, length, width, height, weight } = req.body;
    
    const imageUrl = req.file ? req.file.path : null;
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        detail,
        categoryId: parseInt(categoryId),
        length,
        width,
        height,
        weight,
        Product_Image: {
          
    
        }
      },
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    createError(500, 'Failed to create product');
  }
};




exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);


    await prisma.product_Image.deleteMany({
      where: { productId: productId }
    });

    const deleteProduct = await prisma.product.delete({
      where: { id: productId }
    });

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error.code === 'P2003') { // Prisma's error code for foreign key constraint failures
      return res.status(400).json({ message: "Cannot delete product, it has related records" });
    }
    next(error);
  }
};
