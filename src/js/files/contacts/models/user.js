var Backbone = require( "backbone" );

var User = Backbone.Model.extend({
	defaults: {
		name: '',
		status: 'online'
	}
});

module.exports = User;