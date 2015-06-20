/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

//var GifStore = require('gifbin/gifstore');

var GifForm = require('gifbin/gifForm/gifForm.jsx');


var Edit = React.createClass({

/*
	getInitialState: function() {
		return {
			gif : this.props.gif
		};
	},
*/
	componentDidMount: function() {
		document.title = 'gifbin.edit';
	},


	render : function(){
		var self = this;

		console.log(this.props.gif);


		return(
			<div className='edit'>
				<GifForm gif={this.props.gif} />
			</div>
		);
	}
});

module.exports = Edit;
