
var React = require('react');
var _ = require('lodash');

var Link = require('pico-router').Link;

var GroupCard = React.createClass({

	getDefaultProps: function() {
		return {
			img : "",
			title : "Test",
			total : '',
			link  : ''
		};
	},

	render : function(){
		var self = this;
		return(
			<Link className='groupCard' href={this.props.link}>
				<img src={this.props.img} />
				<div className='title'>{this.props.title}</div>
				<div className='metadataLeft'>{this.props.meta}</div>
				<div className='metadataRight'>{Number(this.props.total).toLocaleString('en')}</div>
			</Link>
		);
	}
});

module.exports = GroupCard;
