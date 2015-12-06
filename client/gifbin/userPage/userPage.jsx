var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var UserPage = React.createClass({
	getDefaultProps: function() {
		return {
			userName : ''
		};
	},

	render : function(){
		var self = this;
		return(
			<div className='userPage'>
				UserPage Ready!

				{this.props.userName}
			</div>
		);
	}
});

module.exports = UserPage;
