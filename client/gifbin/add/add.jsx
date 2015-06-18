/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var request = require('superagent');

var BucketSelect = require('gifbin/bucketSelect/bucketSelect.jsx');


String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var Add = React.createClass({
/*
	getInitialState: function() {
		return {
			gif : {
				link: "http://i.imgur.com/DxHVTt2.gif",
				user : 'Scott',
				tags : "Mind blown, so cool, aw yis",
				buckets : ['approve']
			}
		};
	},
*/

	getInitialState: function() {
		return {
			gif:{
				link: "",
				user : '',
				tags : "",
				buckets : []
			}
		};
	},

	componentDidMount: function() {
		document.title = 'gifbin.add';
		if(typeof document !== 'undefined' && document.location.search){
			var path = document.location.search;
			var query = _.object(_.map(path.substring(path.indexOf('?')+1).split('&'), function(part){
				return part.split('=');
			}));
			this.setLink(query.i);
		}
	},

	convertLinkToGif : function(linkPath){
		return linkPath.replace('.webm', '.gif').replace('.gifv', '.gif')
	},

	setLink : function(link){
		this.state.gif.link = this.convertLinkToGif(link);
		this.setState({
			gif : this.state.gif
		});
	},

	handleLinkChange : function(e){
		this.setLink(e.target.value);
	},

	handleTagChange : function(e){
		this.state.gif.tags = e.target.value
		this.setState({
			gif : this.state.gif
		});
	},

	handleBucketChange : function(buckets){
		this.state.gif.buckets = buckets;
		this.setState({
			gif : this.state.gif
		});
	},


	handleSave : function(){

		console.log(this.state);

		request
			.post('/api/gif')
			.send(this.state.gif)
			.set('Accept', 'application/json')
			.end(function(err, res){
				console.log(err, res);
			})

	},


	render : function(){
		var self = this;

		var ip = this.state.gif.link;


		var buckets;


		return(
			<div className='add'>

				<div className='imageSide '>
					<div className='imageContainer' style={{backgroundImage : "url('" + ip + "')" }} />
				</div>

				<div className='dataSide'>

					<div className='formItem'>
						<label>Link</label>
						<input className='link' type='text' value={ip} onChange={this.handleLinkChange} />

					</div>

					<div className='formItem'>
						<label>Bucket</label>

						<BucketSelect selectedBuckets={this.state.gif.buckets} onChange={this.handleBucketChange} />

					</div>

					<div className='formItem'>
						<label>Tags</label>
						<textarea className='tags' value={this.state.gif.tags} onChange={this.handleTagChange} />
					</div>

					<button onClick={this.handleSave}> <i className='fa fa-save' /> Save</button>


				</div>
			</div>
		);
	}
});

module.exports = Add;
