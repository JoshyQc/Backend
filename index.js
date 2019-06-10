
//busco como instalar dependencia express 
//crear servidor express Node.js
//crear conexion a db 

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');


const degreeController = require('./controllers/degreeController');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "collage"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    req.con = con;
    next();
});

app.get('/course', function (req, res) {
    con.query("SELECT * FROM course", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });    
});

app.get('/degree', degreeController.index);
app.post('/degree', degreeController.create);
app.put('/degree', degreeController.update);
app.delete('/degree',degreeController.delete);

app.get('/professor', function (req, res) {
    con.query("SELECT * FROM professor", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });    
});

app.get('/student', function (req, res) {
    con.query("SELECT * FROM student", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });    
});

app.get('/user', function (req, res) {
  con.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
  });    
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});


