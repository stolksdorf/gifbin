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

		var search = Utils.getQuery(); // || "in:approve";
		var searchObj = Utils.createSearchObject(search);

		return {
			search : search,
			searchObj : searchObj
		};
	},

	componentDidMount: function() {
		document.title = 'gifbin.';

		console.log(GifStore.getGifs());
	},

	handleSearch : function(search){

		var searchObj = Utils.createSearchObject(search);


		this.setState({
			search : search,
			searchObj : searchObj
		});

	},





	render : function(){
		var self = this;


		var content;
		if(this.state.search){
			content = <GifContainer searchObj={this.state.searchObj} />
		}else{
			content = _.map(GifStore.getGifs(), function(gif){
				return <GifCard gif={gif} key={gif.id} />
			});
		}


		return(
			<div className='home'>
				<Searchbar value={this.state.search} onSearch={this.handleSearch} />

				{content}



			</div>
		);
	}
});

module.exports = Home;
