const express = require("express");
const { products } = require("./data");
const app = express();

console.log("Express Tutorial");

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const productID = parseInt(req.params.productID);
  const singleProduct = products.find((product) => product.id === productID);
  if (!singleProduct) {
    return res.status(404).send({ message: " That product was not found" });
  }
  return res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, regex, maxPrice } = req.query;
  let sortedProducts = [...products];

  if (search) {
    if (regex === "true") {
      const regExPattern = new RegExp(search, "i");
      sortedProducts = sortedProducts.filter((product) =>
        regExPattern.test(product.name)
      );
    } else {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
  }

  if (maxPrice) {
    sortedProducts = sortedProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ message: "No products matched your search" });
  }
  return res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Define logger middleware function
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().getFullYear();
  console.log(method, url, date);
  next();
};

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
