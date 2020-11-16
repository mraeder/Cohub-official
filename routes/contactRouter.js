const express = require('express'); // using express middleware
const bodyParser = require('body-parser'); // using body-parser middleware
const Contact = require('../models/contact');  // using Contact model
const contactRouter = express.Router(); 

contactRouter.use(bodyParser.json()); // declaring that body-parser middleware is being used

contactRouter.route('/') 
    .get((req, res, next) => { // get request which is getting any/all documents that are in the collection
        Contact.find()
        .then(contacts => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(contacts);
        })
        .catch(err => next(err)); 
    })
    .post((req, res, next) => { // creating a new document in the contact collection
        Contact.create(req.body)
        .then(contact => {
            console.log('Contact Created ', contact);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(contact);
        })
        .catch(err => next(err)); 
    })
    .put((req, res) => { // put request that is not supported
        res.statusCode = 403;
        res.end('PUT operation not supported on /contacts');
    })
    .delete((req, res, next) => { // delete request that is deleting any documents in the contact collection
        Contact.deleteMany()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err)); 
    })

module.exports = contactRouter;