;(function(){
	window.DOM = document.find = function(selector){
		return document.querySelectorAll(selector);
	};

	//DOM Builder
	var elementList = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','bgsound','big','blink','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','content','data','datalist','dd','decorator','del','details','dfn','dir','div','dl','dt','element','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','i','iframe','img','input','ins','isindex','kbd','keygen','label','legend','li','link','listing','main','map','mark','marquee','menu','menuitem','meta','meter','nav','nobr','noframes','noscript','object','ol','optgroup','option','output','p','param','plaintext','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','shadow','small','source','spacer','span','strike','strong','style','sub','summary','sup','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr','xmp'];
	for(var i in elementList){
		var type = elementList[i];
		DOM[type] = function(attr){
			var element = document.createElement(this.type);
			for(var i in attr){ element.setAttribute(i, attr[i]); }
			var content = [].slice.apply(arguments).slice(1);
			for(var i in content){
				var part = content[i];
				if(typeof part !== 'object') part=document.createTextNode(part);
				element.appendChild(part);
			}
			return element;
		}.bind({type : type});
	}

	//Each
	NodeList.prototype.each = function(fn){
		for(var i=0; i < this.length; i++){
			fn(this[i], i);
		}
		return this;
	};
	HTMLDivElement.prototype.each = function(fn){
		fn(this, 0);
		return this;
	};

	//Css
	NodeList.prototype.css = function(rule,val){
		this.each(function(node){ node.css(rule,val); });
		if(this.length && typeof rule === 'string'){
			return (this[0].currentStyle || window.getComputedStyle(this[0]))[rule];
		}
		return this;
	};
	HTMLDivElement.prototype.css = function(rule, val){
		if(typeof rule === 'object'){
			for(var ruleName in rule){ this.style[ruleName] = rule[ruleName]; }
			return this;
		}
		if(val){
			this.style[rule] = val;
			return this;
		}
		return this.currentStyle || window.getComputedStyle(this)[rule];
	};

	//Find
	NodeList.prototype.find = function(selector){
		if(this.length) return this[0].find(selector);
	};
	HTMLDivElement.prototype.find = function(selector){
		return this.querySelectorAll(selector);
	};

	//Html
	NodeList.prototype.html = function(newHtml){
		this.each(function(node){ node.html(newHtml); });
		if(this.length) return this[0].innerHtml;
		return this;
	};
	HTMLDivElement.prototype.html = function(newHtml){
		if(!newHtml) return this.innerHTML;
		this.innerHTML = newHtml;
		return this;
	};

	//Events
	NodeList.prototype.on = function(event, fn){
		this.each(function(node){ node.on(event, fn); });
		return this;
	};
	HTMLDivElement.prototype.on = HTMLInputElement.prototype.on = function(event, fn){
		if(typeof this["on"+event] !== 'undefined'){
			this["on"+event] = function(){ fn(this); }
		}
		return this;
	};
	NodeList.prototype.off = function(event){
		this.each(function(node){ node.off(event); });
		return this;
	};
	HTMLDivElement.prototype.off = function(event){
		if(typeof this["on"+event] !== 'undefined'){
			this["on"+event] = null;
		}
		return this;
	};

	//Append + Prepend
	NodeList.prototype.append = function(content){
		this.each(function(node){ node.append(content); });
		return this;
	};
	HTMLDivElement.prototype.append = function(content){
		if(typeof content !== 'object') content = document.createTextNode(content);
		this.appendChild(content.cloneNode(true));
		return this;
	};
	NodeList.prototype.prepend = function(content){
		this.each(function(node){ node.prepend(content); });
		return this;
	};
	HTMLDivElement.prototype.prepend = function(content){
		if(typeof content !== 'object') content = document.createTextNode(content);
		this.insertBefore(content.cloneNode(true), this.firstChild);
		return this;
	};

	//Parent
	NodeList.prototype.parent = function(){
		if(this.length) return this[0].parent();
	};
	HTMLDivElement.prototype.parent = function(){
		return this.parentNode;
	};

	//Remove
	NodeList.prototype.remove = function(){
		this.each(function(node){ node.remove(); });
	};
	HTMLDivElement.prototype.remove = function(){
		this.parent().removeChild(this);
	};

	//Animate
	NodeList.prototype.animate = function(rules, delay, callback){
		callback = (typeof delay == 'function') ? delay : callback || function(){};
		delay    = (typeof delay == 'number') ? delay : 400;
		this.each(function(node){ node.animate(rules, delay); });
		setTimeout(function(){callback();},delay);
		return this;
	};
	HTMLDivElement.prototype.animate = function(rules, delay, callback){
		var self = this,
		easing   = 'cubic-bezier(.02, .01, .47, 1)';
		callback = (typeof delay == 'function') ? delay : callback || function(){};
		delay    = (typeof delay == 'number') ? delay : 400;
		setTimeout(function(){
			self.css({
				'transition'                   : 'all ' + delay + 'ms '+ easing +' 0s',
				'animation-play-state'         : 'running',
				'-webkit-animation-play-state' : 'running'
			}).css(rules);
		},0);
		setTimeout(function(){
			self.css('transition', 'all 0s '+ easing +' 0s');
			callback();
		},delay);
		return this;
	};
})();