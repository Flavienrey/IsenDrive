const express = require('express');
const url = require("url");

const Category = require("../model/Category");
const Product = require("../model/Product");
const {ObjectId} = require("mongodb");

const router = express.Router();

router.get('/new', async (req, res) => {
    res.render('productForm', {
        title: 'Créer un produit',
        categories: await Category.getAll()
    });
});

router.get('/', async (req, res) => {
    res.render('products', {
        title: 'Ensemble des produits',
        products: await Product.getAll()
    });
});

router.get('/:id', async (req, res) => {

    let product = await Product.getById(req.params.id);
    let category = await Category.getById(product.categoryId);

    category = category[0];

    res.render('product', {
        title: product.name,
        product: product,
        category: category
    });
});

module.exports = router;