/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Router = require('gifbin/router.js');

var Navbar = require('./navbar/navbar.jsx');
var Footer = require('./footer/footer.jsx');

var GifStore = require('gifbin/gif.store.js');

//Pages
var Home = require('./home/home.jsx');
var Edit = require('./edit/edit.jsx');
var Add = require('./add/add.jsx');
var Buckets = require('./buckets/buckets.jsx');
var Users = require('./users/users.jsx');



var Gifbin = React.createClass({

	getInitialState: function() {
		return {
			hasExtensionInstalled: true
		};
	},

	componentWillMount: function() {
		var self = this;
		this.router = Router(this, {

			'/users' : function(){
				return <Users />
			},
			'/users/:id' : function(args){
				return <Users name={args.id} args={args} key={args.id}/>
			},
			'/buckets' : function(){
				return <Buckets />
			},
			'/buckets/:id' : function(args){
				return <Buckets bucketId={args.id} args={args} key={args.id} />
			},
			'/add' : function(args){
				return <Add queryLink={args.query.i} />
			},
			'/edit/:id' : function(args){
				return <Edit gif={GifStore.getGif(args.id)} />
			},
			'/' : function(args){
				return <Home  />
			},
			'' : function(args){
				return <Home  />
			},
			'*' : function(){
				return <div>404</div>
			}
		});


		GifStore.setGifs(this.props.gifs);
		this.executeRouting(this.props.url);
	},

	componentDidMount: function() {
		var self = this;
		if(typeof window === 'undefined') window={};
		window.onHistoryChange = function() {
			self.executeRouting(window.location.pathname);
		}

		this.extensionCheck();
	},

	executeRouting : function(path){
		this.setState({
			page : this.router.match(path)
		});
	},

	extensionCheck : function(){
		var self = this;
		chrome.runtime.sendMessage('mahbghldlglligfmhahgpdbjhehgeimd', { message: "version" },
			function (reply) {
				if (reply && reply.version == 1) {
					self.setState({
						hasExtensionInstalled : true
					})
				}
			});
	},



	render : function(){
		var self = this;

		var extMsg;
		if(!this.state.hasExtensionInstalled){
			extMsg = <a href='google.com'>You should totaly get the extension</a>
		}


		return(
			<div className='gifbin'>
				<Navbar />
				<div className='container'>
					{this.state.page}
				</div>
				{extMsg}
			</div>
		);
	}
});

module.exports = Gifbin;
