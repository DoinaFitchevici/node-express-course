const express = require("express");
const cookieParser = require("cookie-parser");
const { products, people } = require("./data");

const app = express();

console.log("Express Tutorial");

app.use(express.static("./public"));
//Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Parse cookies
app.use(cookieParser());

// Middleware for authentication
const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

// Route to handle login
app.post("/logon", (req, res) => {
  if (req.body.name) {
    res.cookie("name", req.body.name);
    res.status(201).json({ message: `Hello, ${req.body.name}!` });
  } else {
    res.status(400).json({ message: "Name is required" });
  }
});

// Route to handle logout
app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: "You have been logged off" });
});

// Route to test authentication
app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
});

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

const peopleRouter = require("./routes/people");

app.use("/api/v1/people", peopleRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Define logger middleware function
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});

app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
