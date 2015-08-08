var React = require( "react" );

var Item = React.createClass({
	render: function() {
		return (
			<div className="filter-users__listItem">{this.props.name}</div>
		);		
	}
});

module.exports = Item