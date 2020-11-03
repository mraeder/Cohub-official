const express = require('express'); 

const hostname = 'localhost';
const port = 3000;

const app = express();

// this is a middleware function 
app.use((req, res) => {   // use method takes callback function (middleware function). Middleware in express has access to req (request object), res (response object), and next 
    console.log(req.headers);    // console req headers
    res.statusCode = 200;        // success code 
    res.setHeader('Content-Type', 'text/html');   // content = text 
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); // end it with inline HTML doc 
});

// create a server and start listening to it 
app.listen(port, hostname, () => {   // creates instance of HTTP server class and starts listening to it 
    console.log(`Server running at http://${hostname}:${port}/`);   // provide port and host name, callback func to console server running at this location 
});