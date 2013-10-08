
var dateFormat = require('dateformat');
var express = require("express");
var qs = require('querystring');
var requests = require('request');

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

app.get('/', function(request, response) {
    response.send('Hi! Go Away!')
});


/* Handle incoming posts from circleci */
post_handler = function(payload) {
    payload = payload['payload'];
    n=payload['vcs_url'].replace("https://github.com/","").split('/');
    user = n[0];
    repo = n[1];
    var date = new Date(payload['committer_date'] * 1000);
    committer_date = dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    /* This is the message. tweak it to make it better */
    message_string = ""
    message_string = message_string + "Status: " + payload['status'] + "\n"
    message_string = message_string +  "Commit message: " + payload['subject'] + "\n"
    message_string = message_string + "Committed by " + payload['author_name'] + " (" + payload['committer_email'] + ")" + " on " + committer_date + "\n"
    message_string = message_string + "Project: " + repo + "\n"
    message_string = message_string + "Branch: " + payload['branch'] + "\n"
    message_string = message_string + "Commit url: " + payload['vcs_url'] + "/commit/" + payload['vcs_revision'] + "\n"
    message_string = message_string + "Build time: " + ( payload['build_time_millis'] / 1000 ) + " seconds" + "\n"


    message_string = repo + "/" + payload['branch'] + ": " + payload['subject'] + " by " + payload['author_name'] + " " + payload['status'].toUpperCase() + "<"+ payload['vcs_url'] + "/commit/" + payload['vcs_revision'] +">"
    slack_org = process.env.SLACK_ORGANIZATION
    slack_token = process.env.SLACK_TOKEN
    slack_channel = process.env.SLACK_CHANNEL;
    slack_botname = process.env.SLACK_BOTNAME;

    slack_url = "https://" + slack_org + ".slack.com/services/hooks/incoming-webhook?token=" + slack_token

    slack_payload = {
        "text": message_string,
        "channel" : slack_channel,
        "username" : slack_botname
    }

    /* Post to slack! */
    console.log(slack_payload);
    requests.post(slack_url, {json:slack_payload},
    function (error, response, body) {
        console.log(body);
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
    response.send("Thank you!");
    post_handler(request.body)

});

/*
There has to be a better way to do this. Thoughts?
*/

if ((typeof process.env.SLACK_BOTNAME !== 'undefined' && process.env.SLACK_BOTNAME)||
    (typeof process.env.SLACK_CHANNEL !== 'undefined' && process.env.SLACK_CHANNEL)||
    (typeof process.env.SLACK_ORGANIZATION !== 'undefined' && process.env.SLACK_ORGANIZATION)||
    (typeof process.env.SLACK_TOKEN !== 'undefined' && process.env.SLACK_TOKEN)
    )
{
    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });
}else{
    console.log("One of the required config variables missing:");
    console.log("\tSLACK_BOTNAME: " + process.env.SLACK_BOTNAME);
    console.log("\tSLACK_CHANNEL: " + process.env.SLACK_CHANNEL);
    console.log("\tSLACK_ORGANIZATION: " + process.env.SLACK_ORGANIZATION);
    console.log("\tSLACK_TOKEN: " + process.env.SLACK_TOKEN)
    process.exit()
}