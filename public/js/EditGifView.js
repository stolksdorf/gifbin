EditGifView = xo.view.extend({
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

		this.copyLinkBtn = LinkBtnComponent.create(self.model).appendTo(this.dom.link);

		CategoryCollection.each(function(category){
			self.dom.category.append('<option value="' + category.id + '">' +category.name+'</option>');
		});

		//Build Categories
		CategoryCollection.on('add', function(category){
			self.dom.category.append('<option value="' + category.id + '">' +category.name+'</option>');
		})

		//Load user
		if(!this.editMode) this.dom.uploaderField.val(util.cookie.get('gifbin-user'));


		this.model.onChange({
			link : function(link){
				self.dom.linkField.val(link);
				self.dom.linkText.html(link);
				self.dom.image.css('background-image','url("' + link + '")');
			},
			category_id : function(category_id){
				self.selectCategoryById(category_id);
			},
			user : function(user){
				self.dom.uploader.html(user);
				self.dom.uploader.attr('href', '/user/' + user);
			},
			tags : function(tags){
				if(tags) self.dom.tags.val(tags.join(', '));
			},
			linkCount : function(count){
				self.dom.linkCount.html(count);
			},
			created : function(created){
				self.dom.dateUploaded.html(moment(created).fromNow());
			}
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

		this.dom.addCategoryBtn.click(function(){
			var categoryName = window.prompt("Category name","2kool 4skool");
			if(categoryName){
				var newCategory = xo.model.create({name : categoryName})
				newCategory.save(function(){
					CategoryCollection.add(newCategory);
					self.selectCategoryById(newCategory.id);
				})
			}
		})

		return this;
	},

	saveGif : function(){
		var self = this;

		this.model.category_id = this.dom.category.val();
		this.model.category = this.dom.category.find('option:selected').text();
		this.model.tags = utils.map(this.dom.tags.val().split(','), function(tag){
			return tag.trim();
		});


		//Save User in Cookie
		if(!this.editMode){
			util.cookie.set('gifbin-user', this.dom.uploaderField.val());
			this.model.user = this.dom.uploaderField.val();
			this.model.link = this.dom.linkField.val();
		}

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

	selectCategoryById : function(categoryId){
		this.dom.category.find("option[value='"+categoryId+"']").prop('selected', true);
		return this;
	},



})