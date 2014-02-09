SearchResultsView = xo.view.extend({
	schematic : DOM.div({class : 'searchResults', style : 'text-align: center'},
		DOM.div({class : 'noResults', 'xo-element' : 'noResults'}, 'No results :(')
	),

	initialize : function(){
		this.collection = this.model;
		return this;
	},

	render : function(){
		var self = this;

		this.collection.each(function(gif){
			var newView = CardView.create(gif).prependTo(self.dom.view);
		});

		this.searchBar.on('searching', function(){
			if(self.dom.view.is(':visible')) self.dom.view.stop().fadeTo(300, 0.4);
		});
		this.searchBar.on('searched', function(terms){
			var searchResult = self.collection.search(terms);
			if(self.dom.view.is(':visible')) self.dom.view.stop().fadeTo(100, 1);


			if(searchResult.length) self.dom.noResults.fadeOut();
			else self.dom.noResults.fadeIn();
		});

		return this;
	},


});

css.render({
	'.noResults' : {
		'display' : 'none',
		'text-align': 'center',
		'font-size': '2em',
		'margin-top': '60px',
		'color': '#b6b6b6'
	}
})