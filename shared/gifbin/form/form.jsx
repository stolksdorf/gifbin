var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var GifActions = require('gifbin/gif.actions.js');
var GifStore = require('gifbin/gif.store.js');

//Components
var GifPreview = require('./gifPreview/gifPreview.jsx');
var AddLink = require('./addLink/addLink.jsx');
var BucketSelect = require('./bucketSelect/bucketSelect.jsx');
var Tags = require('./tags/tags.jsx');
var Controls = require('./controls/controls.jsx');

var deep_clone = function(obj){
	return JSON.parse(JSON.stringify(obj));
}


var Form = React.createClass({
	mixins : [GifStore.mixin()],
	getDefaultProps: function() {
		return {
			gif : {},
			queryLink : undefined
		};
	},


	getInitialState: function(){
		var gif = _.assign({}, {
			buckets : [],
			originalLink : this.props.queryLink
		}, deep_clone(this.props.gif));


		return {
			originalFavs: this.props.gif.favs,
			gif : gif,
			user : GifStore.getUser(),
			saveStatus : GifStore.getStatus()
		};
	},
	onStoreChange  : function(){
		this.setState({
		//	originalFavs : GifStore.getGif(this.props.gif.id).favs,
			saveStatus : GifStore.getStatus(),
			user : GifStore.getUser(),
		});
	},


	isValid : function(){
		if(_.isEqual(this.state.gif, this.props.gif)){
			return false; //no changes
		}
		var gif = this.state.gif;
		var hasLink = !!gif.originalLink;
		var hasUser = !!(gif.user || this.state.user);
		var hasDescriptors = !!(gif.tags || gif.buckets.length);
		var isGif = _.endsWith(gif.originalLink, '.gif')

		return hasLink && hasUser && hasDescriptors && isGif;
	},

	handleGifUpdate : function(newGif){
		this.setState({ gif : newGif });
	},

	handleSave : function(){
		if(!this.state.gif.user) this.state.gif.user = this.state.user;

		var isEditMode = !!this.state.gif.id;
		if(isEditMode){
			GifActions.updateGif(this.state.gif, function(res){
				window.location = '/edit/' + res.body.id;
			});
		}else{
			GifActions.saveGif(this.state.gif, function(res){
				window.location = '/edit/' + res.body.id;
			});
		}
	},


	render : function(){
		return <div className='form'>
			<div className='left'>
				<GifPreview gif={this.state.gif} />
			</div>

			<div className='right'>
				<FormItem label='link'>
					<AddLink gif={this.state.gif} onChange={this.handleGifUpdate} />
				</FormItem>

				<FormItem label='bucket'>
					<BucketSelect gif={this.state.gif} onChange={this.handleGifUpdate} />
				</FormItem>

				<FormItem label='tags'>
					<Tags gif={this.state.gif} onChange={this.handleGifUpdate} />
				</FormItem>

				<Controls
					gif={this.state.gif}
					saveStatus={this.state.saveStatus}
					loggedInUser={this.state.user}
					onSave={this.handleSave}
					isValid={this.isValid()}
					/>
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