var React = require('react');
var _ = require('lodash');
var cx = require('classnames');
var marked = require('marked');
var request = require('superagent');

var ChangelogPage = React.createClass({

	getInitialState: function() {
		return {
			pending: true,
			errors : null,
			log : null
		};
	},

	componentDidMount: function() {
		var self = this;
		request.get('https://raw.githubusercontent.com/stolksdorf/gifbin/master/changelog.md')
			.end(function(err, res){
				if(err){
					self.setState({
						pending : false,
						errors : err
					})
					return;
				}
				self.setState({
					log : res.text,
					pending : false
				});
			});
	},

	renderPending : function(){
		if(this.state.pending){
			return <div className='pending'>
				<i className='fa fa-spinner fa-spin' />
			</div>
		}
	},

	renderLog : function(){
		if(this.state.log){
			return <div dangerouslySetInnerHTML={{__html : marked(this.state.log)}} />;
		}
	},

	render : function(){
		var self = this;
		return(
			<div className='changelogPage'>
				{this.renderPending()}
				{this.renderLog()}
			</div>
		);
	}
});

module.exports = ChangelogPage;
