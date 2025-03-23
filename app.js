const express = require("express"); //this returns a function and stored in express cont
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//express app
const app = express(); //invoke that created function to create an instance of express app

//connect to mongoDB
const dbURI =
  "mongodb+srv://NewPawan:ADPIG1234@nodetuts.j9d96.mongodb.net/NodeTuts?retryWrites=true&w=majority&appName=NodeTuts";
//asynchronous task
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to database");
    //listen for requests
    app.listen(3000); //automatically refers to localhost
  })
  .catch((err) => {
    console.error(err);
  });

//register view engine
app.set("view engine", "ejs");

// //use method
// // app.use((req, res, next) => {
// //   console.log("Hello from middleware");
// //   console.log("host : ", req.hostname);
// //   console.log("path : ", req.path);
// //   console.log("method : ", req.method);
// //   next();
// // }); //without next() code doesnot know where to go to next,so we have to tell that explicitly.

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("dev"));
//app.use(morgan("tiny"));

// // // mongoose and mongo sandbox routes
// // app.get("/add-blog", (req, res) => {
// //   const blog = new Blog({
// //     title: "new blog 2",
// //     snippet: "lorem ipsum and lorem kipsumt tonight sdf",
// //     body: "read my blog further",
// //   });
// //   blog.save()
// //     .then((result) => {
// //       res.send(result);
// //     })
// //     .catch((err) => {
// //       res.status(400).send({ message: "Invalid request" });
// //       console.log(err);
// //     });
// // });

// // //get data from the database
// // app.get("/all-blogs", (req, res) => {
// //   Blog.find()
// //     .then((result) => {
// //     res.send(result);
// //   }).catch((err) => {
// //     console.log(err);
// //   })
// // });

// // app.get('/single-blog', (req, res) => {
// //   Blog.findById("67df97e830cd4408fc355ec7")
// //     .then((result) => {
// //       res.send(result);
// //     }).catch((err) => {
// //       res.status(400).send(err);
// //       console.log(err);
// //     });
// // });

// Routes

app.get("/", (req, res) => {
  res.redirect("/blogs");
  //console.log(req.url, req.hostname, req.method);
  //res.send('<p>hi</p>');
  // res.sendFile("./views/index.html", { root: __dirname });

  // const blogs = [
  //   { title: "A Star in the sky", snippet: "lorem ipsum dolor sit amet" },
  //   { title: "what is True love", snippet: "lorem ipsum dolor sit amet" },
  //   {
  //     title: "A ship that sails on the sea",
  //     snippet: "lorem ipsum dolor sit amet",
  //   },
  // ];

  // res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });

  // app.use((req, res, next) => {
  //   console.log("Hello from 2nd middleware");
  //   next();
  // }); //this will never fire, because it coded after the res.render line. now the backend is giving a res to the browser and will not go for bottom codes to execute.
});

// //blog routes

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.get("/blogs", (req, res) => {
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
app.post("/blogs", (req, res) => {
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
app.get("/blogs/:id", (req, res) => {
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
app.delete("/blogs/:id", (req, res) => {
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

//redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about", { title: "About" });
});

//404
app.use((req, res) => {
  //res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: 404 });
});
