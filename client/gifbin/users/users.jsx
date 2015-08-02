/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Utils = require('gifbin/utils');
var GifStore = require('gifbin/gif.store.js');
var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
var GroupCard = require('gifbin/groupCard/groupCard.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');

var Users = React.createClass({

	componentDidMount: function() {
		document.title = 'gifbin.' + (this.props.name || 'users');
	},

	getInitialState: function() {
		var search;
		if(this.props.name){
			search = "by:" + this.props.name;
		}
		search = Utils.getQuery() || search;
		return {
			search : search,
			searchObj : Utils.createSearchObject(search)
		};
	},

	handleSearch : function(search){
		this.setState({
			search : search,
			searchObj : Utils.createSearchObject(search)
		});
	},

	renderUserSelect : function(){
		return _.map(GifStore.getUsers(), function(user){
			return <GroupCard
				key={user.name}
				img={user.gif.imgLink}
				title={user.name}
				total={user.total}
				link={"/users/" + user.name}
			/>
		})
	},

	render : function(){
		var self = this;

		var content;
		if(this.state.search){
			content = <GifContainer searchObj={this.state.searchObj} />
		}else{
			content = <div className='content'>
				<h1>users</h1>
				{this.renderUserSelect()}
			</div>
		}

		return(
			<div className='users'>
				<Searchbar value={this.state.search} onSearch={this.handleSearch} />
				{content}
			</div>
		);
	}
});

module.exports = Users;
