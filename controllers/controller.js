const Posts = require("../models/model.js");
const fs = require("fs");
const helperFunctions = require("../utils/helperFunctions.js");
const getHome = async (req, res, next) => {
    const posts = await Posts.find({}).sort({ time: -1 });
    res.render("home", { posts: posts, message: "" });
};

const postPost = async (req, res, next) => {
    const { title, desc, time } = req.body;
    try {
        const image = req.file.path;
        const post = new Posts({
            title: title,
            desc: desc,
            time: time,
            image: image,
        });
        await post.save();
        const posts = await Posts.find({}).sort({ time: -1 });
        return res.render("home", { posts: posts, message: "Post added!" });
    } catch (err) {
        console.log(err);
        const posts = await Posts.find({}).sort({ time: -1 });
        return res.render("home", { posts: posts, message: "Unable to add!" });
    }
};

const editPost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const post = await Posts.find({ _id: id });
        if (post.length < 1) {
            return res.render("home", { message: "Unable to edit!" });
        }
        const imageFile = fs.readFileSync(post[0].image);
        return res.render("editPost", {
            post: post[0],
            image: imageFile,
            message: "Edit your post",
        });
    } catch (err) {
        console.log(err);
        return res.render("home", { message: "Unable to edit!" });
    }
};

const editPostSave = async (req, res, next) => {
    try {
        const { title, desc, time } = req.body;
        const image = req.file.path;
        const id = req.body.id;
        const post = await Posts.find({ _id: id });
        if (post.length < 1) {
            return res.render("home", { message: "Unable to edit!" });
        }
        await Posts.updateOne(
            { _id: id },
            {
                title: title,
                desc: desc,
                time: time,
                image: image,
            }
        );
        const posts = await Posts.find({}).sort({ time: -1 });
        return res.render("home", { posts: posts, message: "Post edited!" });
    } catch (err) {
        console.log(err);
        const posts = await Posts.find({}).sort({ time: -1 });
        return res.render("home", { posts: posts, message: "Unable to edit!" });
    }
};

const deletePost = async (req, res, next) => {
    id = req.params.id;
    try {
        const post = await Posts.find({ _id: id });
        helperFunctions.deleteHandler(post[0].image);
        await Posts.deleteOne({ _id: id });
        const posts = await Posts.find({}).sort({ time: -1 });
        return res.render("home", { posts: posts, message: "Post Deleted!" });
    } catch (err) {
        console.log(err);
        const posts = await Posts.find({}).sort({ time: -1 });
        return res.render("home", {
            posts: posts,
            message: "Unable to delete!",
        });
    }
};

module.exports = { getHome, postPost, deletePost, editPost, editPostSave };
