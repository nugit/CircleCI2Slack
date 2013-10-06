#CircleCI 2 Slack

A node app that proxies build notifications from [circleCI](http://circleCI.com) to [Slack](http://slack.com)

## How to get it going:

###Install

Check it out of git:

	git clone https://github.com/lunarcorp/CircleCI2Slack.git

Deploy to heroku:

	heroku create
	git push heroku master
	
This will tell you your url: `https://creative-name-1234.herokuapp.com`

I imagine you could host it yourself, but why? 

###Config

####Environmental Vars

You will need to set the following environmental variables:

	SLACK_BOTNAME:      buildbot
	SLACK_CHANNEL:      #code
	SLACK_ORGANIZATION: lunar
	SLACK_TOKEN:        xxxx
	
You can do this the easy way with heroku: 

	heroku config:add SLACK_BOTNAME=buildbot
	heroku config:add SLACK_CHANNEL=#code
	heroku config:add SLACK_ORGANIZATION=lunar
	heroku config:add SLACK_TOKEN=xxx

####CircleCI config

Then in your `circle.yml` file add a webhook to hit the node app:

	#Webhooks (for slack)
	notify:
	  webhooks:
    	# A list of hook hashes, containing the url field
	    - url: https://creative-name-1234.herokuapp.com/build/
	    

###That should do it. 


##Todo


There probably needs to be some better security on the url that is posted to the webhooks. Maybe pass through the `token` that comes from slack via the `circle.yml` config. 

Probably other things as well. 


##Yay. 

hit me up if you have problems or concerns: [@harper](http://twitter.com/harper) / [harper@nata2.org](mailto:harper@nata2.org)
