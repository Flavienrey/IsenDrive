const { MongoClient, ObjectID, ObjectId} = require('mongodb');

const debug = require('debug')('mongo');

const url = process.env.MONGODB_URI;
const dbName = "isen_drive";
const client = new MongoClient(url);

async function getByCategory(CategoryId) {

    await client.connect();
    const db = client.db(dbName);

    debug(`Connected successfully to MongoDB server: ${url}`);

    const productsCollection = db.collection('products');

    return await productsCollection.find({categoryId: CategoryId}).toArray();
}

async function getById(CategoryId) {
    await client.connect();
    const db = client.db(dbName);

    debug(`Connected successfully to MongoDB server: ${url}`);

    const categoriesCollection = db.collection('categories');

    let categories = await categoriesCollection.find({_id: CategoryId}).toArray();

    await client.close();

    return categories;
}


getById(new ObjectId('6373697c836cfd6b5a483ffd'))
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

