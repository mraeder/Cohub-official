const express = require('express'); 
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));  // morgan middleware with morgan function with argument 'dev'. Configures morgan to log using the development version which will give us additional information

//set up express to serve files from the public folder using 1 line of code
app.use(express.static(__dirname + '/public'));  // middleware func built in called express.static. Pass it express.static func w argument __dirname (special node variable = absolute path of the current directory of the file that it's in)
 
// this is a middleware function 
app.use((req, res) => {   // use method takes callback function (middleware function). Middleware in express has access to req (request object), res (response object), and next 
    res.statusCode = 200;        // success code 
    res.setHeader('Content-Type', 'text/html');   // content = text 
    res.end('<html><body><h1>This is an Express Server</h1></body></html>'); // end it with inline HTML doc 
});

// create a server and start listening to it 
app.listen(port, hostname, () => {   // creates instance of HTTP server class and starts listening to it 
    console.log(`Server running at http://${hostname}:${port}/`);   // provide port and host name, callback func to console server running at this location 
});