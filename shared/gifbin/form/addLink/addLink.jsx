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

	hasValidURLExt : function(){
		var link = this.props.gif.originalLink
		return !(_.endsWith(link, '.webm') || _.endsWith(link, '.gifv'))
	},


	renderLink : function(){
		if(!this.props.gif.id) return null;

		return [
			<div className='link' key='link'>
				{this.props.gif.originalLink}
			</div>,

			<div className='buttons' key='buttons'>
				<ClipboardButton
					key='gif'
					className='gifButton'
					icon='fa-link'
					tooltip='gif'
					tooltipDone='copied!'
					tooltipDirection='bottom'
					link={this.props.gif.gifLink} />
				<ClipboardButton
					key='gifv'
					className='gifvButton'
					icon='fa-rocket'
					link={this.props.gif.gifvLink}
					tooltip='gifv'
					tooltipDirection='bottom'
					tooltipDone='copied!' />
			</div>
		];
	},
	renderInputField : function(){
		if(this.props.gif.id) return null;

		return <input className={cx('link', {'invalid' : !this.hasValidURLExt()})} type='text'
			value={this.props.gif.originalLink}
			onChange={this.handleLinkChange}
		/>
	},


	render : function(){
		console.log('ADD LINK', this.props.gif);


		var tooltip = {};
		if(!this.hasValidURLExt() && !this.props.gif.id){
			tooltip['data-tooltip'] = "Can only upload gifs! Try changing the extension?";
		}

		return <div className='addLink' {...tooltip}>
			{this.renderInputField()}
			{this.renderLink()}
		</div>
	}
});

module.exports = AddLink;
