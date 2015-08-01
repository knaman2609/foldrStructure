var $ = require('jquery');
var Backbone = require('backbone');
var Sync = require('../utils/backbone-sync-override')(Backbone);
var _ = require('underscore');

var userTemplate = require("../templates/user-template.hbs");

var User = Backbone.Model.extend({
	initialize: function() {
		this._setFullName();
		this._setPicUrl();

		this.on('change:fullName', this._setPicUrl, this);
	},
	_setFullName: function() {
		this.set('fullName', this.get('name').first +' '+  this.get('name').last);
	},
	_setPicUrl: function() {
		var fullName = this.get('fullName');

		if (fullName.length < 20 && fullName.length > 10) 
		this.set('pic_url', this.get('picture').large);
		else if (fullName.length < 10 && fullName.length > 5)
		this.set('pic_url', this.get('picture').medium);
		else 
		this.set('pic_url', this.get('picture').thumbnail);
	}
});

var Users = Backbone.Collection.extend({
	model: User,
	url: '/users'
});

var UserView = Backbone.View.extend({
	tagName: 'li',
	tpl: userTemplate,
	render: function() {
		this.$el.html('');
		this.$el.append(this.tpl(this.model.attributes));

		return this;
	},
	events: {
		'click .name' : 'changeName'
	},
	changeName: function() {
		this.model.set('fullName', 'test');	
		this.render();
	}	
});

var UsersView = Backbone.View.extend({
	el: '.users',
	initialize: function() {
		this.collection = new Users();
		this.collection.on('reset', this.render, this);
	},
	render: function() {
		var self = this;

		this.collection.each(function(model){
			self.renderUser(model);
		});	
		console.log(this.$el);
	},
	renderUser: function(user) {
		var userV = new UserView({
			model: user
		});

		this.$el.append(userV.render().el);
	}
});

var users = new UsersView();
users.collection.fetch({reset: true});

