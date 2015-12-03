var React = require('react');
var _ = require('lodash');

var ClipboardButton = React.createClass({
	getDefaultProps: function() {
		return {
			link : "http://i.imgur.com/Mk76H.gif",
			tooltip : "Copy Link!",
			tooltipDone : "Copied!",
			icon : "fa-link",
			tooltipDirection : 'right'
		};
	},

	getInitialState: function() {
		return {
			tooltipText: this.props.tooltip,
		};
	},

	onLeave : function(){
		this.setState({
			tooltipText : this.props.tooltip
		});
	},

	onClick : function(){
		this.refs.copyVal.getDOMNode().select();
		var result = document.execCommand("Copy", false, null);
		if(!result){
			alert('Your browser does not support copying to clipboard');
		}else{
			this.setState({
				tooltipText : this.props.tooltipDone
			});
		}
	},

	render : function(){
		var self = this;
		var extraProps = {};
		if(this.props.tooltip && this.props.tooltipDirection){
			extraProps['data-tooltip-' + this.props.tooltipDirection] = this.state.tooltipText;
		}

		return(
			<div {...extraProps} className={'clipboardButton ' + this.props.className}
					onMouseLeave={this.onLeave} onClick={this.onClick}>
				<i className={'fa ' + this.props.icon} />

				<input type='text' ref='copyVal' value={this.props.link} readOnly />
			</div>
		);
	}
});

module.exports = ClipboardButton;