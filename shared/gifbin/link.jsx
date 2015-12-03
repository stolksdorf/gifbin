/** @jsx React.DOM */
require('gifbin/polyfills');
var React = require('react');
var _ = require('underscore');
var cx = require('classnames');
var Router = require('gifbin/router');

var Link = React.createClass({

	isDownload : function(){
		var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
		return this.props.href && this.props.href.match(filetypes);
	},

	isExternal : function(){
		return this.props.href && (this.props.href.match(/^https?\:/i)) && (!this.props.href.match(document.domain))
	},

	analytics : function(e){
		var href = this.props.href;
		var category;

		//External Link
		if(this.isExternal()) category = 'external';

		//Download Link
		if(this.isDownload()) category = 'download';

		//If a non-internal link, send event
		if(category){
			ga('send', 'event', category, 'click', href);
		}

		//For custom event tracking
		if(this.props.track){
			ga('send', 'event', this.props.track, 'click', href);
		}

	},

	click : function(passedOnClick, e){
		var self = this;
		//run exsisting events
		if (_.isFunction(passedOnClick)) passedOnClick(e);

		//Do some analytics
		if(typeof ga !== 'undefined') this.analytics(e);

		// Ignore canceled events, modified clicks, and right clicks.
		if (e.defaultPrevented) return;
		if (e.metaKey || e.ctrlKey || e.shiftKey) return;
		if (e.button !== 0) return;

		// Get the <a> element.
		var el = e.target;
		while (el && el.nodeName !== 'A'){ el = el.parentNode; }
		if (!el) return;                                  // Ignore clicks from non-a elements.
		if (el.target && el.target !== '_self') return;   // Ignore the click if the element has a target.
		if (!!el.attributes.download || this.isDownload()) return;             // Ignore the click if it's a download link.

		//Prevent a race condition when tracking external links with GA
		if(this.isExternal() && typeof ga !== 'undefined'){
			setTimeout(function() { location.href = self.props.href; }, 200);
			e.stopPropagation();
			e.preventDefault();
			return;
		}

		Router.navigate(this.href, this.props.forceReload);
		e.preventDefault();
	},

	render : function(){
		this.href = this.props.href;
		var other = _.omit(this.props, 'className');
		other = _.omit(other, 'onClick');

		var className = cx(this.props.className, { 'link' : typeof this.props.children != 'string' });
		var onClick = this.click.bind(this, this.props.onClick);

		return <a onClick={onClick} className={className} {...other} />
	},

});

module.exports = Link;
