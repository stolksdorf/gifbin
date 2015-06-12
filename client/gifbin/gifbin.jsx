/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Router = require('gifbin/router.js');

var Navbar = require('./navbar/navbar.jsx');
var Footer = require('./footer/footer.jsx');


var GifCard = require('gifbin/gifCard/gifCard.jsx');



var Gifbin = React.createClass({


	componentWillMount: function() {
		this.router = Router(this, {
			'' : function(){
				return <div>Hey</div>
			}
		})
		this.executeRouting(this.props.url);
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

				{this.state.page}


				<div className='container'>

					<GifCard />
					<GifCard />

				</div>


			</div>
		);
	}
});

module.exports = Gifbin;
