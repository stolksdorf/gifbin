var React = require('react');
var _ = require('lodash');


var Navbar = require('./navbar/navbar.jsx');
var Footer = require('./footer/footer.jsx');
var GifStore = require('gifbin/gif.store.js');

//Pages
var Home = require('./home/home.jsx');
var Edit = require('./edit/edit.jsx');
var Add = require('./add/add.jsx');
var Buckets = require('./buckets/buckets.jsx');
var Users = require('./users/users.jsx');
var Page404 = require('./page404/page404.jsx');

var GifBinRouter = require('pico-router').createRouter({
	'/'        : <Home />,
	'/users'   : <Users />,
	'/buckets' : <Buckets />,
	'/add'     : <Add />,

	'/users/:id' : function(args){
		return <Users name={decodeURIComponent(args.id)} args={args} key={args.id}/>
	},
	'/buckets/:id' : function(args){
		return <Buckets bucketId={decodeURIComponent(args.id)} args={args} key={args.id} />
	},
	'/edit/:id' : function(args){
		return <Edit gif={GifStore.getGif(args.id)} />
	},

	'*' : <Page404 />
});


var Gifbin = React.createClass({
	componentWillMount: function() {
		GifStore.setGifs(this.props.gifs);
	},

	render : function(){
		return(
			<div className='gifbin'>
				<Navbar />
				<div className='container page'>
					<GifBinRouter initialUrl={this.props.url} />
				</div>
				<Footer />
			</div>
		);
	}
});


module.exports = Gifbin;
