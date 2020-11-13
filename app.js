const createError = require('http-errors');
const express = require('express');  
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

app.use('/', homeRouter);
app.use('/about', aboutRouter);

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

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/materials', materialsRouter);
app.use('/inspiration', inspirationRouter);
app.use('/contact', contactRouter);
app.use('/myaccount', myaccountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;