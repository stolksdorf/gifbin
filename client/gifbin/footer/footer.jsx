/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var cx = require('classnames');

var Footer = React.createClass({

	getInitialState: function() {
		return {
			hasExtensionInstalled : true,
		};
	},

	componentDidMount: function(){
		var self = this;
	//	setTimeout(function(){
			self.extensionCheck();
	//	}, 2000);
	},

	extensionCheck : function(){
		var self = this;
		if(typeof chrome === 'undefined') return;
		chrome.runtime.sendMessage('mahbghldlglligfmhahgpdbjhehgeimd', { message: "version" },
			function (reply) {
				self.setState({
					hasExtensionInstalled : (reply && reply.version == 1)
				})
			});
	},

	render : function(){
		var self = this;


		var rightColumn = (
			<div className={cx('info col4 rightColumn', {'offset4' : this.state.hasExtensionInstalled})}>
				<h2><i className='fa fa-cog' /> What is this jazz?</h2>
				<p>I made gifbin to share my love of gifs.</p>
				<ul>
					<li>there is no moderation on the site.</li>
					<li>no accounts</li>
					<li>no passwords</li>
				</ul>
				<p>
					I wanted to keep the experience as smooth as possible.
					Please be mindful and respect that.
				</p>
			</div>
		);


		if(!this.state.hasExtensionInstalled){
			var getTheExtension = (
				<a className='extension col4 rightColumn' href='https://google.com' target="_blank">
					<h2><i className='fa fa-rocket' /> Up your gif game</h2>
					<p>Did you know there's a gifbin extension?</p>
					<p>
						Automagically add gifs from anywhere on the web simply by right-clicking
					</p>
					<i className='fa fa-external-link gogetit' />
				</a>
			);
		}


		return(
			<footer>
				<div className='container row'>
					<div className='about col4'>
						<h3>About</h3>
						<p>
							This page was made with <i className='fa fa-heart' />
						</p>
						<p>
							Everything you see here was written by Scott Tolksdorf. <br /> Check out more cool stuff below.
						</p>
						<p className="icons">
							<a target="_blank" href="http://stolksdorf.com"><i className="fa fa-home"></i></a>
							<a target="_blank" href="mailto:scott.tolksdorf@gmail.com"><i className="fa fa-envelope"></i></a>
							<a target="_blank" href="https://github.com/stolksdorf"><i className="fa fa-github"></i></a>
							<a target="_blank" href="http://stolksdorf.throwww.com/"><i className="fa fa-pencil"></i></a>
							<a target="_blank" href="https://twitter.com/stolksdorf"><i className="fa fa-twitter"></i></a>
							<a target="_blank" href="https://www.facebook.com/scott.tolksdorf"><i className="fa fa-facebook"></i></a>
							<a target="_blank" href="http://ca.linkedin.com/pub/scott-tolksdorf/19/132/53a"><i className="fa fa-linkedin"></i></a>
						</p>
					</div>

					{getTheExtension}

					{rightColumn}



				</div>
			</footer>
		);
	}
});

module.exports = Footer;