
var React = require('react');
var _ = require('lodash');

var GifStore = require('gifbin/gif.store.js');

var Utils = require('gifbin/utils');
var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
//var GifCard = require('gifbin/gifCard/gifCard.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');

var Home = React.createClass({

	getInitialState: function() {
		return {
			searchObj : Utils.createSearchObject(GifStore.getQuery().q)
		};
	},

	componentDidMount: function() {
		document.title = 'gifbin.';

		global.store = GifStore
	},

	handleSearch : function(searchObj){
		var self = this;
		this.setState({ searchObj : searchObj}, function(){
			self.forceUpdate()
		});
	},

	render : function(){
		var self = this;


		console.log('home', this.state.searchObj.query);

		var content = <GifContainer title='test' gifs={GifStore.searchGifs(this.state.searchObj.query)} />
		/*

		var content;
		if(this.state.searchObj.query){
			content = <GifContainer searchObj={this.state.searchObj} />
		}else{

			var gifs = _.sortBy(GifStore.getGifs(), function(gif){
				return -gif.views || 0;
			});
			content = _.map(gifs, function(gif){
				return <GifCard gif={gif} key={gif.id} />
			});
		}*/
		return(
			<div className='home'>
				<Searchbar initialValue={this.state.searchObj.query} onSearch={this.handleSearch} />
				{content}
			</div>
		);
	}
});

module.exports = Home;
