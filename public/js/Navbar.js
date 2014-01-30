NavBar = xo.view.extend({
	schematic : DOM.div({class:'content'},
		DOM.a({class:'navbar__header', href:"/"}, "gifbin."),
		DOM.a({class:'navbar__item', href:"/add"}, "Add"),
		DOM.a({class:'navbar__item', href:"/categories"}, "Categories"),
		DOM.a({class:'navbar__item', href:"/about"}, "About"),


		DOM.div({class:'navbar__item right',
			   'xo-element':'logout'}, DOM.i({class:'icon-signout'}), ' Logout'),
		DOM.div({class:'navbar__item right',
			   'xo-element':'login'}, DOM.i({class:'icon-signin'}), ' Login'),
		DOM.a({class       :'navbar__item right',
			   'xo-element':'welcome',
			    target     :'_blank'})
	),

	render : function(){
		var self = this;


		var user = util.cookie.get('gifbin-user');
		if(user){
			this.dom.welcome.html('Welcome ' + user + "!");
			this.dom.welcome.attr('href', '/user/' + user);

			this.dom.login.hide();
		} else {
			this.dom.welcome.hide();
			this.dom.logout.hide();
		}

		this.dom.login.on('click', function(){
			var loginName = window.prompt("User Name?","Your Name");
			if(loginName){
				util.cookie.set('gifbin-user', loginName);
				location.reload();
			}
		});
		this.dom.logout.on('click', function(){
			util.cookie.remove('gifbin-user');
			location.reload();
		});

		return this;
	},
}).create().injectInto($('.navbar'));

