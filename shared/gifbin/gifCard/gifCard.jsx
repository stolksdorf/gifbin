var React = require('react');
var _ = require('lodash');
var cx = require('classnames');
var ClipboardButton = require('gifbin/clipboardButton/clipboardButton.jsx');

var Link = require('pico-router').Link;
var GifStore = require('gifbin/gif.store.js');

var GifCard = React.createClass({
	getDefaultProps: function() {
		return {
			gif : {
				link: "http://i.imgur.com/PyPM10X.gif",
				user: "Kellen",
				tags: "computer,kid,thumbs up,90s",
				views: 0,
				buckets: ["groos"],
				favs: [ ],
				created: "2014-01-31T17:05:13.486Z",
				webmLink: "http://i.imgur.com/PyPM10X.webm",
				gifvLink: "http://i.imgur.com/PyPM10X.gifv",
				imgLink: "http://i.imgur.com/PyPM10Xs.jpg",
				id: "5582f4a8161b6db41f000001"
			}
		};
	},

	getInitialState: function() {
		return {
			hovered: false
		};
	},
	hover : function(){
		clearTimeout(this.timeout);
		if(this.state.hovered) return;

		if(!this.state.webmLoaded){
			this.refs.gifvSource.setAttribute('src', this.props.gif.webmLink);
			this.refs.gifv.load()
		}

		this.setState({
			hovered : true
		});
	},

	unhover : function(){
		var self = this;
		this.timeout = setTimeout(function(){
			self.setState({
				hovered : false
			})
			if(self.refs){
				//$(self.refs.hitbox..find('.clipboardButton').removeClass('zeroclipboard-is-hover');
			}
		}, 50)
	},

	componentDidMount: function() {
		var self = this;
		this.refs.gifv.oncanplay = function(){

			self.setState({
				webmLoaded : true
			});

			self.refs.gifv.oncanplay = null
		}
		this.refs.gifvSource.onerror = function(err){
			//console.log('ERROR', this.props, err);
		};
	},

	componentWillUnmount : function(){
		clearTimeout(this.timeout);
	},

	isFav : function(){
		return _.contains(this.props.gif.favs, GifStore.getUser());
	},



	renderVideoElement : function(){
		return (
			<video className='gif' autoPlay loop muted ref='gifv' poster='http://dummyimage.com/1x1/000000/fff.png'>
					<source type="video/webm" ref='gifvSource'/>
			</video>
		);
	},

	renderFav : function(){
		if(!GifStore.getUser()) return null;
		if(!this.isFav()) return null;

		return <div className='fav'>
			<i className='fa fa-heart' />
		</div>
	},


	render : function(){
		var self = this;

		return(
			<div className={cx('gifCard', {'hovered' : this.state.hovered, 'isFav' : this.isFav()})}>
				<img className="static" src={this.props.gif.imgLink} />

				{this.renderVideoElement()}

				<div className='hitbox' onMouseMove={this.hover} onMouseOut={this.unhover} ref='hitbox'>
					<div className='controls'>
						<ClipboardButton
							className='gifButton'
							icon='fa-link'
							tooltip='gif'
							tooltipDone='copied!'
							link={this.props.gif.gifLink} />

						<ClipboardButton
							className='gifvButton'
							link={this.props.gif.gifvLink}
							tooltip='gifv'
							tooltipDone='hq copied!'
							icon='fa-rocket' />


						<Link href={'/edit/' + this.props.gif.id} className='editButton'>
							<i className='fa fa-pencil-square-o' />
						</Link>
					</div>
				</div>
				<div className='info'>
					{this.renderFav()}
					<div className='views'>
						{Number(this.props.gif.views).toLocaleString('en')}
					</div>
				</div>

			</div>
		);
	}
});

module.exports = GifCard;