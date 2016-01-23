var React = require('react');
var _ = require('lodash');
var cx = require('classnames');
var GifStore = require('gifbin/gif.store.js');
var GroupCard = require('gifbin/groupCard/groupCard.jsx');

var Buckets = React.createClass({
	componentDidMount: function() {
		document.title = 'gifbin.buckets';
	},

	renderBucketSelect : function(){
		return _.map(GifStore.getBuckets(), function(bucket, id){
			return <GroupCard
				key={id}
				img={bucket.img}
				title={bucket.name}
				total={bucket.total}
				link={'/?q=in:' + id}
			/>
		})
	},

	render : function(){
		return(
			<div className='buckets'>
				<div className='content'>
					<h1>buckets</h1>
					{this.renderBucketSelect()}
				</div>
			</div>
		);
	}
});

module.exports = Buckets;
