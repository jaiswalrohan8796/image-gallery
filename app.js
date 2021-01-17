const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const mongodbURI = require("./config.js");
const routes = require("./routes/route.js");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use('/imageUploads',express.static(path.join(process.cwd(), "imageUploads")));
app.set("view engine", "ejs");
app.set("views", "views");

mongoose
    .connect(mongodbURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch((err) => console.error(err.message));

app.use(routes);
