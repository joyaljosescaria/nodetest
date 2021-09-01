const Product = require("../models/product.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        scid: req.params.scid,
    });

    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        else res.send(data);
    });
}

exports.findById = (req, res) => {
    console.log(req.params.pid)

    Product.findById(req.params.pid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found product with id ${req.params.pid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving product with id " + req.params.pid
                });
            }
        } else res.send(data);
    });
}


exports.updateProduct = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateById(
        req.params.pid,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found product with id ${req.params.pid}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating product with id " + req.params.pid
                    });
                }
            } else res.send(data);
        }
    );
}

exports.deleteProduct = (req, res) => {
    Product.remove(req.params.pid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found product with id ${req.params.pid}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete product with id " + req.params.pid
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
}