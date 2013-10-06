
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
    n=payload['vcs_url'].replace("https://github.com/","").split('/');
    user = n[0];
    repo = n[1];
    message_string = ""
    message_string = message_string + "Status: " + payload['status']
    message_string = message_string +  "Commit message: " + payload['subject']
    message_string = message_string + "Committed by " + payload['author_name'] + " (" + payload['committer_email'] + ")" + " on " + payload['committer_date']
    message_string = message_string + "Project: " + repo
    message_string = message_string + "Branch: " + payload['branch']
    message_string = message_string + "Commit url: " + payload['vcs_url'] + "/commit/" + payload['vcs_revision']
    message_string = message_string + "Build time: " + payload['build_time_millis'] + " seconds"
    console.log(message_string);
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
*/

 str="https://github.com/lunarcorp/api";
 n=str.replace("https://github.com/","").split('/');
user = n[0];
repo = n[1];