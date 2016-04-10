var _ = require('lodash');
var cookieJar = {
	get: function(key){
		if(typeof window === 'undefined') return;
		_.reduce(document.cookie.split(';'), (r, crumb)=>{
			console.log(crumbs);
			if(_.startsWith(crumb, key + '=')) r = crumb.replace(key + '=')
			return r;
		}, '')
	},
	set: function(key, val){
		if(typeof window === 'undefined') return;
		document.cookie = key + '=' + val + "; path=/; max-age=25920000;"
	},
	remove: function(key) {
		if(typeof window === 'undefined') return;
		cookieJar.set(key, '');
	},
};

module.exports = cookieJar;

