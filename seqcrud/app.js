let models = require('./models/index.js');

models.sequelize.sync().then(()=>{
    console.log('DB연결 성공');
}).catch(err=>{
    console.log('DB연결 실패');
    console.log(err);
})

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
//session의 사용을 위해서는 cokie-parser필요
var session = require('express-session');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');

//PUT, DELETE를 사용하기 위한 모듈
var methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
//session
app.use(session({
    key: 'sid',
    secret: 'secret',
    resave : false,
    saveUninitialized: true,
    cookie: {
        maxAge : 24000 * 60 * 60 //쿠키유효시간 24시간
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use(methodOverride('_method'));

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
