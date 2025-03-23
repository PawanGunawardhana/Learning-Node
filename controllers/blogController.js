const Blog = require("../models/blog");
// blog_index , blog_details, blog_create_get, blog_create_post , blog_delete

//all blogs
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//look a single blog details
const blog_details = (req, res) => {
  //if dont use : in parameters then it will consider the actual value
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
};

//create a new blog get
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};

//create a new blog post
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log("Blog added to database successfully", req.body);
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete a single blog
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      //this will pass to the browser
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
