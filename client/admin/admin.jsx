/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var request = require('superagent');

var Admin = React.createClass({

	renderStats : function(){
		var users = _.groupBy(this.props.gifs, function(gif){
			return gif.user;
		})

		return (
			<div className='stats'>
				<h3>Stats</h3>
				<div>
					<label>Unique users</label>
					<div className='data'>{_.keys(users).length}</div>
				</div>
				<div>
					<label>Unique gifs</label>
					<div className='data'>{this.props.gifs.length}</div>
				</div>
			</div>
		)
	},

	dropDatabase : function(){
		request
			.get('/api/admin/drop')
			.query({admin_key : this.props.ADMIN_KEY + 1})
			.end(function(err, res){
				console.log(err, res);
			})
	},

	render : function(){
		var self = this;
		return(
			<div className='admin'>
				<header>
					<div className='container'>
						<i className='fa fa-rocket' />
						gifbin admin
					</div>
				</header>

				<div className='container'>

					<div className='buttonContainer'>
						<button className='exportButton'>
							<i className='fa fa-download' />
							Export Database
						</button>

						<button className='importButton'>
							<i className='fa fa-cloud-upload' />
							Import Database
						</button>

						<button className='trashButton' onClick={this.dropDatabase}>
							<i className='fa fa-trash' />
							Drop Database
						</button>
					</div>

					{this.renderStats()}

				</div>
			</div>
		);
	}
});

module.exports = Admin;
