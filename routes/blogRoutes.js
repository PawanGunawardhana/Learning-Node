const express = require("express");
const Blog = require("../models/blog");
const blogController = require('../controllers/blogController');

const router = express.Router();

//blog create get request
//router.get('/blogs/create', ()=>{}) // same
router.get("/create", blogController.blog_create_get);

//all blogs
router.get("/", blogController.blog_index);

//POST requests
router.post("/", blogController.blog_create_post);

//Route parameters
//single blog
router.get("/:id", blogController.blog_details);

//DELETE requests
router.delete("/:id", blogController.blog_delete);

module.exports = router;
