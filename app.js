require('dotenv').config()
const debug = require('debug')('http');

const path = require("path");
const {MongoClient} = require('mongodb');

const express = require('express');
const app = express();

const morgan = require('morgan')
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

const routesForIndexes = require(path.join(__dirname,"routes/index.js"));
const routesForCategories = require(path.join(__dirname,"routes/categories.js"));
const routesForProducts = require(path.join(__dirname,"routes/products.js"));

app.use(routesForIndexes);
app.use("/categories", routesForCategories);
app.use("/products", routesForProducts);

app.listen(process.env.PORT, () => {
    debug('HTTP server listening on port :', process.env.PORT);
});
