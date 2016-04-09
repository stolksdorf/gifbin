
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
	},

	handleSearch : function(searchObj){
		var self = this;
		this.setState({ searchObj : searchObj}, function(){
			self.forceUpdate()
		});
	},

	render : function(){

		var content = <GifContainer gifs={GifStore.searchGifs(this.state.searchObj.query)} />

		return <div className='home'>
			<Searchbar initialValue={this.state.searchObj.query} onSearch={this.handleSearch} />
			{content}
		</div>
	}
});

module.exports = Home;
