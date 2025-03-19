const http = require("http");
const fs = require("fs");

const server = require("http").createServer((req, res) => {
  console.log("request made");
  console.log(req.url, req.method);

  //set header content type

  res.setHeader("Content-Type", "text/html");

  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
        console.log(err);
        res.end(); //if there is an error if we didnt add this res.end() browser will seeking a response,so we want to stop that
    }
    console.log(data.toString());
    console.log(data.toString);
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
