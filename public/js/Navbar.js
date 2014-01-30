NavBar = xo.view.extend({
	schematic : DOM.div({class:'content'},
		DOM.a({class:'navbar__header', href:"/"}, "gifbin."),
		DOM.a({class:'navbar__item', href:"/add"}, "Add"),
		DOM.a({class:'navbar__item', href:"/categories"}, "Categories"),
		DOM.a({class:'navbar__item', href:"/about"}, "About"),

		DOM.a({class       :'navbar__item right',
			   'xo-element':'welcome',
			    target:'_blank'})
	),

	render : function(){
		var user = util.cookie.get('gifbin-user');
		if(user){
			this.dom.welcome.html('Welcome ' + user);
			this.dom.welcome.attr('href', '/user/' + user);
		}
		return this;
	},
}).create().injectInto($('.navbar'));

