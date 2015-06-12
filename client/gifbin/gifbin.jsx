/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Router = require('gifbin/router.js');

var Navbar = require('./navbar/navbar.jsx');
var Footer = require('./footer/footer.jsx');


var GifCard = require('gifbin/gifCard/gifCard.jsx');


var GifStore = require('gifbin/gifstore');



var Gifbin = React.createClass({


	componentWillMount: function() {
		var self = this;
		this.router = Router(this, {

			'/users' : function(){
				return <div>users</div>
			},
			'/users/:id' : function(args){
				return <div arg={args} >{args.id}</div>
			},
			'/buckets' : function(){
				return <div>buckets</div>
			},
			'/buckets/:id' : function(args){
				return <div>{args.id}</div>
			},
			'/add' : function(args){
				return <div>add</div>
			},
			'/edit/:id' : function(args){
				return <div>edit</div>
			},
			'/' : function(){
				return <div>Hey</div>
			},
			'' : function(){
				return <div>Hey</div>
			},
			'*' : function(){
				return <div>404</div>
			}
		});

		global.window.onHistoryChange = function() {
			self.executeRouting(global.window.location.pathname);
		}
		this.executeRouting(this.props.url);
	},

	executeRouting : function(path){
		this.setState({
			page : this.router.match(path)
		});
	},



	render : function(){
		var self = this;


		var gifs = _.map(GifStore.getGifs(), function(gif){
			return <GifCard gif={gif} key={gif.id} />
		})


		return(
			<div className='gifbin'>
				<Navbar />

				{this.state.page}


				<div className='container'>

					{gifs}

				</div>


			</div>
		);
	}
});

module.exports = Gifbin;
