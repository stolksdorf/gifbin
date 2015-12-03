
var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Link = require('gifbin/link.jsx');

var ExtensionCheck = React.createClass({

	getInitialState: function() {
		return {
			hasExtensionInstalled : true,
		};
	},


	componentDidMount: function(){
		var self = this;
		setTimeout(function(){
			//self.extensionCheck();
		}, 2000);
	},

	extensionCheck : function(){
		var self = this;
		if(typeof chrome === 'undefined') return;
		chrome.runtime.sendMessage('mahbghldlglligfmhahgpdbjhehgeimd', { message: "version" },
			function (reply) {
				console.log(reply);
				self.setState({
					hasExtensionInstalled : (reply && reply.version == 1)
				})
			});
	},

	render : function(){
		var self = this;
		return(
			<Link className={cx('extensionCheck', {'show' : !this.state.hasExtensionInstalled})}
				href='google.com' target='_blank'>
				There's a Gifbin extension!
			</Link>
		);
	}
});

module.exports = ExtensionCheck;
