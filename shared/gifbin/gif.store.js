var _ = require('underscore');
var CookieJar = require('gifbin/cookieJar.js');
var request = require('superagent');


var Dispatcher = require('gifbin/flux.dispatcher.js');
var Warehouse = require('gifbin/flux.warehouse.js');




var Storage = {
	status : {
		errors : null,
		saving : false
	},

	buckets : {
		'approve' : {
			name : 'approve',
			img : '/assets/gifbin/bucketSelect/img/noun_49049_cc.png',
			total : 0
		},
		'mind_blown' : {
			name : 'mind blown',
			img : '/assets/gifbin/bucketSelect/img/noun_49050_cc.png',
			total : 0
		},
		'sass' : {
			name : 'sass',
			img : '/assets/gifbin/bucketSelect/img/noun_49054_cc.png',
			total : 0
		},
		'excited' : {
			name : 'excited',
			img : '/assets/gifbin/bucketSelect/img/noun_49045_cc.png',
			total : 0
		},
		'disgust' : {
			name : 'disgust',
			img : '/assets/gifbin/bucketSelect/img/noun_49053_cc.png',
			total : 0
		},
		'frustration' : {
			name : 'frustration',
			img : '/assets/gifbin/bucketSelect/img/noun_49048_cc.png',
			total : 0
		},
		'nope' : {
			name : 'nope',
			img : '/assets/gifbin/bucketSelect/img/noun_49051_cc.png',
			total : 0
		},
		'wat' : {
			name : 'wat',
			img : '/assets/gifbin/bucketSelect/img/noun_49052_cc.png',
			total : 0
		},
		'aw_yis' : {
			name : 'aw yis',
			img : '/assets/gifbin/bucketSelect/img/noun_49047_cc.png',
			total : 0
		},
		'unknown' : {
			name : 'UNKNOWN',
			img : '/assets/gifbin/bucketSelect/img/noun_49046_cc.png',
			total : 0
		}
	},

	gifs : {},

	users : {},

}

var GIFBIN_USER_KEY = 'gifbin-user';

module.exports = GifStore = Warehouse.createStore(Dispatcher,{

	setGifs : function(gifs){
		Storage.gifs = _.reduce(gifs, function(r, gif){
			r[gif.id] = gif;
			return r;
		},{});

		//Make a user list with their top viewed gif for display
		Storage.users = _.reduce(gifs, function(r, gif){
			if(!r[gif.user]){
				r[gif.user] = {
					name : gif.user,
					total : 0,
					gif : gif
				}
			}
			r[gif.user].total++;
			if(r[gif.user].gif.views < gif.views){
				r[gif.user].gif = gif
			}
			return r;
		}, {});

		//Get totals for each bucket
		_.each(gifs, function(gif){
			_.each(gif.buckets, function(bucketId){
				if(Storage.buckets[bucketId]){
					Storage.buckets[bucketId].total++;
				}
			})
		})
	},



	actions : {
		LOGIN : function(){
			var userName = prompt("Please enter your name","anon");
			if(userName){
				CookieJar.set(GIFBIN_USER_KEY, userName)
				this.emitChange();
			}
		},
		LOGOUT : function(){
			CookieJar.remove(GIFBIN_USER_KEY);
			this.emitChange();
		},


		SAVE_GIF : function(payload){
			var self = this;

			Storage.status.saving = true;
			Storage.status.errors = null;
			this.emitChange();

			request
				.post('/api/gifs')
				.send(payload.data)
				.set('Accept', 'application/json')
				.end(function(err, res){
					Storage.status.saving = false;
					if(err){
						Storage.status.errors = res;
						self.emitChange();
						return;
					}
					if(typeof payload.callback === 'function') payload.callback(res);
				})
		},
		UPDATE_GIF : function(payload){
			var self = this;

			Storage.status.saving = true;
			Storage.status.errors = null;
			this.emitChange();

			request
				.put('/api/gifs/' + payload.data.id)
				.send(payload.data)
				.set('Accept', 'application/json')
				.end(function(err, res){
					Storage.status.saving = false;
					if(err){
						Storage.status.errors = err;
						self.emitChange();
						return;
					}
					if(typeof payload.callback === 'function') payload.callback(res);
				})
		},
		DELETE_GIF : function(payload){
			var self = this;

			Storage.status.saving = true;
			Storage.status.errors = null;
			this.emitChange();

			request
				.del('/api/gifs/' + payload.id)
				.send(payload.data)
				.set('Accept', 'application/json')
				.end(function(err, res){
					Storage.status.saving = false;
					if(err){
						Storage.status.errors = err;
						self.emitChange();
						return;
					}
					if(typeof payload.callback === 'function') payload.callback(res);
				})
		},

		CHANGE_FAV_GIF : function(payload){
			var self = this;
			var gif = Storage.gifs[payload.id]

			if(payload.fav){
				gif.favs.push(GifStore.getUser());
			}else{
				gif.favs = _.without(gif.favs, GifStore.getUser());
			}

			request
				.put('/api/gifs/' + gif.id)
				.send(gif)
				.set('Accept', 'application/json')
				.end(function(err, res){
					if(err){
						Storage.status.errors = err;
					}
					self.emitChange();
				})
		},

	},



	/**
		GETTERS
	**/

	getStatus : function(){
		return Storage.status
	},
	getBuckets : function(){
		return Storage.buckets;
	},
	getGifs : function(){
		return Storage.gifs;
	},
	getGif : function(id){
		return Storage.gifs[id];
	},
	getUser : function(){
		return CookieJar.get(GIFBIN_USER_KEY);
	},
	getUsers : function(){
		return Storage.users;
	},

	search : function(searchObj){
		var result = {
			all : [],
			uploadedBy : [],
			favouritedBy : []
		}

		result.all = _.filter(Storage.gifs, function(gif){
			gif.tags = gif.tags || '';



			if(searchObj.tags.length !== 0){
				var res = _.every(searchObj.tags, function(tag){
					var exclude = false;
					if(tag[0] === '!'){
						exclude = true;
						tag = tag.substring(1);
					}

					var shouldReturn = gif.tags.toLowerCase().indexOf(tag) !== -1 || gif.buckets.join(' ').indexOf(tag) !== -1;

					return (exclude ? !shouldReturn : shouldReturn);
				});

				if(!res) return false;
			}

			if(searchObj.buckets.length !== 0 && !_.intersection(searchObj.buckets, gif.buckets).length){
				return false;
			}


			if(searchObj.users.length !== 0){
				var isUploaded = _.contains(searchObj.users, gif.user.toLowerCase());

				isFav = _.some(_.map(gif.favs, function(favUser){
					return _.contains(searchObj.users, favUser.toLowerCase());
				}))


				if(isUploaded) result.uploadedBy.push(gif);
				if(isFav) result.favouritedBy.push(gif);

				if(!isUploaded && !isFav) return false;
			}



			return true;
		});

		//Sort it
		result.all = _.sortBy(result.all, function(gif){
			return -gif.views || 0;
		})

		return result;
	},

});
