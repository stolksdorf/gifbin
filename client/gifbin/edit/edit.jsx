var React = require('react');
var _ = require('lodash');

var GifStore = require('gifbin/gif.store.js');


var GifPreview = require('gifbin/form/gifPreview/gifPreview.jsx');
var BucketSelect = require('gifbin/bucketSelect/bucketSelect.jsx');


var deep_clone = function(obj){
	return JSON.parse(JSON.stringify(obj));
}

var Edit = React.createClass({
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


	componentDidMount: function() {
		document.title = 'gifbin.edit';
	},



	render : function(){

		console.log(this.props.gif);

		return <div className='edit'>



			<div className='left'>

				<GifPreview gif={this.state.gif} originalFavs={this.state.originalFavs} />

			</div>



			<div className='right'>
				{this.state.gif.gifLink}

				<div className='bucket formItem' key='bucket'>
					<label>bucket</label>
					<BucketSelect selectedBuckets={this.state.gif.buckets} onChange={this.handleBucketChange} />
				</div>

			</div>
		</div>
	}
});

module.exports = Edit;
