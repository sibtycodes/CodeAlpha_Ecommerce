const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const port = 5000;
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 8,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  itemsLeft: Number,
  image: String,
  quantity: Number,
});
const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: String,
      quantity: Number,
      image: String,
    },
  ],
  totalPrice: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://sibtycodes:${process.env.PASSWORD}@cluster0.bo3u69t.mongodb.net/sibtyecommerce?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(async () => {
    console.log("Connected to MongoDB");
    // console.log(await Product.find())
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ... your routes logic

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

// Create/Add a new product
app.post("/products", async (req, res) => {
  try {
    // const prod = req.body;
    // console.log(prod,"Post Product");
    // res.status(201).json(prod);

    const newProduct = new Product(req.body); // Assuming product data is in the request body
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating product");
  }
});

app.post("/confirmOrder", async (req, res) => {
  const  orderDetails  = req.body;
  // console.log(orderDetails)
  console.log(orderDetails);

  try {
    const order = await Order.create(orderDetails);
    res.send(order);
  } catch (error) {
    res.status(500).json({ error });
  }

 
  
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(process.env.PASSWORD);
});
