/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var Link = require('gifbin/link.jsx');
var GifStore = require('gifbin/gif.store.js');

var Utils = require('gifbin/utils');
var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');
var GroupCard = require('gifbin/groupCard/groupCard.jsx');


var Buckets = React.createClass({
	componentDidMount: function() {

		console.log(this.props);
		document.title = 'gifbin.' + (this.props.bucketId || 'buckets');
	},


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


	handleSearch : function(search){
		this.setState({
			search : search,
			searchObj : Utils.createSearchObject(search)
		});
	},


	renderBucketSelect : function(){
		return _.map(GifStore.getBuckets(), function(bucket, id){
			return <GroupCard
				key={id}
				img={bucket.img}
				title={bucket.name}
				link={'/buckets/' + id}
			/>

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
