/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Link = require('gifbin/link.jsx');

var Navbar = React.createClass({

	render : function(){
		var self = this;

		return(
			<header><nav className='container'>
				<Link href='/' className='logo'>
					gifbin.
				</Link>

				<Link href='/buckets' className='item'>
					buckets
				</Link>
				<Link href='/users' className='item'>
					users
				</Link>
				<Link href='/add' className='item'>
					add
				</Link>

				<div className='login item'>
					<i className='fa fa-sign-in' /> login
				</div>
			</nav></header>
		);
	}
});

module.exports = Navbar;