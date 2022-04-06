var createError = require('http-errors');
var express = require('express');
// MYSQL
var mysql = require('mysql2');
const query = require('./database/query');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
// Graphql
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Mysql Connection
app.use((req, res, next) => {
    req.mysqlDb = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'ExoAPI' });
    req.mysqlDb.connect();
    next();

});

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Chanteur {
    idChanteur: Int!
    pseudo: String
    nbrConcert: String
    """
    the list of Posts by this author
    """
    concerts: [Concert]
  }

  type Concert {
    idConcert: Int!
    idtournee: String
    dateConcert: String
    ville: String
    nbrPlaceVendu: String
  }

  # the schema allows the following query:
  type Query {
    concerts: [Concert]
    chanteur(idChanteur: Int!): Chanteur
  }

  # this schema allows the following mutation:`);

// The root provides a resolver function for each API endpoint

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: query,
    graphiql: true,
}));

// 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('404')
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

// SOCKETIO
// var APP_PORT = '8081'
var io = require('socket.io')()
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chatter', (message) => {
        console.log('chatter : ', message)
        io.emit('chatter', message)
    })
})
module.exports = app;