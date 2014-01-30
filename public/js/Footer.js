Footer = xo.view.extend({
	schematic : DOM.div({class:'content'},
	DOM.div({class:'footer__about'},
		DOM.h3({}, "About"),
		DOM.p({},
			"This page was made with love."
		),
		DOM.p({}, "Everything you see here was written by Scott Tolksdorf. Check out more cool stuff below."),
		DOM.p({ class:'footer__about__icons'},
			DOM.a({ target:'_blank', href:'http://stolksdorf.com'}, DOM.i({ class:'icon-home'})),
			DOM.a({ target:'_blank', href:"mailto:scott.tolksdorf@gmail.com"}, DOM.i({ class:'icon-envelope'})),
			DOM.a({ target:'_blank', href:'https://github.com/stolksdorf' }, DOM.i({ class:'icon-github'})),
			DOM.a({ target:'_blank', href:'http://stolksdorf.throwww.com/'}, DOM.i({ class:'icon-pencil'})),
			DOM.a({ target:'_blank', href:'https://twitter.com/stolksdorf'}, DOM.i({ class:'icon-twitter'})),
			DOM.a({ target:'_blank', href:'https://www.facebook.com/scott.tolksdorf'}, DOM.i({ class:'icon-facebook'})),
			DOM.a({ target:'_blank', href:'http://ca.linkedin.com/pub/scott-tolksdorf/19/132/53a'}, DOM.i({ class:'icon-linkedin'}))
		)
	),

	DOM.div({class:'footer__license'},
		DOM.h2({}, "What is this jazz?"),
		DOM.p({},
			"I made gifbin to share my love of gifs."
		),
		DOM.p({}, "There is no moderation on the site. No accounts, no passwords. I wanted to keep the experience as smooth as possible. Please be mindful and respect that :)"),
		DOM.p({},
			DOM.a({ target:'_blank', href:'http://i.imgur.com/guoze.gif'}, "I hope you like this as much as I do.")
		)
	)
)
}).create().injectInto($('.footer'));


