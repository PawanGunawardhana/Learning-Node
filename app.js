const express = require("express"); //this returns a function and stored in express cont
const { title } = require("process");

//express app
const app = express(); //invoke that created function to create an instance of express app

//register view engine
app.set("view engine", "ejs");

//listen for requests
app.listen(3000); //automatically refers to localhost

app.get("/", (req, res) => {
  //console.log(req.url, req.hostname, req.method);
  //res.send('<p>hi</p>');
  // res.sendFile("./views/index.html", { root: __dirname });

  const blogs = [
    { title: "A Star in the sky", snippet: "lorem ipsum dolor sit amet" },
    { title: "what is True love", snippet: "lorem ipsum dolor sit amet" },
    {
      title: "A ship that sails on the sea",
      snippet: "lorem ipsum dolor sit amet",
    },
  ];

  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
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
