this.twitter = {
	// Create this closure to contain the cached modules
	module: function() {
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load on
		// existing module.
		return function(name) {
			// If this module has already been created, return it.
			if (modules[name]) {
				return modules[name];
			}

			// Create a module and save it under this name
			return modules[name] = { Views: {} };
		};
	}(),

	app: _.extend({}, Backbone.Events)
};

// Start application
jQuery(function($){
	// Shorten the app namespace
	var app = twitter.app;

	// Get dependency
	var Tweet = twitter.module("tweet");
	console.log("Just before Router");
	var Router = Backbone.Router.extend({
		routes: {
			"": "index"
		},

		index: function() {
			// Create a main layout
			var main = new Backbone.Layout({
				name: "#main"
			});

			// Fetch the tweets
			var tweets = new Tweet.Collection();
			console.log(tweets);
			// Fetch new tweets
			tweets.fetch().success(function() {
				console.log("Fetching...");
				// Assemble the layout
				var list = main.views[".list"] = new Tweet.Views.List({ collection: tweets});
				var detail = main.views[".detail"] = new Tweet.Views.Detail({ model: tweets.at(0) });

				// When a new model is clicked re-render the right column
				list.bind("update", function(model) {
					detail.model = model;

					detail.render();
				});

				// Render into the page
				main.render(function(contents) {
					$(".container").html(contents);
				});
			});
		}
	});
	var app_router = new Router;
	Backbone.history.start();
});
