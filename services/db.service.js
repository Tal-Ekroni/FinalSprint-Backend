const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const config = require("../config");

module.exports = {
  getCollection,
};

// Database Name
const dbName = "AnyGo";
var dbConn = null;
const dbNameCopy = "anyGoDB";
var dbConnCopy = null;
getData();
async function getData() {
  try {
    const staysCol = await getCollection("stay");
    const stays = await staysCol.find({}).toArray();

    const usersCol = await getCollection("user");
    const users = await usersCol.find({}).toArray();

    const ordersCol = await getCollection("order");
    const orders = await ordersCol.find({}).toArray();

    const usersa = users.map((u) => {
      const res = {};
      Object.keys(u)
        .filter((k) => k !== "_id")
        .forEach((k) => {
          res[k] = u[k];
        });
      return res;
    });

    const ordersa = orders.map((u) => {
      const res = {};
      Object.keys(u)
        .filter((k) => k !== "_id")
        .forEach((k) => {
          res[k] = u[k];
        });
      return res;
    });
    const staysa = stays.map((u) => {
      const res = {};
      Object.keys(u)
        .filter((k) => k !== "_id")
        .forEach((k) => {
          res[k] = u[k];
        });
      return res;
    });
    console.log('ordersa,staysa,usersa');
    const collectionU = await getCollectionCopy("user");
    const collectionS = await getCollectionCopy("stay");
    const collectionO = await getCollectionCopy("order");

    console.log('collections, ', collectionU, collectionS, collectionO);

    const addedU = await collectionU.insertMany(usersa);
    const addedS = await collectionS.insertMany(staysa);
    const addedO = await collectionO.insertMany(ordersa);
    console.log("hyo");
  } catch (err) {
    throw err;
  }
}


async function getCollectionCopy(collectionName) {
  try {
    const db = await connectCopy();
    const collection = await db.collection(collectionName);
    console.log("coll", collection);
    return collection;
  } catch (err) {
    throw err;
  }
}

async function connectCopy() {
  if (dbConnCopy) return dbConnCopy;
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://talek:Tal18Javadrift@cluster0.vhtil.mongodb.net/anyGoDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = client.db(dbNameCopy);
    dbConn = db;
    return db;
  } catch (err) {
    throw err;
  }
}

async function getCollection(collectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(collectionName);
    return collection;
  } catch (err) {
    throw err;
  }
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    throw err;
  }
}
