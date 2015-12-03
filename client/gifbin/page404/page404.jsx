
var React = require('react');
var _ = require('lodash');

var Page404 = React.createClass({

	componentDidMount: function() {
		document.title = 'gifbin.404';
	},

	render : function(){
		var self = this;
		return(
			<div className='page404'>
				<img src='/assets/gifbin/page404/pusheen.png' />
				<h1>oops.</h1>
				<div>gibin done goof'd</div>
			</div>
		);
	}
});

module.exports = Page404;
