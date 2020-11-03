const express = require('express'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');  // req body-parser middleware

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));      // morgan middleware with morgan function with argument 'dev'. Configures morgan to log using the development version which will give us additional information
app.use(bodyParser.json());  // when server gets requests w JSON formatted data in body, body-parser will handle parsing that data into properties of the request object so we can access that data more easily  

// add support for REST api endpoints 
app.all('/materials', (req, res, next) => {    // app.all catches all HTTP verbs, set default properties for all default methods so we don't have to set repeatedly on each one. /path + callback func. Any request to this path will trigger this method, (req, res, next)
    res.statusCode = 200;                      // success 
    res.setHeader('Content-Type', 'text/plain');   // text plain 
    next();   // call the next function. Pass control of application routing to next relevant routing method after this one. Otherwise it would just stop here
});

// set up an endpoint for get request to /materials
app.get('/materials', (req, res) => {   // get request, don't have 'next' in here because we don't want to process any more routing methods after this one
    res.end('Will send all the materials to you');  // status code and headers already set with app.all. Just end it to send message to client.
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

//set up express to serve files from the public folder using 1 line of code. This is how we serve up About and Home!
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