/*
Server for my travel site with JS Easy popular components
 */

let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let mysql = require('mysql');
let app = express();

const PORT = process.env.PORT || 3000;

let connection = mysql.createPool({
    host: 'remotemysql.com',
    user: 'CYpLql35qV',
    password: 'LBpLLTEBej',
    database: 'CYpLql35qV'
});

//Шаблонизатор
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//Загрузка главной страницы index
app.get('/', function(req, res) {

    connection.query('SELECT tabs.title, tabs.subtitle, tabs.text, tabs.photo_id, photos.id, photos.path, photos.exp \n' +
        '\tFROM tabs\n' +
        '    INNER JOIN photos\n' +
        '    ON tabs.photo_id = photos.id', function (err, rows) {
        if (err) throw new Error;

        res.render('index', {data: rows, title: 'Мой заголовок тут'});
    });
});

app.get('/about', function(req,res){
   res.render('about', {title: 'О нас'});
});

app.post('/phones', function(req,res){
    let data = req.body;
    console.log(data);

    connection.query('INSERT INTO phones SET ?', [data],  function(err,rows){
        if (err) throw new Error;
        res.redirect('/');
    });
});


app.get('/contacts', function(req,res){
   connection.query('SELECT * from usersinfo', function (err, rows) {
       if (err) throw new Error;
       res.json(rows);
   });
});

app.post('/contacts', function(req,res){
   let data = req.body;
    console.log(data);

   connection.query('INSERT INTO usersinfo SET ?', [data],  function(err,rows){
       if (err) throw new Error;
       res.redirect('/');
   });
});

app.use(function(req, res, next){
    res.status(404).send('Нет такой страинцы повторите ввод!');
});

app.listen(PORT, function(){
    console.log(`Прослушиваем порт по адрессу ${PORT}`);
});

