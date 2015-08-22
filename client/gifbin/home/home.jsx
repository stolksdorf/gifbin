/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

//var GifStore = require('gifbin/gif.store.js');

var Utils = require('gifbin/utils');
var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
var GifCard = require('gifbin/gifCard/gifCard.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');

var Home = React.createClass({

	getInitialState: function() {
		return {
			searchObj : Utils.createSearchObject(Utils.getQuery())
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
		var self = this;

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
		}
		return(
			<div className='home'>
				<Searchbar initialValue={Utils.getQuery()} onSearch={this.handleSearch} />
				{content}
			</div>
		);
	}
});

module.exports = Home;
