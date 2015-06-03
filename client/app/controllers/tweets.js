TweetStream = new Meteor.Stream('tweets');
var o = [];
TweetStream.on('tweet', function(tweet) {
	tweet.created_at = moment(tweet.created_at).toDate();
	var time = new Date(tweet.created_at).getMinutes();
	o.push([time, Tweets.find().count()]);
	Template.plot.rendered(o);
	console.log(tweet);
	Tweets.insert(tweet);
});

Template.tweets.tweets = function() {
	return Tweets.find({}, {
		sort: {
			'created_at': -1
		}
	});
};

Template.tweets.isPhoto = function() {
	return this.type === "photo";
};

Template.plot.rendered = function (o) {
        // Flot
        
            var a = $.plot($("#flot-2"), [
                {data: o, label: "Tweet-count"}
            ], {series: {lines: {show: !0}, points: {show: !0}}, grid: {hoverable: !0, clickable: !0}, yaxis: {min: 0, max: Tweets.find().count()+10}})
    
        
    };