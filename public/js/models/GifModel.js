GifModel = xo.model.extend({
	URL : function(){
		return "/api/gif"
	},

	initialize : function(){
		var self = this;
		/*this.onChange('category_id', function(c_id){
			if(c_id){
				var name = GifCategories.get(c_id).name;
				if(name) self.category = name;
			}
		});*/
		return this;
	},

	linkCount : 0,

	increaseLinkCount : function(){
		this.save({linkCount : this.linkCount+1});
		return this;
	},

	match : function(terms){
		var self = this;
		if(typeof terms === 'string'){
			terms = [terms];
		}

		var contains = function(str, target){
			if(typeof str !== 'string'){ return false;}
			return str.toLowerCase().indexOf(target.toLowerCase()) !== -1;
		}

		//Search through the title, description, group and keywords to match each term
		var found = util.every(terms, function(term){
			return util.some(self.tags, function(tag){
				return contains(tag, term);
			})	|| contains(self.category, term)
				|| contains(self.user, term)
		});

		this.trigger('matched', found);
		return found;
	},

})