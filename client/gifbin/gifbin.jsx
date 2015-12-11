var React = require('react');
var _ = require('lodash');

var Navbar = require('./navbar/navbar.jsx');
var Footer = require('./footer/footer.jsx');
var GifStore = require('gifbin/gif.store.js');

//Pages
var Home = require('./home/home.jsx');
var Edit = require('./edit/edit.jsx');
var Add = require('./add/add.jsx');
var BucketSelect = require('./bucketSelect/bucketSelect.jsx');
var UserSelect = require('./userSelect/userSelect.jsx');
var UserPage = require('./userPage/userPage.jsx');
var ChangelogPage = require('./changelogPage/changelogPage.jsx');

var Page404 = require('./page404/page404.jsx');


/** TODO
	- Make a deadicated page for individual users to simplifed a bunch of things
	- Change the bucket's link to just a query mapping
	- Favving is broken
*/

var GifBinRouter = require('pico-router').createRouter({
	'/'        : <Home />,
	'/users'   : <UserSelect />,
	'/buckets' : <BucketSelect />,
	'/add'     : <Add />,
	'/whatsnew': <ChangelogPage />,

	'/users/:userName' : function(args){
		return <UserPage userName={decodeURIComponent(args.userName)} />
	},
	'/edit/:gifId' : function(args){
		return <Edit gif={GifStore.getGif(args.gifId)} />
	},

	'*' : <Page404 />
});


var Gifbin = React.createClass({
	getDefaultProps: function() {
		return {
			gifs : [],
			cookies : {},
			url : ''
		};
	},

	componentWillMount: function() {
		GifStore.init({
			gifs : this.props.gifs,
			user : this.props.cookies['gifbin-user'],
			url : this.props.url
		})
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
