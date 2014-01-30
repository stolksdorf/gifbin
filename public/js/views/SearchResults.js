SearchResults = xo.view.extend({
	schematic : DOM.div({}
		//DOM.div({class:'', 'xo-element' : 'container'})
	),

	initialize : function(){
		this.collection = this.model;
		return this;
	},

	render : function(){
		var self = this;

		this.collection.each(function(gif){
			var newView = GifCard.create(gif).injectInto(self.dom.view);
		})

		this.searchBar.on('searching', function(){
			if(self.dom.view.is(':visible')) self.dom.view.stop().fadeTo(300, 0.4);
		});
		this.searchBar.on('searched', function(terms){
			self.collection.search(terms);
			if(self.dom.view.is(':visible')) self.dom.view.stop().fadeTo(100, 1);
		});

		return this;
	},










});