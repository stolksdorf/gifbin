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
var Page404 = require('./page404/page404.jsx')



var Gifbin = React.createClass({

	componentWillMount: function() {
		var self = this;
		this.router = Router(this, {

			'/users' : function(){
				return <Users />
			},
			'/users/:id' : function(args){
				return <Users name={decodeURIComponent(args.id)} args={args} key={args.id}/>
			},
			'/buckets' : function(){
				return <Buckets />
			},
			'/buckets/:id' : function(args){
				return <Buckets bucketId={decodeURIComponent(args.id)} args={args} key={args.id} />
			},
			'/add' : function(args){
				return <Add />
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
				return <Page404 />
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
	},

	executeRouting : function(path){
		this.setState({
			page : this.router.match(path)
		});
	},


	render : function(){
		var self = this;
		return(
			<div className='gifbin'>
				<Navbar />
				<div className='container page'>
					{this.state.page}
				</div>

				<Footer />
			</div>
		);
	}
});

module.exports = Gifbin;
