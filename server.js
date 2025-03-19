const http = require('http');

const server = require('http').createServer((req, res) => {
    console.log('request made');
    console.log(req.url, req.method);

    //set header content type

    res.setHeader('Content-Type', 'text/html');


    res.write('<head><link rel = "stylesheet" href = "#"/></head>');
    res.write('<p>hello pawan<p>');
    res.write('<p>hello pawan again<p>');
    res.write('<p>hello machan pawan <p>');
    res.write('<p>hello sudda again<p>');
    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('server is running on port 3000');
});