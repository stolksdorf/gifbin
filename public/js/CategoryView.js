CategoryView = xo.view.extend({
	schematic : DOM.a({class:'category'},
		DOM.div({'xo-element' : 'title', class:'category__title'}),
		DOM.img({'xo-element' : 'image', class:'category__image'})
	),

	render : function(){
		this.dom.view.attr('href', '/category/' + this.model.category);
		this.dom.title.text(this.model.category);
		this.dom.image.attr('src', this.model.link);
		return this;
	},

});


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