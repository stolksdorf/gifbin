
var React = require('react');
var _ = require('lodash');
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

	downloadFile : function(contents, filename){
		document.body.innerHTML += '<a id="downloadAnchorElem" style="display:none"></a>';
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(contents);
		var dlAnchorElem = document.getElementById('downloadAnchorElem');
		dlAnchorElem.setAttribute("href", dataStr);
		dlAnchorElem.setAttribute("download", filename);
		dlAnchorElem.click();
		document.body.removeChild(dlAnchorElem);
	},

	exportDatabase : function(){
		var self = this;
		request
			.get('/api/admin/export')
			.query({admin_key : this.props.ADMIN_KEY})
			.end(function(err, res){
				console.log(err, res);
				var dateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
				var filename = 'gifbin-dump-' + dateString + '.json';
				self.downloadFile(JSON.stringify(JSON.parse(res.text), null, '\t'), filename);
			});
	},

	dropDatabase : function(){
		request
			.get('/api/admin/drop')
			.query({admin_key : this.props.ADMIN_KEY})
			.end(function(err, res){
				if(!err) alert('All gifs removed.');
				window.location.reload();
			});
	},

	importDatabase : function(e){
		var self = this;
		this.fileReader.onload = function() {
			var text = self.fileReader.result;
			request
				.post('/api/admin/import')
				.query({admin_key : self.props.ADMIN_KEY})
				.send(JSON.parse(self.fileReader.result))
				.end(function(err, res){
					if(!err) alert('Gifs imported.');
					window.location.reload();
				});
		}
		this.fileReader.readAsText(this.refs.fileUpload.getDOMNode().files[0]);
	},

	componentDidMount: function() {
		this.fileReader = new FileReader();
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
						<button className='exportButton' onClick={this.exportDatabase}>
							<i className='fa fa-download' />
							Export Database
						</button>

						<div className='importContainer'>
							<button className='importButton'>
								<i className='fa fa-cloud-upload' />
								Import Database
							</button>
							<input type="file" onChange={this.importDatabase} ref='fileUpload' />
						</div>

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
