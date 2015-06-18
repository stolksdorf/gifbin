/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var GifStore = require('gifbin/gifstore');


var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');

var Searchbar = require('gifbin/searchBar/searchBar.jsx');


var Home = React.createClass({

	getInitialState: function() {

		var search = GifStore.getQuery() || "in:approve";
		var searchObj = GifStore.createSearchObject(search);

		return {
			search : search,
			searchObj : searchObj
		};
	},

	componentDidMount: function() {
		document.title = 'gifbin.';
	},

	handleSearch : function(search){

		var searchObj = GifStore.createSearchObject(search);


		this.setState({
			search : search,
			searchObj : searchObj
		});

	},

	render : function(){
		var self = this;




		return(
			<div className='home'>

				<Searchbar value={this.state.search} onSearch={this.handleSearch} />

				<GifContainer searchObj={this.state.searchObj} />

			</div>
		);
	}
});

module.exports = Home;
