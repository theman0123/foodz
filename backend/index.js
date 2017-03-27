var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');


var app = module.exports = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

var massiveInstance = massive.connectSync({
    connectionString: "postgres://postgres:postgres@localhost/foodz"
});

app.set('db', massiveInstance);

var mainCtrl = require('./controllers/mainCtrl');

app.get('/newEntry', mainCtrl.getNotes);
app.get('/notes', mainCtrl.getAllNotes);
app.post('/notes', mainCtrl.postNewNote);
//app.post('/newFoodz', mainCtrl.newFoodz);

app.listen(port, function(){
    console.log('up and running on port ', port)
})
