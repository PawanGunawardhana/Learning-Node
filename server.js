const http = require("http");
const fs = require("fs");
const _ = require('lodash');

const server = require("http").createServer((req, res) => {
  console.log("request made");
  console.log(req.url, req.method);

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => { // lodash allows us to call the function only once..
        console.log("hello");
    }
)
    greet();
    greet();

  //set header content type

  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me": //redirecting to "/about"
      res.statusCode = 301; //301 means resource has moved permantently
      res.setHeader("Location", "/about");
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send a html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end(); //if there is an error if we didnt add this res.end() browser will seeking a response,so we want to stop that
    }
    //console.log(data.toString());
    //console.log(data.toString);
    console.log(data);
    console.log("file read");

    //res.write(data);// if there is one outputline as a response then we can add that into res.end(data);
    res.end(data);
  });

  // res.write('<head><link rel = "stylesheet" href = "#"/></head>');
  // res.write('<p>hello pawan<p>');
  // res.write('<p>hello pawan again<p>');
  // res.write('<p>hello machan pawan <p>');
  // res.write('<p>hello sudda again<p>');
  // res.end();
});

server.listen(3000, "localhost", () => {
  console.log("server is running on port 3000");
});
