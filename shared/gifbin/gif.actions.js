var dispatch = require('pico-flux').dispatch;

module.exports = {
	login  : function(){
		dispatch('LOGIN');
	},
	logout : function(){
		dispatch('LOGOUT');
	},

	saveGif : function(gifData, callback){
		dispatch('SAVE_GIF', gifData, callback);
	},
	updateGif : function(gifData, callback){
		dispatch('UPDATE_GIF', gifData, callback);
	},
	deleteGif : function(gifId, callback){
		dispatch('DELETE_GIF', gifId, callback);
	},

	favGif : function(gifId){
		dispatch('CHANGE_FAV_GIF', gifId, true);
	},
	unfavGif : function(gifId){
		dispatch('CHANGE_FAV_GIF', gifId, false);
	},
}
