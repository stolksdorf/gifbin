var React = require('react');
var _ = require('lodash');



var GifForm = require('gifbin/form/form.jsx');


/*
var GifStore = require('gifbin/gif.store.js');





var deep_clone = function(obj){
	return JSON.parse(JSON.stringify(obj));
}

var getGifDisplayPath = function(gif){
	if(gif.webmLink) return gif.webmLink;
	if(gif.gifLink) return gif.gifLink;
	return gif.originalLink;
}

var getGifExt = function(gif){
	var path = getGifDisplayPath();
	return path.substr(path.lastIndexOf('.')+1);
}
*/

var Edit = React.createClass({


	componentDidMount: function() {
		document.title = 'gifbin.edit';
	},

/*

	mixins : [GifStore.mixin()],
	onStoreChange  : function(){
		this.setState({
			originalFavs : GifStore.getGif(this.props.gif.id).favs,
			status : GifStore.getStatus()
		});
	},
	getDefaultProps: function() {
		return {
			gif : {}
		};
	},
	getInitialState: function() {
		return {
			originalFavs: this.props.gif.favs,
			gif : deep_clone(this.props.gif)
		};
	},
*/


	//TODO : Move Bucket select into the form
	render : function(){


		return <div className='edit'>


			<GifForm gif={this.props.gif} />

		</div>
	}
});

module.exports = Edit;

