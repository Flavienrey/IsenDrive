require('dotenv').config()
const Product = require("./Product.js")
const debug = require('debug')('mongo');
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = process.env.DB_NAME;

const Category = {

    async getById(CategoryId) {

        await client.connect();
        const db = client.db(dbName);

        console.log("Connected to mongo server");
        debug(`Connected successfully to MongoDB server: ${uri}`);

        const categoriesCollection = db.collection('categories');

        let categories = await categoriesCollection.find({_id: new ObjectId(CategoryId)}).toArray();

        await client.close();

        return categories;
    },

    async getAll() {

        await client.connect();
        const db = client.db(dbName);

        const categoriesCollection = db.collection('categories');
        const productsCollection = db.collection('products');

        let categories = await categoriesCollection.find().toArray()

        for (let category of categories) {
            let products = await productsCollection.find({categoryId: new ObjectId(category._id)}).toArray();
            category['size'] = products.length;
        }

        await client.close();

        return categories;
    },

    async insert(category){
        await client.connect();
        const db = client.db(dbName);

        const categoriesCollection = db.collection('categories');

        const retour = await categoriesCollection.insertOne({name: category});

        await client.close();

        return retour;
    },

    async delete(id){
        await client.connect();
        const db = client.db(dbName);

        const categoriesCollection = db.collection('categories');

        await categoriesCollection.deleteOne({_id: new ObjectId(id)});

        await client.close();
    }
}

module.exports = Category;
