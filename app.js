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
    payload = payload['payload'];
    console.log(payload);
    console.log(JSON.stringify(payload));

    console.log("Status: " + payload['status'])
    console.log("Commit message: " + payload['subject'])
    console.log("Committed by " + payload['author_name'] + " (" + payload['committer_email'] + ")" + " on ");
    console.log("Branch: " + payload['branch'])
    console.log("Commit url: " + payload['vcs_url'] + "/commit/" + payload['vcs_revision'])
    console.log("Build time: " + payload['build_time_millis'] + " seconds")
    requests.post('http://dopeman.org/post/', {form:payload});

}

app.get('/build/', function(request, response) {
    response.redirect('/')
});

app.post('/build/', function(request, response) {

    console.log("Got response: " + response.statusCode);

    console.dir(request.body);
    response.send(request.body);
    post_handler(request.body)

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
