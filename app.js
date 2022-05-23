var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Conexão com o banco de dados mongo
require('./db/mongoConn');

//Importa as rotas do objeto Student e Professor
var StudentRoute = require('./routes/StudentRouteMongo');
var ProfessorRoute = require('./routes/ProfessorRouteMongo');

//Main
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
//Primeira string da URL, responsável por chamar as funções do arquivo de routes
app.use('/students', StudentRoute);
app.use('/professors', ProfessorRoute);

module.exports = app;