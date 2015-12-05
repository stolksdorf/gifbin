
var React = require('react');
var _ = require('lodash');

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
			search = "user:" + this.props.name;
		}
		search = Utils.getQuery() || search;
		return {
			initialValue : search,
			searchObj : Utils.createSearchObject(search)
		};
	},

	handleSearch : function(searchObj){
		var self = this;
		this.setState({ searchObj : searchObj}, function(){
			self.forceUpdate()
		});
	},


	renderUserSelect : function(){
		var users = _.sortBy(GifStore.getUsers(), function(user){
			return -user.total;
		});
		return _.map(users, function(user){
			return <GroupCard
				key={user.name}
				img={user.topGif.imgLink}
				title={user.name}
				total={user.totalGifs}
				link={"/users/" + user.name}
			/>
		})
	},

	render : function(){
		var self = this;

		var content;
		if(this.state.searchObj.query){
			content = <GifContainer searchObj={this.state.searchObj} />
		}else{
			content = <div className='content'>
				<h1>users</h1>
				{this.renderUserSelect()}
			</div>
		}

		return(
			<div className='users'>
				<Searchbar initialValue={this.state.initialValue} onSearch={this.handleSearch} />
				{content}
			</div>
		);
	}
});

module.exports = Users;
