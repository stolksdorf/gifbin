/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Users = React.createClass({


	componentDidMount: function() {
		document.title = 'gifbin.' + (this.props.name || 'users');
	},

	render : function(){
		var self = this;
		return(
			<div className='users'>
				users Ready!
			</div>
		);
	}
});

module.exports = Users;
