var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
var GifStore = require('gifbin/gif.store.js');

var UserPage = React.createClass({
	getDefaultProps: function() {
		return {
			userName : ''
		};
	},

	render : function(){
		var self = this;
		return(
			<div className='userPage'>
				<GifContainer
					title={'favvies favs of ' + this.props.userName}
					gifs={GifStore.searchGifs('fav:' + this.props.userName)}
				/>

				<GifContainer
					title={'uploaded by ' + this.props.userName}
					gifs={GifStore.searchGifs('by:' + this.props.userName)}
				/>
			</div>
		);
	}
});

module.exports = UserPage;
