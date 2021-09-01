module.exports = app => {
    const product = require("../controllers/product.controller.js");

    app.post("/product/:scid", product.create);
    app.get("/product/:pid", product.findById);
    app.put("/product/:pid", product.updateProduct);
    app.delete("/product/:pid", product.deleteProduct);
    
};