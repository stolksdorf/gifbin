var request = require('superagent');

var clientID

module.exports = {
	clientID : null,
	setClientID : function(clientID){
		this.clientID = clientID;
	},
	upload : function(url, cb){
		request.post('https://api.imgur.com/3/upload')
			.set({'Authorization': 'Client-ID ' + this.clientID})
			.type('form')
			.send({
				'type' : 'url',
				'image' : url
			})
			.end(function(err, res){
				if(err) return cb(err);
				return cb(err, res.body.data);
			})
	},
	getData : function(imgID, cb){
		request.get('https://api.imgur.com/3/image/' + imgID)
			.set({'Authorization': 'Client-ID ' + this.clientID})
			.end(function(err, res){
				if(err) return cb(err);
				return cb(err, res.body.data);
			})
	}
}