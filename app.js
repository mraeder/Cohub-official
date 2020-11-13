const createError = require('http-errors');
const express = require('express'); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser');  // req body-parser middleware
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const homeRouter = require('./routes/inspiration');
const inspirationRouter = require('./routes/inspiration');
const materialsRouter = require('./routes/materials');
const myaccountRouter = require('./routes/myaccount');

const mongoose = require('mongoose'); 

const url = 'mongodb://localhost:27017/cohub';

const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true              
});

connect.then(() => console.log('Connected correctly to server'),
    err => console.log(err)
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: 'session-id',
    secret: '8675309-9035768',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req, res, next) {
    console.log(req.session);

    if (!req.session.user) {
        const err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
    } else {
        if (req.session.user === 'authenticated') {
            return next();
        } else {
            const err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err);
        }
    }
}


const app = express();
app.use(morgan('dev'));      // morgan middleware with morgan function with argument 'dev'. Configures morgan to log using the development version which will give us additional information
app.use(bodyParser.json());     // when server gets requests w JSON formatted data in body, body-parser will handle parsing that data into properties of the request object so we can access that data more easily  

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

// handle post request for materials path
app.post('/materials', (req, res) => {   // if req was post request, it would go app.all to app.post, skipping app.get
    res.end(`Will add the material: ${req.body.name} with description: ${req.body.description}`);  // body-parser takes properties from that JSON data and auto set it up as properties of the req.body object 
});

// handle put request for materials path - rejected 
app.put('/materials', (req, res) => {
    res.statusCode = 403;  // reject request to this endpoint, operation not supported
    res.end('PUT operation not supported on /materials');
});

// handle delete operations to /materials
app.delete('/materials', (req, res) => {  // dangerous operation, only allow for restricted users 
    res.end('Deleting all materials');
});

// endpoints to support a different path 
app.get('/materials/:materialId', (req, res) => {   // add route parameter to end of the path with /:materialId. Store whatever client sends as part of path after /: as a route param named materialId
    res.end(`Will send details of the material: ${req.params.materialId} to you`);
});

app.post('/materials/:materialId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /materials/${req.params.materialId}`);
});

// support put requests on specific materialId
app.put('/materials/:materialId', (req, res) => {
    res.write(`Updating the material: ${req.params.materialId}\n`);  // \n causes new line in body
    res.end(`Will update the material: ${req.body.name}
        with description: ${req.body.description}`); // parsing out from request body that will be sent to us. Pulling this out of JSON formatted body of the request message, and echoing it back in our response as text 
});

app.delete('/materials/:materialId', (req, res) => {
    res.end(`Deleting material: ${req.params.materialId}`);  // This endpoint used for deleting specific material, not all of them 
});

//set up express to serve files from the public folder using 1 line of code. This is how we serve up About and Home!
app.use(express.static(__dirname + '/public'));  // middleware func built in called express.static. Pass it express.static func w argument __dirname (special node variable = absolute path of the current directory of the file that it's in)
 
// this is a middleware function 
app.use((req, res) => {   // use method takes callback function (middleware function). Middleware in express has access to req (request object), res (response object), and next 
    res.statusCode = 200;        // success code 
    res.setHeader('Content-Type', 'text/html');   // content = text 
    res.end('<html><body><h1>This is the Materials Hub server</h1></body></html>'); // end it with inline HTML doc 
});

// create a server and start listening to it 
app.listen(port, hostname, () => {   // creates instance of HTTP server class and starts listening to it 
    console.log(`Server running at http://${hostname}:${port}/`);   // provide port and host name, callback func to console server running at this location 
});