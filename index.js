const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oumcp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  const productsCollection = client.db("toolsManufacturer").collection("products");

// async function run() {
//   try {
//     await client.connect();

//   }
//   finally {

//   }
// }

// run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('From tools manufacture')
})

app.listen(port, () => {
  console.log(`tools manufacture App listening on port ${port}`)
})