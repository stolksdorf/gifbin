var r = function(path, id){
	if(id) return path +'/' + id;
	return path;
}


module.exports = {
	home : function(){
		return '/'
	},
	edit : function(id){
		return '/edit/' + id
	},
	add : function(){
		return '/add';
	},
	user : function(id){
		return r('/user', id);
	},
	bucket : function(id){
		return r('/buckets', id)
	}
}