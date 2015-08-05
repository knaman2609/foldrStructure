var $ = require( "jquery" );
var Backbone = require( "backbone" );

var FilteredList = require('./views/filter-users');
var FilterModel = require( "./models/filter-users" );
var Users = require('./collections/users');

var users = new Users([
	{name: 'John'}, 
	{name: 'Snow'},
	{name: 'Ana'},
	{name: 'james'},
	{name: 'Sarah'},
	{name: 'Matt'}
]);
var filterModel = new FilterModel();
var filteredList = new FilteredList({
							model: 	filterModel
						});
filterModel.set('usersColl', users);
$('.container').html(filteredList.el);

setTimeout(function() {
	filterModel.set('usersColl', new Users([
		{name: 'John', 'status': 'off'}, 
		{name: 'Snow', 'status': 'busy'},
		{name: 'Ana', 'status': 'drunk'},
		{name: 'james'},
		{name: 'Sarah'},
		{name: 'Matt'}
	]));	
}, 5000);

setTimeout(function() {
	filterModel.set('usersColl', new Users([
		{name: 'John', 'status': 'unknown'}, 
		{name: 'Snow', 'status': 'busy'},
		{name: 'Ana', 'status': 'online'},
		{name: 'james','status':  'off'},
		{name: 'Sarah', 'status': 'online'},
		{name: 'Matt'}
	]));	
}, 10000);
