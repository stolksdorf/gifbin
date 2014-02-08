GifCollection = xo.collection.extend({
	model : GifModel,

	search : function(terms){
		var result = util.reduce(this.models, function(result, gif){
			if(gif.match(terms)) result.push(gif);
			return result;
		}, []);

		return result;
	},

	getCategoryBest : function(gifCats){
		var result = {}
		gifCats.each(function(gifCat){
			result[gifCat.id] = {
				category : gifCat.name,
				count : 0
			}
		});
		this.each(function(gif){
			if(result[gif.category_id]){
				if(result[gif.category_id].count <= gif.linkCount){
					result[gif.category_id] = {
						category : gif.category,
						link : gif.link,
						count : gif.linkCount
					}
				}
			}
		})
		return result;
	},
}).create();