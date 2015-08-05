var Backbone = require( "backbone" );
var filterTpl = require( "../templates/filter-users.hbs" );

var FilteredView = Backbone.View.extend({
	className: ['filter-users'],
	tpl: filterTpl,
	initialize: function() {
		this.listenTo(this.model, 'change:users', this.renderList);
		this.render();
	},
	render: function() {
		this.$el.html('<div class="filter-users__input"> <input type="text" value="'+ this.model.get('searchText')  +'" autofocus> </div><div class="filter-users__list"></div>');

		return this;
	},
	renderList: function() {
		this.$el.find('.filter-users__list').html(this.tpl(this.model.attributes));
	},
	events: {
		'keyup input': function(e) {
			this.model.set('searchText', e.target.value);
		}
	}
});

module.exports = FilteredView;