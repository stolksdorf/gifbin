/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Link = require('gifbin/link.jsx');
var GifStore = require('gifbin/gif.store.js');

var Utils = require('gifbin/utils');
var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');


var Buckets = React.createClass({

	getInitialState: function() {
		var search;

		if(this.props.bucketId){
			search = "in:" + this.props.bucketId;
		}

		search = Utils.getQuery() || search;

		return {
			search : search,
			searchObj : Utils.createSearchObject(search)
		};
	},

	componentDidMount: function() {
		document.title = 'gifbin.buckets';
	},


	handleSearch : function(search){
		this.setState({
			search : search,
			searchObj : Utils.createSearchObject(search)
		});
	},


	renderBucketSelect : function(){
		return _.map(GifStore.getBuckets(), function(bucket, id){

			return <Link className='bucketSelect' key={id} href={'/buckets/' + id }>
				<img src={bucket.img} />
				<div className='name'>{bucket.name}</div>
			</Link>

		})
	},


	render : function(){
		var self = this;


		var content;
		if(this.state.search){
			content = <GifContainer searchObj={this.state.searchObj} />
		}else{
			content = <div>
				<h1>buckets</h1>
				{this.renderBucketSelect()}
			</div>
		}



		return(
			<div className='buckets'>
				<Searchbar value={this.state.search} onSearch={this.handleSearch} />

				{content}
			</div>
		);
	}
});

module.exports = Buckets;
