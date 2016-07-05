var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var exphbs = require('express-handlebars');
var passport = require('passport');
//var localst = require('passport-local');

var routes = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var users = require('./routes/users');
var article = require('./routes/article');
var status = require('./routes/status');
var statusup = require('./routes/statusupdate');
var show = require('./routes/statusshow');
var AStatus = require('./routes/AStatus');
var schedule_show = require('./routes/schedule_show');
var newcase =require('./routes/newcase');
var showcase =require('./routes/caseshow');
var match =require('./routes/match');
var getcase =require('./routes/getcase');
var showstcase = require('./routes/ShowStudentCase')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret : 'HelloExpressSESSION'}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());



app.use('/', routes);
app.use('/users', users);
app.use('/article', article);
app.use('/login', login);
app.use('/register', register);
app.use('/status', status);
app.use('/statusupdate', statusup);
app.use('/statusshow', show);
app.use('/AStatus', AStatus);
app.use('/schedule_show', schedule_show);
app.use('/newcase', newcase);
app.use('/caseshow', showcase);
app.use('/match', match);
app.use('/getcase', getcase);
app.use('/StudentCase',showstcase);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
