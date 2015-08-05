var Backbone = require( "backbone" );
var _ = require( "underscore" );

var FilteredList = Backbone.Model.extend({
	defaults: {
		searchText: '',
		users: null,
		usersColl: null
	},
	initialize: function () {
		this.on('change:usersColl', this._usersCollToArray, this);
		this.on('change:searchText', this._filter, this);
	},
	_usersCollToArray: function() {
		this.set('users', this.get('usersColl').toJSON());

		if (this.get('searchText'))
		this._filter();
	},
	_filter: function() {
		var users = this.get('usersColl').toJSON(),
			filterBy = this.get('searchText'),
			newList;

		newList =  _.filter(users, function(user) {
			var u = user.name.toLocaleLowerCase();

			if (u.indexOf(filterBy) != -1)
			return true;
		});
		
		this.set('users', newList);			
	}
});

module.exports = FilteredList;