/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Buckets = React.createClass({

	render : function(){
		var self = this;
		return(
			<div className='buckets'>
				buckets Ready!
			</div>
		);
	}
});

module.exports = Buckets;
