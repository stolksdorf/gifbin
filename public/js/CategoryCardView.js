CategoryView = xo.view.extend({
	schematic : DOM.a({class:'category'},
		DOM.img({class:'category__gifContainer', 'xo-element' : 'gifContainer'}),
		DOM.div({class:'category__name', 'xo-element' : 'name'}),
		DOM.div({class:'category__stats'},
			DOM.span({'xo-element' : 'gifCount'}),
			" gifs - ",
			DOM.span({'xo-element' : 'linkCount'}),
			" links")
	),

	render : function(){
		this.dom.view.attr('href', '/category/' + this.model.category);
		this.dom.name.text(this.model.category);
		this.dom.gifCount.text(this.model.numGifs);
		this.dom.linkCount.text(this.model.totalLinks);

		//this.gifView = CardView.create(this.model.gifModel).appendTo(this.dom.gifContainer);
		this.dom.gifContainer.attr('src', this.model.gifModel.staticLink);
		return this;
	},

});
