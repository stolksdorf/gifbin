/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Navbar = React.createClass({

	render : function(){
		var self = this;
		return(
			<header><nav className='container'>
				<a href='/' className='logo'>
					gifbin.
				</a>

				<a href='/add' className='item'>
					add
				</a>
				<a href='/' className='item'>
					all
				</a>
				<a href='/' className='item'>
					users
				</a>
				<a href='/' className='item'>
					category
				</a>


				<div className='login item'>
					<i className='fa fa-sign-in' /> login
				</div>


			</nav></header>
		);
	}
});

module.exports = Navbar;