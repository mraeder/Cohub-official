const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {   // req object can be coming from client or postman
    console.log(req.headers);                     // console logging this so we can see headers 
    res.statusCode = 200;                         // everything ok 
    res.setHeader('Content-Type', 'text/html');   // tells client what kind of data to expect in response body 
    res.end('<html><body><h1>Welcome to the Cohub site!</h1></body></html>');  // close response body and passes message to user 
});

server.listen(port, hostname, () => {          // 2 arguments; port and hostname variables, 3rd argument is a callback function that will be executed when the server starts up
    console.log(`Server running at http://${hostname}:${port}/`);   // console to let us know server is running 
});