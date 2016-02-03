var React = require('react');
var _ = require('lodash');
var cx = require('classnames');
var moment = require('moment');

var Utils = require('gifbin/utils');


//var ClipboardButton = require('gifbin/clipboardButton/clipboardButton.jsx');

var GifActions = require('gifbin/gif.actions.js');
var GifStore = require('gifbin/gif.store.js');





var GifPreview = require('./gifPreview/gifPreview.jsx');
var AddLink = require('./addLink/addLink.jsx');

var BucketSelect = require('./bucketSelect/bucketSelect.jsx');
var Tags = require('./tags/tags.jsx');




var deep_clone = function(obj){
	return JSON.parse(JSON.stringify(obj));
}



var Form = React.createClass({

	mixins : [GifStore.mixin()],
	onStoreChange  : function(){
		this.setState({
		//	originalFavs : GifStore.getGif(this.props.gif.id).favs,
			status : GifStore.getStatus()
		});
	},
	getDefaultProps: function() {
		return {
			gif : {}
		};
	},
	getInitialState: function() {
		return {
			originalFavs: this.props.gif.favs,
			gif : deep_clone(this.props.gif)
		};
	},


	handleGifUpdate : function(newGif){
console.log(newGif);

		this.setState({ gif : newGif });
	},

	render : function(){
		return <div className='gifForm'>
			<div className='left'>
				<GifPreview gif={this.state.gif} />
			</div>

			<div className='right'>
				{this.state.gif.gifLink}

				<FormItem label='link'>
					<AddLink gif={this.state.gif} onChange={this.handleGifUpdate} />
				</FormItem>

				<FormItem label='bucket'>
					<BucketSelect gif={this.state.gif} onChange={this.handleGifUpdate} />
				</FormItem>

				<FormItem label='tags'>
					<Tags gif={this.state.gif} onChange={this.handleGifUpdate} />
				</FormItem>

			</div>
		</div>
	}
})

module.exports = Form;




var FormItem = function(props={}){
	return <div className={'formItem ' + props.label}  key={props.label}>
		<label>{props.label}</label>
		{props.children}
	</div>;
}