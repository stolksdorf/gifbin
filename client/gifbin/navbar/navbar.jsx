/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var GifActions = require('gifbin/gif.actions.js');
var GifStore = require('gifbin/gif.store.js');

var Link = require('gifbin/link.jsx');

var Navbar = React.createClass({
	mixins : [GifStore.mixin()],
	onStoreChange  : function(){
		this.setState({
			user: GifStore.getUser()
		});
	},

	getInitialState: function() {
		return {
			user: GifStore.getUser()
		};
	},


	handleLoginClick : function(){
		GifActions.login();
	},

	handleLogoutClick : function(){
		GifActions.logout();
	},

	renderLogout : function(){
		return [
			<Link className='welcomeMessage navItem' key='welcome' href={'/users/'+this.state.user}>
				Welcome {this.state.user}!
			</Link>,
			<div className='logout navItem' onClick={this.handleLogoutClick} key='logout'>
				<i className='fa fa-sign-out' /> logout
			</div>

		]

	},


	renderLogin : function(){
		return (
			<div className='login navItem' onClick={this.handleLoginClick}>
				<i className='fa fa-sign-in' /> login
			</div>
		);
	},

	render : function(){
		var self = this;


		var userInfo;
		if(this.state.user){
			userInfo = this.renderLogout();
		}else{
			userInfo = this.renderLogin();
		}

		return(
			<header><nav className='container'>


				<div className='userInfo'>
					{userInfo}
				</div>


				<Link href='/' className='logo navItem'>
				hey clare
				</Link>

				<Link href='/buckets' className='navItem'>
					buckets
				</Link>
				<Link href='/users' className='navItem'>
					users
				</Link>
				<Link href='/add' className='navItem'>
					add
				</Link>






			</nav></header>
		);
	}
});

module.exports = Navbar;