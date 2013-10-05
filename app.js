var express = require("express");
var qs = require('querystring');
var requests = require('request');

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.get('/', function(request, response) {
    response.redirect('http://ltc.io')
});

post_handler = function(payload) {
    data = JSON.stringify(payload)
    console.log(data);

}

app.get('/build/', function(request, response) {
    response.redirect('/')
});

app.post('/build/', function(request, response) {

    console.log("Got response: " + response.statusCode);
    console.log("Response: " + request.body)
    response.send(request.body);
    post_handler(request.body)

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
