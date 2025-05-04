import express from "express";

export const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, express");
});

// Get All Products
app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];
  res.status(200).json({ products });
});

// Get a Single Product
app.get("/api/products/:id", (req, res) => {
  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ product });
});

// Create a New Product
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = Date.now();
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
