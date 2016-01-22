
var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var GifStore = require('gifbin/gif.store.js');

var BucketSelect = React.createClass({

	getDefaultProps: function() {
		return {
			buckets : GifStore.getBuckets(),
			selectedBuckets : [],
			onChange : function(){}
		};
	},


	selectBucket : function(bucketId){
		this.props.selectedBuckets.push(bucketId);
		this.props.onChange(this.props.selectedBuckets);
	},

	unselectBucket : function(bucketId){
		this.props.onChange(_.without(this.props.selectedBuckets, bucketId))
	},

	render : function(){
		var self = this;


		var buckets = _.map(this.props.buckets, function(bucket, id){

			var isSelected = _.includes(self.props.selectedBuckets, id);
			var onclick, checkmark;
			if(isSelected){
				onclick = self.unselectBucket.bind(self, id)
				checkmark = <i className='checkmark fa fa-check-circle-o' />
			}else{
				onclick = self.selectBucket.bind(self, id)
			}

			return <div className={cx('bucketItem', {'selected' : isSelected})} onClick={onclick} key={id}>
				<img src={bucket.img} />
				<div className='bucketName'>{bucket.name}</div>
				{checkmark}
			</div>
		})

		return(
			<div className='bucketSelect'>
				{buckets}


			</div>
		);
	}
});

module.exports = BucketSelect;
