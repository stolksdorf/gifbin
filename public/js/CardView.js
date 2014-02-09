CardView = xo.view.extend({
	schematic : DOM.div({class:"card"},
		DOM.a({class:"card__imageContainer",
			'xo-element' : 'imageContainer'},
			DOM.img({class : 'card__gif', 'xo-element' : 'image'}),
			DOM.img({class : 'card__staticImage', 'xo-element' : 'staticImage'})
		)
	),
	render : function(){
		var self = this;

		this.model.onChange({
			'link' : function(link){
				self.dom.image.attr('src', link)
			},
			'staticLink' : function(staticLink){
				self.dom.staticImage.attr('src', staticLink)
			},
			'id' : function(id){
				self.dom.imageContainer.attr('href', '/edit/' + id);
			}
		});


		this.model.on('matched', function(isMatched){
			if(isMatched){
				self.dom.view.css('display', 'inline-block');
				self.dom.view.addClass('matched');
			} else {
				self.dom.view.css('display', 'none');
				self.dom.view.removeClass('matched');
			}
		})


		this.dom.imageContainer.on('mouseover', function(){
			self.hover();
		});
		this.dom.imageContainer.on('mouseout', function(){
			self.unhover();
		});


		//Download BUtton
		this.downloadBtn = DownloadBtnComponent.create(self.model).prependTo(this.dom.imageContainer);
		this.downloadBtn.dom.view.addClass('card__button');
		this.downloadBtn.dom.view.addClass('card__downloadButton');


		//Setup link button
		this.copyLinkBtn = LinkBtnComponent.create(self.model).prependTo(this.dom.imageContainer);
		this.copyLinkBtn.dom.view.addClass('card__copyButton');
		this.copyLinkBtn.dom.view.addClass('card__button');

		this.copyLinkBtn.on('mouseover', function(){
			self.hover();
		});
		this.copyLinkBtn.on('mouseout', function(){
			self.unhover();
		});

		return this;
	},

	hover : function(){
		clearTimeout(this.hoverTimeOut);
		this.dom.view.addClass('hovered');

		//restarts the gif animation
		if(!this.dom.view.hasClass('hovered')){
			this.dom.image.attr('src', this.model.link);
		}
	},
	unhover : function(){
		var self = this;
		this.hoverTimeOut = setTimeout(function(){
			self.dom.view.removeClass('hovered');
		}, 10);
	},


});

