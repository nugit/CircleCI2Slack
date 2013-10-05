var express = require("express");
var requests = require('request');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
    response.redirect('http://ltc.io')
});

console.log('before')

console.log('after')

app.get('/build', function(request, response) {
    response.send('Hello World!');
    requests.post(
        'http://dopeman.org/post/',
        { form: { key: 'value' } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
