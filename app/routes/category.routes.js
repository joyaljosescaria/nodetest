module.exports = app => {
    const category = require("../controllers/category.controller.js");

    app.post("/category", category.create);
    app.get("/category/:categoryId/", category.findById);
    app.get("/category", category.getAll);
    app.put("/category/:categoryId", category.updateCategory);
    app.delete("/category/:categoryId", category.deleteCategory);
};