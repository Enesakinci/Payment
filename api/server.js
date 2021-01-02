var bodyParser = require('body-parser');
var express = require('express');
var app = express();
let paymentRoute = require('./routes'); // ROUTE SINIFI YAZILDI 

//CORS Middleware Cors Angular projesinden istek atmamız için 
app.use(function(req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/', paymentRoute);

//projeyi çalıştırmak için nodemon yazabilirsin. 
var server = app.listen(8081, function() {
    var host = server.address().address;
    host = host.replace("::", "localhost");

    var port = server.address().port;

    console.log("Server listening at http://" + host + ":" + port)
        //http://localhost:8081
})