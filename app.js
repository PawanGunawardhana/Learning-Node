const express = require("express"); //this returns a function and stored in express cont

//express app
const app = express(); //invoke that created function to create an instance of express app

//listen for requests
app.listen(3000); //automatically refers to localhost

app.get("/", (req, res) => {
  //console.log(req.url, req.hostname, req.method);
  //res.send('<p>hi</p>');
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//404
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
