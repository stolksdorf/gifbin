var _ = require('lodash');
var CookieJar = require('gifbin/cookieJar.js');
var request = require('superagent');

var flux = require('pico-flux');

var onBrowser = (typeof window !== 'undefined');
var serversideUserId;

var GIFBIN_USER_KEY = 'gifbin-user';

var Storage = {
	status : {
		errors : null,
		saving : false
	},

	buckets : require('./bucketData.js'),
	gifs : {},
	users : {},
}



module.exports = flux.createStore({
	LOGIN : function(){
		var userName = prompt("Please enter your name","anon");
		if(userName){
			CookieJar.set(GIFBIN_USER_KEY, userName)
			this.emitChange();
		}
		return false;
	},
	LOGOUT : function(){
		CookieJar.remove(GIFBIN_USER_KEY);
	},

	SET_PENDING : function(){
		Storage.status.saving = true;
		Storage.status.errors = null;
	},
	SET_ERRORS : function(errors){
		Storage.status.saving = false;
		Storage.status.errors = errors;
	},
	SET_FINISHED : function(){
		Storage.status.saving = false;
		Storage.status.errors = false;
		return false;
	},

	UPDATE_GIF : function(gifData){
		Storage.gifs[gifData.id] = gifData;
	},
	REMOVE_GIF : function(gifId){
		delete Storage.gifs[gifData.id];
	},

},{


	setGifStorage : function(gifs){
		var updateGifs = function(gif){
			Storage.gifs[gif.id] = gif;
		};
		var updateUsers = function(gif){
			var user = Storage.users[gif.user] || {
				name : gif.user,
				totalGifs : 0,
				topGif : gif
			}
			user.totalGifs += 1;
			if(user.topGif.views < gif.views){
				user.topGif = gif
			}
			Storage.users[gif.user] = user;
		};
		var updateBuckets = function(gif){
			_.each(gif.buckets, function(bucketId){
				if(Storage.buckets[bucketId]) Storage.buckets[bucketId].total += 1;
			})
		}
		_.each(gifs, function(gif){
			updateGifs(gif);
			updateUsers(gif);
			updateBuckets(gif);
		});
	},
	setUserServerside : function(user){
		serversideUserId = user
	},



	/** GETTERS **/

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
		return (onBrowser ? CookieJar.get(GIFBIN_USER_KEY) : serversideUserId)
	},
	getUsers : function(){
		return Storage.users;
	},





	//TODO: Needs cleanup
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

				var isFav = _.some(_.map(gif.favs, function(favUser){
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



})
