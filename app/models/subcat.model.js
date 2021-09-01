const sql = require("./db.js");

const subCategory = function (category) {
    this.sname = category.sname;
    this.mcid = category.mcid;
};

subCategory.create = (newCategory, result) => {
    sql.query("INSERT INTO subcat SET ?", newCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created sub category category: ", { id: res.insertId, ...newCategory });
        result(null, { id: res.insertId, ...newCategory });
    });
};

subCategory.findById = (categoryId, result) => {
    sql.query(`SELECT * FROM subcat WHERE id = ${categoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found sub category: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

subCategory.updateById = (id, category, result) => {
    sql.query(
        "UPDATE subcat SET sname = ? WHERE id = ?",
        [category.sname,  id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated sub category: ", { id: id, ...category });
            result(null, { id: id, ...category });
        }
    );
};


subCategory.remove = (id, result) => {
    sql.query("DELETE FROM subcat WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted sub category with id: ", id);
        result(null, res);
    });
};

module.exports = subCategory;