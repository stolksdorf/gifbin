
var React = require('react');
var _ = require('lodash');

var GifStore = require('gifbin/gif.store.js');
var GifCard = require('gifbin/gifCard/gifCard.jsx');

var GifContainer = React.createClass({

/*
	mixins : [GifStore.mixin()],

	onStoreChange  : function(){
		this.setState({
			featured: GifStore.getFeaturedState(),
			all: GifStore.getAppsState(),
		});
	},
*/

	getDefaultProps: function() {
		return {
			searchObj : {}
		};
	},

/*
	makeUserResults : function(gifs){
		var searchObj = this.props.searchObj;
		var userText = searchObj.users.join(', ');

		if(searchObj.buckets.length){
			userText += ' in ' + searchObj.buckets.join(', ')
		}

		return <div className='gifCollection'>
			<GifBox title={"Fav by " + userText} gifs={gifs.favouritedBy} />
			<GifBox title={"Uploaded by " + userText} gifs={gifs.uploadedBy} />
		</div>

	},
*/

	render : function(){
		var self = this;
		var searchObj = this.props.searchObj;
		var gifs = GifStore.search(this.props.searchObj);

		var titleText = '';
		if(searchObj.buckets.length){
			titleText += 'in ' + searchObj.buckets.join(', ');
		}

		if(searchObj.users.length){
			titleText = searchObj.users.join(', ') + ' ' + titleText;

			return <div className='gifCollection'>
				<GifBox title={"favvies favs of " + titleText} gifs={gifs.favouritedBy} />
				<GifBox title={"uploaded by " + titleText} gifs={gifs.uploadedBy} />
			</div>
		}

		return <GifBox title={titleText} gifs={gifs.all} />
	}
});


var GifBox = React.createClass({
	getDefaultProps: function() {
		return {
			title : null,
			gifs : []
		};
	},
	renderTitle : function(){
		if(!this.props.title) return null;
		return <h1>{this.props.title}</h1>
	},
	renderEmptyMessage : function(){
		if(this.props.gifs.length) return null;
		return(
			<div className='emptyMessage'>
				<i className='fa fa-frown-o' />
				{_.sample([
					'No gifs bruh',
					'INSSUFFICIENT RESULTS FOR MEANINGFUL SEARCH',
					'Your gifs are in another castle',
					"We couldn't find anything"
				])}
			</div>
		);
	},
	render : function(){
		var gifs = _.map(this.props.gifs, function(gif){
			return <GifCard gif={gif} key={gif.id} />
		});
		return(
			<div className='gifContainer'>
				{this.renderTitle()}
				{gifs}
				{this.renderEmptyMessage()}
			</div>
		);
	}
});


module.exports = GifBox;
