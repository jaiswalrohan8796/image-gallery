const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

const allRoutes = require("../controllers/controller.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "imageUploads");
    },
    filename: (req, file, cb) => {
        cb(null, "image" + Date.now() + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const fileUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.get("/", allRoutes.getHome);
router.post("/upload", fileUpload.single("image"), allRoutes.postPost);
router.delete("/delete/:id", allRoutes.deletePost);
router.post("/edit", fileUpload.single("image"), allRoutes.editPostSave);
router.get("/edit/:id", allRoutes.editPost);
module.exports = router;
