
var dateFormat = require('dateformat');
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
    n=payload['vcs_url'].replace("https://github.com/","").split('/');
    user = n[0];
    repo = n[1];
    var date = new Date(payload['committer_date'] * 1000);
    committer_date = dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    message_string = ""
    message_string = message_string + "Status: " + payload['status'] + "\n"
    message_string = message_string +  "Commit message: " + payload['subject'] + "\n"
    message_string = message_string + "Committed by " + payload['author_name'] + " (" + payload['committer_email'] + ")" + " on " + committer_date + "\n"
    message_string = message_string + "Project: " + repo + "\n"
    message_string = message_string + "Branch: " + payload['branch'] + "\n"
    message_string = message_string + "Commit url: " + payload['vcs_url'] + "/commit/" + payload['vcs_revision'] + "\n"
    message_string = message_string + "Build time: " + ( payload['build_time_millis'] / 1000 ) + " seconds" + "\n"

    slack_url = "http://dopeman.org/post/"; //"https://lunar.slack.com/services/hooks/incoming-webhook?token=sTktyXRvvWaJNxGELvkvBcbx"
    slack_channel = "#code";
    slack_botname = "buildbot";

    slack_payload = {"payload" : {
        "text": message_string,
        "channel" : slack_channel,
        "username" : slack_botname
    }}



    console.log(slack_payload);
    requests.post(slack_url, {json:slack_payload},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    });

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

