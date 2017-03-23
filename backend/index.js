var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');

var mainCtrl = require('./controllers/mainCtrl');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

var massiveInstance = massive.connectSync({
    connectionString: "postgres://postgres:postgres@localhost/sandbox"
});

app.set('db', massiveInstance);


//app.get('/home', mainCtrl.onLoad);


app.listen(port, function(){
    console.log('up and running on port ', port)
})