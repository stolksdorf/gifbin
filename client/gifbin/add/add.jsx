/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var GifForm = require('gifbin/gifForm/gifForm.jsx');
var Add = React.createClass({
	componentDidMount: function() {
		document.title = 'gifbin.add';
	},


	render : function(){
		var self = this;
		return(
			<div className='add'>
				<GifForm queryLink={this.props.queryLink}/>
			</div>
		);
	}
});

module.exports = Add;
