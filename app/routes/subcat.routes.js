module.exports = app => {
    const scategory = require("../controllers/subcat.controller.js");

    app.post("/scategory/:mcid", scategory.create);
    app.get("/scategory/:mcid/:categoryId", scategory.findOne);
    app.put("/scategory/:mcid/:categoryId", scategory.updateOne);
    app.delete("/scategory/:mcid/:categoryId", scategory.deleteOne);
    
};