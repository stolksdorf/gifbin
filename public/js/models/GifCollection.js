GifCollection = xo.collection.extend({
	model : GifModel,


	search : function(terms){

		var result = util.reduce(this.models, function(result, gif){
			if(gif.match(terms)) result.push(gif);
			return result;
		}, []);

		return result;
	},

	getCategoryBest : function(){
		var result = {};
		this.each(function(gif){
			if(!result[gif.category]){
				result[gif.category] = {
					category : gif.category,
					link : gif.link,
					count : gif.linkCount || 0
				}
				return;
			}

			if(result[gif.category].count < gif.linkCount){
				result[gif.category] = {
					category : gif.category,
					link : gif.link,
					count : gif.linkCount
				}
			}
		})
		return result;
	},
});