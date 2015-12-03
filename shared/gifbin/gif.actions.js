var Dispatcher = require('gifbin/flux.dispatcher.js');


module.exports = {
	//User
	login  : function(){
		Dispatcher.dispatch({
			type : 'LOGIN'
		});
	},
	logout : function(){
		Dispatcher.dispatch({
			type : 'LOGOUT'
		});
	},

	saveGif : function(gifData, callback){
		Dispatcher.dispatch({
			type : 'SAVE_GIF',
			payload : {
				data     : gifData,
				callback : callback
			}
		});
	},

	updateGif : function(gifData, callback){
		Dispatcher.dispatch({
			type : 'UPDATE_GIF',
			payload : {
				data     : gifData,
				callback : callback
			}
		});
	},

	deleteGif : function(gifId, callback){
		Dispatcher.dispatch({
			type : 'DELETE_GIF',
			payload : {
				id : gifId,
				callback : callback
			}
		});
	},




	favGif : function(gifId){
		Dispatcher.dispatch({
			type : 'CHANGE_FAV_GIF',
			payload : {
				id : gifId,
				fav : true
			}
		});
	},
	unfavGif : function(gifId){
		Dispatcher.dispatch({
			type : 'CHANGE_FAV_GIF',
			payload : {
				id : gifId,
				fav : false
			}
		});
	},


}
