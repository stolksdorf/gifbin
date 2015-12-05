
var React = require('react');
var _ = require('lodash');

var Link = require('pico-router').Link;
var GifStore = require('gifbin/gif.store.js');

var Utils = require('gifbin/utils');
var GifContainer = require('gifbin/gifContainer/gifContainer.jsx');
var Searchbar = require('gifbin/searchBar/searchBar.jsx');
var GroupCard = require('gifbin/groupCard/groupCard.jsx');


var Buckets = React.createClass({
	componentDidMount: function() {
		document.title = 'gifbin.' + (this.props.bucketId || 'buckets');
	},

	getInitialState: function() {
		var search;
		if(this.props.bucketId){
			search = "in:" + this.props.bucketId;
		}
		search = Utils.getQuery() || search;
		return {
			initialValue : search,
			searchObj : Utils.createSearchObject(search)
		};
	},

	handleSearch : function(searchObj){
		var self = this;
		this.setState({ searchObj : searchObj}, function(){
			self.forceUpdate()
		});
	},

	renderBucketSelect : function(){
		return _.map(GifStore.getBuckets(), function(bucket, id){
			return <GroupCard
				key={id}
				img={bucket.img}
				title={bucket.name}
				total={bucket.total}
				link={'/buckets/' + id}
			/>

		})
	},

	render : function(){
		var self = this;
		var content;

		if(this.state.searchObj.query){
			content = <GifContainer searchObj={this.state.searchObj} />
		}else{
			content = <div className='content'>
				<h1>buckets</h1>
				{this.renderBucketSelect()}
			</div>
		}

		return(
			<div className='buckets'>
				<Searchbar initialValue={this.state.initialValue} onSearch={this.handleSearch} />
				{content}
			</div>
		);
	}
});

module.exports = Buckets;
