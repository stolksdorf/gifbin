GifbinEdit = xo.view.extend({
	view : 'edit',

	render : function()
	{
		var self = this;

		this.dom.saveButton.on('click', function(){
			self.saveGif();
		});

		this.model.onChange('link', function(){
			if(self.model.link){
				self.dom.linkField.value = self.model.link;
				self.dom.image.css('background-image',
					'url("' + self.model.link + '")');
			}
		});

		this.model.onChange('uploader', function(){
			if(self.model.uploader)
				self.dom.uploader.value = self.model.uploader;
		});

		this.model.onChange('tags', function(){
			if(self.model.tags)	self.dom.tags.value = self.model.tags.join(',');
		});

		this.model.onChange('linkCount', function(val){
			self.dom.linkCount.html(val + "");
		});

		this.model.onChange('created', function(){
			self.dom.dateUploaded.html(moment(self.model.created).fromNow());
		});

		this.dom.linkField.on("keypress", function(){
			self.dom.image.css('background-image',
				'url("' + self.dom.linkField.value + '")');
		});
		this.dom.linkField.on("change", function(){
			self.dom.image.css('background-image',
				'url("' + self.dom.linkField.value + '")');
		});



		return this;
	},

	saveGif : function(){


		var self = this;
		this.model.link = this.dom.linkField.value;
		this.model.categoryId = this.dom.category.options[this.dom.category.selectedIndex].value;

		this.model.tags = this.dom.tags.value.split(',');
		this.model.uploader = this.dom.uploader.value;

		this.model.save(function(){
			window.location.href = '/edit/' + self.model.id;
		});

		return this;
	},



})