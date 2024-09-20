const express = require('express');
const prisma = require('../utils/prisma');
const multer = require('multer');

exports.getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ products });
};

exports.createProduct = async (req, res) => {
  const { name, price, description, image, stock, categoryId } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });
  res.json({ product });
};