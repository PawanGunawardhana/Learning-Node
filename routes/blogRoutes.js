const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

//router.get('/blogs/create', ()=>{}) // same
router.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      res.status(404).send("No blogs found", err);
      console.log(err);
    });
});

//POST requests
router.post("/", (req, res) => {
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
});

//Route parameters
router.get("/:id", (req, res) => {
  //if dont use : in parameters then it will consider the actual value
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE requests
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      //this will pass to the browser
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
