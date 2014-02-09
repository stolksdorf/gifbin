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
		var result = {}
		this.each(function(gif){
			var catId = gif.category_id;
			if(!result[catId]){
				result[catId] = {
					category : gif.category,
					gifModel : gif,
					numGifs : 0,
					totalLinks : 0,
				}
			}
			result[catId].numGifs++;
			result[catId].totalLinks += gif.linkCount;
		});
		return result;
	},
}).create();