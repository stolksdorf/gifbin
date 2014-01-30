GifbinEdit = xo.view.extend({
	view : 'edit',

	render : function()
	{
		var self = this;

		if(this.model.id) this.setEditMode();

		this.dom.saveButton.on('click', function(){
			self.saveGif();
		});
		this.dom.deleteButton.on('click', function(){
			if(confirm("Delete this gif?")){
				self.model.delete(function(){
					window.location.href = '/';
				});
			}
		});

		this.copyLinkBtn = Gifbin_LinkBtn.create(self.model).injectInto(this.dom.link);

		//Build Categories
		utils.map(GifCategories, function(category){
			self.dom.category.append('<option value="' + category + '">' +category+'</option>');
		});

		//Load user
		if(!this.editMode) this.dom.uploaderField.val(util.cookie.get('gifbin-user'));

		this.model.onChange('link', function(link){
			self.dom.linkField.val(link);
			self.dom.linkText.html(link);
			self.dom.image.css('background-image','url("' + link + '")');
		});
		this.model.onChange('category', function(category){
			self.dom.category.find("option[value='"+category+"']").prop('selected', true);
		});
		this.model.onChange('user', function(user){
			self.dom.uploader.html(user);
			self.dom.uploader.attr('href', '/user/' + user);
		});
		this.model.onChange('tags', function(tags){
			if(tags) self.dom.tags.val(tags.join(', '));
		});
		this.model.onChange('linkCount', function(count){
			self.dom.linkCount.html(count);
		});
		this.model.onChange('created', function(created){
			self.dom.dateUploaded.html(moment(created).fromNow());
		});

		//Update image on linkfield change
		this.dom.linkField.change(function(){
			self.dom.image.css('background-image',
				'url("' + self.dom.linkField.val() + '")');
		});
		this.dom.linkField.keyup(function(){
			self.dom.image.css('background-image',
				'url("' + self.dom.linkField.val() + '")');
		});

		return this;
	},

	saveGif : function(){
		var self = this;
		this.model.link = this.dom.linkField.val();
		this.model.category = this.dom.category.val();
		this.model.tags = utils.map(this.dom.tags.val().split(','), function(tag){
			return tag.trim();
		});
		this.model.user = this.dom.uploaderField.val();
		//Save User in Cookie
		if(!this.editMode) util.cookie.set('gifbin-user', this.dom.uploaderField.val());
		//Redirect on Save
		this.model.save(function(){
			window.location.href = '/edit/' + self.model.id;
		});
		return this;
	},

	setEditMode : function(){
		this.editMode = true;

		this.dom.deleteButton.show();
		this.dom.link.show();
		this.dom.linkField.hide();

		this.dom.uploader.show();
		this.dom.uploaderField.hide();

		document.title = "gifbin.edit";

		return this;
	},



})