const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oumcp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productsCollection = client.db("toolsManufacturer").collection("products");
    const reviewsCollection = client.db("toolsManufacturer").collection("reviews");
    const ordersCollection = client.db("toolsManufacturer").collection("orders");

    //load all products from mongodb
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    //load single data from mongodb using _id
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productsCollection.findOne(query);
      res.send(product);
    });

    //load all review form mongodb
    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewsCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    //send order data in mongodb
    app.post('/order', async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.send(result)
    })

    //load order by email
    app.get('/order', async (req, res) => {
      const email = req.query.email;
      const query = { orderEmail: email };
      const orders = await ordersCollection.find(query).toArray();
      res.send(orders);
    })

  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("From tools manufacture");
});

app.listen(port, () => {
  console.log(`tools manufacture App listening on port ${port}`);
});
