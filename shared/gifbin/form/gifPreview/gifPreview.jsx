var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var GifActions = require('gifbin/gif.actions.js');
var GifStore = require('gifbin/gif.store.js');
var randomBucketImg = _.sample(GifStore.getBuckets()).img;

var GifPreview = React.createClass({
	getDefaultProps: function() {
		return {
			gif : {},
			originalFavs : [],
		};
	},

	componentDidMount: function() {
		if(this.refs.gifv) this.refs.gifv.load();
	},

	isFav : function(){
		return _.includes(this.props.originalFavs, GifStore.getUser());
	},

	handleFavClick : function(){
		if(this.isFav()){
			GifActions.unfavGif(this.props.gif);
		}else{
			GifActions.favGif(this.props.gif);
		}
	},


	renderFavButton : function(){
		if(!this.props.gif.id || !GifStore.getUser()) return null;

		return <div className='favIt' onClick={this.handleFavClick}>
			<i className={cx('fa', (this.isFav() ? 'fa-heart' : 'fa-heart-o'))} />
		</div>
	},

	renderGif : function(){
		var hasGif = this.props.gif.gifLink || this.props.gif.webmLink

		var webm = null;
		var backgroundImage = randomBucketImg;

		//Load HTML5 video first
		if(this.props.gif.webmLink){
			webm = <video className='gifv' autoPlay loop muted ref='gifv' poster='http://dummyimage.com/1x1/000000/fff.png'>
				<source type="video/webm" src={this.props.gif.webmLink}/>
			</video>

			backgroundImage= ''

		//Fallback to gif
		}else if(this.props.gif.gifLink){
			backgroundImage = this.props.gif.gifLink
		}

		return <div className={cx('imageContainer', {filler : !hasGif})}
				style={{backgroundImage : "url('" + backgroundImage + "')" }}>
			{webm}
		</div>
	},

	render : function(){
		return <div className='gifPreview'>
			{this.renderFavButton()}
			{this.renderGif()}
		</div>
	}
});

module.exports = GifPreview;
