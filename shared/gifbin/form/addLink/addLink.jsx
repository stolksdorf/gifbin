var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var ClipboardButton = require('gifbin/clipboardButton/clipboardButton.jsx');

var AddLink = React.createClass({
	getDefaultProps: function() {
		return {
			gif : {},
			onChange : function(){}
		};
	},

	handleLinkChange : function(e){
		this.props.onChange({
			...this.props.gif,
			originalLink : e.target.value
		})
	},


	renderField : function(){
		if(!this.props.gif.id) return null;

		return [
			<div className='link' key='link'>{this.props.gif.originalLink}</div>,

			<ClipboardButton
				key='gif'
				className='gifButton'
				icon='fa-link'
				tooltip='gif'
				tooltipDone='copied!'
				link={this.props.gif.gifLink} />,

			<ClipboardButton
				key='gifv'
				className='gifvButton'
				icon='fa-rocket'
				link={this.props.gif.gifvLink}
				tooltip='gifv'
				tooltipDone='copied!' />
		];
	},
	renderLink : function(){
		if(this.props.gif.id) return null;

		return <input className='link' type='text'
			value={this.props.gif.originalLink}
			onChange={this.handleLinkChange}
		/>
	},


	render : function(){
		return <div className='addLink'>
			{this.renderLink()}
			{this.renderField()}
		</div>
	}
});

module.exports = AddLink;
