const express = require('express');
const url = require("url");
const bodyParser = require('body-parser');

const Category = require("../model/Category");
const Product = require("../model/Product");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/post',  async (req, res) => {

    const successful = await Category.insert(req.body.name);
    const urlRedirection = '/categories/'+ successful.insertedId;

    res.redirect(urlRedirection);
});

router.get('/new', async (req, res) => {
    res.render('categoryForm', {
        title: 'Créer un rayon'
    });
});

router.get('/',  async (req, res) => {
    res.render('categories', {
        title: 'Rayons',
        categories: await Category.getAll()
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    let category = await Category.getById(id);
    category = category[0];

    await res.render('category', {
        title: "Produits du rayon " + category['name'] ,
        products: await Product.getByCategory(id),
        categoryId: category._id
    });
});

router.get('/:id/delete', async (req, res) => {
    const id = req.params.id;

    await Category.delete(id)

    res.redirect('/categories');
});

module.exports = router;