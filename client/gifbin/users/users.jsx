/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');


var GifStore = require('gifbin/gif.store.js');
var GroupCard = require('gifbin/groupCard/groupCard.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');

var Users = React.createClass({

	getInitialState: function() {
		return {
		};
	},


	componentDidMount: function() {
		document.title = 'gifbin.' + (this.props.name || 'users');
	},



	renderUserSelect : function(){
		return _.map(GifStore.getUsers(), function(user){
			console.log(user);
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

		}else{

			content = <div>
				<h1>users</h1>
				{this.renderUserSelect()}
			</div>
		}





		return(
			<div className='users'>

				{content}

			</div>
		);
	}
});

module.exports = Users;
