const subCategory = require("../models/subcat.model.js");
// const Category = require("../models/category.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const category = new subCategory({
        sname: req.body.sname,
        mcid: req.params.mcid,
    });

    subCategory.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the sub Category."
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    subCategory.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.categoryId
                });
            }
        } else res.send(data);
    });
}

exports.updateOne = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    subCategory.updateById(
        req.params.categoryId,
        new subCategory(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found sub category with id ${req.params.categoryId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating sub category with id " + req.params.categoryId
                    });
                }
            } else res.send(data);
        }
    );
}

exports.deleteOne = (req, res) => {
    subCategory.remove(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found sub Category with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete sub Category with id " + req.params.categoryId
                });
            }
        } else res.send({ message: `Sub Category was deleted successfully!` });
    });
}