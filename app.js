var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser'); 
var routes = require('./routes');
//var { audit, setUserFromJWT, httpContext } = require('@dilligentech/middleware')

var app = express();
//var expressWs = require('express-ws')(app);
app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use('/createProfile',express.static('./tmp/'));
app.use('/newsFeed',express.static('./tmp/'));

//var routes = require('./routes');
app.use('/', routes);

module.exports = app;