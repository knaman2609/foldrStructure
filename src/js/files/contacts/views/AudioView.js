var Backbone = require( "backbone" );
var AudioModel = require( "../models/AudioModel" );
var AudioTpl = require( "a" );

var AudioView = Backbone.View.extend({
	model: AudioModel,
	templates: Audiotpl
});

module.exports = new AudioView;