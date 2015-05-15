var util = utils = {
	//args = {url, type, data, success, error}
	ajax : function(args){
		var req = new XMLHttpRequest();
		req.open(args.type || "GET" , args.url, true);
		req.onreadystatechange = function(){
			if(req.readyState != 4) return;
			if(req.status != 200)
				return args.error && args.error(req.responseText);
			return args.success && args.success(req.responseText);
		};
		req.send(args.data);
		return req;
	},

	/* Simple remakes of underscore commands */
	extend : function(){
		var result = {};
		for(var i in arguments){
			var obj = arguments[i];
			for(var propName in obj){
				if(obj.hasOwnProperty(propName)){ result[propName] = obj[propName]; }
			}
		}
		return result;
	},
	map : function(obj, fn){
		var result = [];
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){ result.push(fn(obj[propName], propName)); }
		}
		return result;
	},
	reduce : function(obj, fn, memo){
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){ memo = fn(memo, obj[propName], propName); }
		}
		return memo;
	},
	compare : function(obj1, obj2){
		return JSON.stringify(obj1) === JSON.stringify(obj2)
	},
	type : function(obj){
		if (o === null) return 'null';
		var type = Object.prototype.toString.call(obj).match(/\[object (.*?)\]/)[1].toLowerCase();
		if (type === 'number') {
			if (isNaN(obj)) return 'nan';
			if (!isFinite(obj)) return 'infinity';
		}
		return type;
	},
	times : function(num, fn){
		var result = [];
		for(var i=0;i<num.length;i++){
			result.push(fn(i));
		}
		return result;
	},
	max : function(obj, fn){
		var val, result, compareval;
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){
				compareval = fn(obj[propName], propName);
				if(typeof val === 'undefined' || compareval > val){
					val = compareval;
					result = obj[propName];
				}
			}
		}
		return result;
	},
	min : function(obj, fn){
		var val, result, compareval;
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){
				compareval = fn(obj[propName], propName);
				if(typeof val === 'undefined' || compareval < val){
					val = compareval;
					result = obj[propName];
				}
			}
		}
		return result;
	},
	every : function(obj, fn){
		var result = true;
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){
				if(!fn(obj[propName], propName)) result = false;
			}
		}
		return result;
	},
	some : function(obj, fn){
		var result = false;
		for(var propName in obj){
			if(obj.hasOwnProperty(propName)){
				if(fn(obj[propName], propName)) result = true;
			}
		}
		return result;
	},


	/* Simple Cookie editor */
	cookie : {
		get : function(name){
			if(!document.cookie.length) return;
			var start, end;
			start = document.cookie.indexOf(name + "=");
			if(start !== -1){
				start = start + name.length + 1;
				end = document.cookie.indexOf(";", start);
				if(end === -1) end = document.cookie.length;
				return unescape(document.cookie.substring(start, end));
			}
		},
		set : function(name, value, daysToExpire){
			var expires = "";
			if(daysToExpire){
				var date = new Date();
				date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		remove : function(name){
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
		}
	},



};