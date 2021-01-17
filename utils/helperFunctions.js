const fs = require("fs");

const deleteHandler = (filepath) => {
    fs.unlink(filepath, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = { deleteHandler };
