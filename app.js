var express = require("express");
var qs = require('querystring');

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.get('/', function(request, response) {
    response.redirect('http://ltc.io')
});

post_handler = function(payload) {
    console.log(payload);

}


app.post('/build/', function(request, response) {

    //post_handler('fuck yes');
    console.log("Got response: " + response.statusCode);

    console.log(request.body)
    response.send(request.body);



});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
