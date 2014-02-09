CategoryView = xo.view.extend({
	schematic : DOM.a({class:'category'},
		DOM.div({class:'category__gifContainer', 'xo-element' : 'gifContainer'}),
		//DOM.div({class:'category__title'},
			DOM.div({class:'category__name', 'xo-element' : 'name'}),
			DOM.div({class:'category__stats'},
				DOM.span({'xo-element' : 'gifCount'}),
				" gifs - ",
				DOM.span({'xo-element' : 'linkCount'}),
				" links")
		//)
	),

	render : function(){
		this.dom.view.attr('href', '/category/' + this.model.category);
		this.dom.name.text(this.model.category);
		this.dom.gifCount.text(this.model.numGifs);
		this.dom.linkCount.text(this.model.totalLinks);

		this.gifView = CardView.create(this.model.gifModel).appendTo(this.dom.gifContainer);
		return this;
	},

});


/*

css.render({
	'.category' : {
		'display': 'inline-block',
		'vertical-align' : 'top',
		'background-color': '#ECF0F1',
		'cursor': 'pointer',
		'text-align': 'center',
		'padding': '20px',
		'padding-top': '10px',
		'margin': '5px',
		'width': '140px',
		'text-decoration': 'none',
		'transition': '0.25s',
		'-webkit-transition': '0.25s',
	},
		'.category__title' : {
			'margin-bottom': '7px',

			'font-size': '1.5em',
			'color': '#2C3E50',
		},
		'.category__image' : {
			'max-height': '150px',
			'max-width': '140px',
		},


		'.category:hover' : {
			'background-color': '#E1E5E5',
		},

		'.category:first-child' : {
			'margin-left': '0px',
		}
})

*/