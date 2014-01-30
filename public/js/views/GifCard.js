GifCard = xo.view.extend({
	schematic : DOM.div({class:"card"},
		DOM.div({class:"card__expandHover"}, DOM.i({class:"icon-plus"})),
		DOM.div({class:"card__imageContainer"},
			DOM.img({'xo-element' : 'image'})
		),
		DOM.a({'xo-element' : 'pageBtn',
				class:"btn blue card__linkButton hint--bottom",
				'data-hint':"View Gif Page",
				target : '_blank'}, DOM.i({class:"icon-external-link"}))
	),
	render : function(){
		var self = this;

		this.model.onChange('link', function(link){
			self.dom.image.attr('src', link)
		});
		this.model.onChange('id', function(id){
			self.dom.pageBtn.attr('href', '/edit/' + id);
		});

		this.model.on('matched', function(isMatched){
			if(isMatched){
				self.dom.view.show();
			} else {
				self.dom.view.hide();
			}
		})

		this.copyLinkBtn = Gifbin_LinkBtn.create(self.model).injectInto(this.dom.view);
		this.copyLinkBtn.dom.view.addClass('card__copyButton');

		this.copyLinkBtn.on('mouseover', function(){
			console.log('hovering');
			self.dom.view.addClass('hovered');
		});
		this.copyLinkBtn.on('mouseout', function(){
			self.dom.view.removeClass('hovered');
		});


		return this;
	},
});

css.render({
	'.card' : {
		'display': 'inline-block',
		'vertical-align': 'top',
		'z-index': '500',

		'height': '140px',
		'width': '100px',
		'margin': '5px',
		'padding': '15px',

		'text-align': 'center',
		'transition': '0.25s',
		'-webkit-transition': '0.25s',
	},

		'.card__imageContainer' : {
			'position': 'relative',
			'height': '100px',
			'margin-bottom': '10px',
		},

			'.card__expandHover' : {
				'position': 'absolute',
				'z-index': '401',

				'padding': '7px',

				'cursor': 'pointer',
				'opacity': '0',
				'font-size': '0.75em',
				'color': 'white',

				'transition': '0.25s',
				'-webkit-transition': '0.25s',
			},

			'.card__imageContainer > img' : {
				'position': 'relative',
				'display': 'block',
				'z-index': '20',

				'max-height': '100px',
				'max-width': '100px',

				'transition': '0.25s',
				'transition-property': 'max-height,max-width',
				'-webkit-transition': '0.25s',
				'-webkit-transition-property': 'max-height,max-width',
			},

			'.card__copyButton, .card__linkButton' : {
				'display': 'none',
				'z-index': '2',

				'transition': '0.25s',
				'-webkit-transition': '0.25s',
			},

			'.card__copyButton' : {
				'margin-right': '5px',
			},

		'.card:hover, .card.hovered' : {
			'background-color': '#ECF0F1',
		},

		'.card:hover .card__copyButton, .card:hover .card__linkButton' : {
			'display': 'inline-block',
		},
		'.card.hovered .card__copyButton, .card.hovered .card__linkButton' : {
			'display': 'inline-block',
		},

		'.card:hover .card__expandHover, .card.hovered .card__expandHover' : {
			'opacity': '1',
		},

		'.card__expandHover:hover + .card__imageContainer > img' : {
			'z-index': '400',
			'max-height': '300px',
			'max-width': '300px',
		},
})

