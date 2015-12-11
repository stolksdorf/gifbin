var React = require('react');
var _ = require('lodash');

var GifActions = require('gifbin/gif.actions.js');
var GifStore = require('gifbin/gif.store.js');

var Link = require('pico-router').Link;

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
		return <header><nav className='container'>
			<div className='userInfo'>
				{this.state.user ? this.renderLogout() : this.renderLogin()}
			</div>

			<Link href='/' className='logo navItem'>gifbin.</Link>
			<Link href='/buckets' className='navItem'>buckets</Link>
			<Link href='/users' className='navItem'>users</Link>
			<Link href='/add' className='navItem'>add</Link>
			<Link href='/whatsnew' className='navItem'>what's new</Link>
		</nav></header>
	}
});

module.exports = Navbar;