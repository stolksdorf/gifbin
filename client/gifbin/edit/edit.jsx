/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');


String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var Edit = React.createClass({

	getInitialState: function() {
		return {
			imagePath:""
		};
	},

	componentDidMount: function() {
		document.title = 'gifbin.edit';
		if(typeof document !== 'undefined' && document.location.search){
			var path = document.location.search;
			var query = _.object(_.map(path.substring(path.indexOf('?')+1).split('&'), function(part){
				return part.split('=');
			}));
			this.setState({
				imagePath : query.i
			});
		}
	},

	handleImageChange : function(e){
		this.setState({
			imagePath : e.target.value
		})
	},


	render : function(){
		var self = this;

		var ip = this.state.imagePath;

		if(ip.endsWith('.webm')){
			ip = dip.replace('.webm', '.gif')
		}

		return(
			<div className='edit'>
				edit Ready!

				<input type='text' value={ip} onChange={this.handleImageChange} />
				<img src={ip} />
			</div>
		);
	}
});

module.exports = Edit;
