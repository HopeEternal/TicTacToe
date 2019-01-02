var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path    = require("path");

app.use(express.static(__dirname + '/public'));

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    render('index')
});

app.get("/elements", (req, res) => {
    res.sendFile(__dirname + '/public/elements.html');
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);