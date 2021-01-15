const Posts = require("../models/model.js");

const getHome = async (req, res, next) => {
    const posts = await Posts.find({}).sort({ time: -1 });
    res.render("home", { posts: posts });
};

const postPost = async (req, res, next) => {
    const { title, desc, time } = req.body;
    try {
        const image = req.file.path;
        console.log(image);
        const post = new Posts({
            title: title,
            desc: desc,
            time: time,
            image: image,
        });

        const saveResult = await post.save();
        console.log(saveResult, "post saved");
    } catch (err) {
        console.log(err);
    }
    const posts = await Posts.find({}).sort({ time: -1 });
    res.render("home", { posts: posts });
};

module.exports = { getHome, postPost };
