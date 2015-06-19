/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var GifForm = require('gifbin/gifForm/gifForm.jsx');


var Add = React.createClass({


	componentDidMount: function() {
		document.title = 'gifbin.add';

/*
		if(typeof document !== 'undefined' && document.location.search){
			var path = document.location.search;
			var query = _.object(_.map(path.substring(path.indexOf('?')+1).split('&'), function(part){
				return part.split('=');
			}));

			console.log(query.i);
			this.setState({
				link : query.i
			});
		}
*/
	},


	render : function(){
		var self = this;

		console.log(this.state);


		return(
			<div className='add'>

				<GifForm queryLink={this.props.queryLink}/>


			</div>
		);
	}
});






module.exports = Add;
