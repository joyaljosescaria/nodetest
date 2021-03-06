const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/category.routes.js")(app);
require("./app/routes/subcat.routes.js")(app);
require("./app/routes/product.routes.js")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port 3000.");
});