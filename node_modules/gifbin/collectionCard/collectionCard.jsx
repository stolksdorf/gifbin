/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var cx = require('classnames');

var Copy = require('gifbin/clipboardButton/clipboardButton.jsx');

var GifCard = React.createClass({

	getDefaultProps: function() {
		return {
			gif : {
				link : "http://i.imgur.com/Mk76H.gif",
				staticLink : "http://i.imgur.com/Mk76Hs.gif",
				favourite : true,
				viewCount : 334,

			}
		};
	},

	getInitialState: function() {
		return {
			hovered: false
		};
	},

	componentDidMount: function() {
		var self = this;
		var ZeroClipboard = require('zeroclipboard');
		var hitbox = this.refs.hitbox.getDOMNode()
		this.zc = new ZeroClipboard(hitbox);

		this.zc.setText(this.props.gif.link);

		this.zc.on( "aftercopy", function( event ) {
			console.log('test');
		} );
	},

	hover : function(){
		this.setState({
			hovered : true
		})

		clearTimeout(this.timeout);
	},

	unhover : function(){
		var self = this;
		this.timeout = setTimeout(function(){

		}, 50)

		self.setState({
			hovered : false
		})
	},


	render : function(){
		var self = this;

		var gif, copy;
		if(this.state.hovered){
			gif = <img className='gif' src={this.props.gif.link} ref='gif' />

		}


		return(
			<div className={cx('gifCard2', {'hovered' : this.state.hovered})}>
				<img className="static" src={this.props.gif.staticLink} />
				{gif}
				<div className='hitbox' onMouseOver={this.hover} onMouseOut={this.unhover} ref='hitbox'>

					<div className='linkButton'>
						<i className='fa fa-link' />

					</div>

				</div>

			</div>
		);
	}
});

module.exports = GifCard;