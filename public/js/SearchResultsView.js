SearchResultsView = xo.view.extend({
	schematic : DOM.div({class : 'searchResults', style : 'text-align: center'},
		DOM.div({'xo-element' : 'container', style : ''}),
		DOM.div({class : 'noResults', 'xo-element' : 'noResults'}, 'No results :(')
	),

	initialize : function(){
		this.collection = this.model;
		return this;
	},

	render : function(){
		var self = this;

		//this.collection.on('add', function(gif){...})

		this.collection.each(function(gif){
			var newView = CardView.create(gif).appendTo(self.dom.container);
		});

		this.searchBar.on('searching', function(){
			if(self.dom.view.is(':visible')) self.dom.view.stop().fadeTo(300, 0.4);
		});
		this.searchBar.on('searched', function(terms){
			self.search(terms);
		});

		this.dom.container.isotope({
			itemSelector : '.card',
			layoutMode : 'masonry'
		});

		return this;
	},

	search : function(terms){
		var searchResult = this.collection.search(terms);
		if(this.dom.view.is(':visible')) this.dom.view.stop().fadeTo(100, 1);

		if(searchResult.length) this.dom.noResults.fadeOut();
		else this.dom.noResults.fadeIn();

		this.dom.container.isotope({ filter: '.matched' });
		return this;
	},


});

css.render({
	'.searchResults' : {
		'margin-bottom' : '50px'
	},
	'.noResults' : {
		'display' : 'none',
		'text-align': 'center',
		'font-size': '2em',
		'margin-top': '60px',
		'color': '#b6b6b6'
	}
})