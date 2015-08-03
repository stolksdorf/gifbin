/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var Admin = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='admin'>
				admin Ready!
			</div>
		);
	}
});

module.exports = Admin;
