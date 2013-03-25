(function(Tweet) {

	//Tweet.Model = Backbone.Model.extend();

	Tweet.Collection = Backbone.Collection.extend({
		url: function() {
			//return "http://search.twitter.com/search.json?since_id=91770779645124609&q=test&callback=?";
			return "http://search.twitter.com/search.json?q=twitterapi&callback=?";
			//return "http://kpi.ericsson.localhost/processed.json?format=json";
		},

		parse: function(data) {
			return data.results;
		}
	});
	
	Tweet.Views.List = Backbone.Layout.extend({
		template: "#list",

		events: {
			"click li": "update"
		},

		update: function(ev) {
			var index = $(ev.target).index();
			var model = this.collection.at(index);

			this.trigger("update", model);
		},

		serialize: function() {
			return { tweets: this.collection };
		}
	});

	Tweet.Views.Detail = Backbone.Layout.extend({
		template: "#detail",

		serialize: function() {
			return { tweet: this.model };
		}
	});
}) (twitter.module("tweet"));
