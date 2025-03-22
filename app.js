const express = require("express"); //this returns a function and stored in express cont
const { title } = require("process");

//express app
const app = express(); //invoke that created function to create an instance of express app

//register view engine
app.set("view engine", "ejs");

//use method
app.use((req, res, next) => {
  console.log("Hello from middleware");
  console.log('host : ', req.hostname);
  console.log('path : ', req.path);
  console.log('method : ', req.method);
  next();

}); //without next() code doesnot know where to go to next,so we have to tell that explicitly.

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

  app.use((req, res, next) => {
    console.log("Hello from 2nd middleware");
    next();
  
  });//this will never fire, because it coded after the res.render line. now the backend is giving a res to the browser and will not go for bottom codes to execute.
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
