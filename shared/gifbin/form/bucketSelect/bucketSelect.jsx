var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var GifStore = require('gifbin/gif.store.js');

var BucketSelect = React.createClass({
	getDefaultProps: function() {
		return {
			buckets : GifStore.getBuckets(),
			gif : {},
			onChange : function(){}
		};
	},

	selectBucket : function(bucketId){
		this.props.onChange({
			...this.props.gif,
			buckets : _.concat(this.props.gif.buckets, bucketId)
		});
	},
	unselectBucket : function(bucketId){
		this.props.onChange({
			...this.props.gif,
			buckets : _.without(this.props.gif.buckets, bucketId)
		});
	},

	renderBuckets : function(){
		return _.map(this.props.buckets, (bucket, id) => {
			var isSelected = _.includes(this.props.gif.buckets, id);
			var onclick, checkmark;
			if(isSelected){
				onclick = this.unselectBucket.bind(this, id)
				checkmark = <i className='checkmark fa fa-check-circle-o' />
			}else{
				onclick = this.selectBucket.bind(this, id)
			}

			return <div className={cx('bucketItem', {'selected' : isSelected})} onClick={onclick} key={id}>
				<img src={bucket.img} />
				<div className='bucketName'>{bucket.name}</div>
				{checkmark}
			</div>
		})
	},

	render : function(){
		return <div className='bucketSelect'>
			{this.renderBuckets()}
		</div>
	}
});

module.exports = BucketSelect;
