var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var GifStore = require('gifbin/gif.store.js');
var GroupCard = require('gifbin/groupCard/groupCard.jsx');

var UserSelect = React.createClass({
	renderUserSelect : function(){
		var users = _.sortBy(GifStore.getUsers(), function(user){
			return -user.totalGifs;
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
		return <div className='userSelect'>
			<div className='content'>
				<h1>users</h1>
				{this.renderUserSelect()}
			</div>
		</div>
	}
});

module.exports = UserSelect;
