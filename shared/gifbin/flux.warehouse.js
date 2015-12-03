var _ = require('lodash');
var eventsEmitter = require('events').EventEmitter;

var defaultStatus = {
	fetching : false,
	saving : false,
	pending : false,
	error : null
}


module.exports = Warehouse = {

	createStore : function(Dispatcher, StoreBlueprint){
		var store = _.extend({


			//Throttles and cascades async requests stores can make
			wrapRequest : function(requestType, status, request, waitToFire){
				var self = this;
				waitToFire = waitToFire || 0;
				status = status || defaultStatus;

				status.pending = true;
				status.error = null;
				if(status[requestType]) return;

				var executeRequest = function(){
					status[requestType] = true;
					status.pending = false;
					request(function(err, res){
						if (err) {
							status[requestType] = false;
							status.error = err;
							self.emitChange();
						}
						if(status.pending){
							executeRequest();
						}else{
							status[requestType] = false;
							self.emitChange();
						}
					});
					self.emitChange();
				};

				if(waitToFire === 0){
					executeRequest();
				}else{
					clearInterval(status.timeout);
					status.timeout = setTimeout(function(){
						executeRequest();
					}, waitToFire);
				}
				this.emitChange();
			},

			handleAction : function(action){
				if(typeof this.actions[action.type] === 'function'){
					this.actions[action.type].call(this, action.payload);
				}
				return true;
			},

			mixin : function(){
				var self = this;

				return {
					componentDidMount: function() {
						if(!this.onStoreChange){
							throw new Error("Component is listening to store but doesn't have a 'onStoreChange' function");
						}
						self.addChangeListener(this.onStoreChange);
						this.onStoreChange()
					},
					componentWillUnmount: function(){
						self.removeChangeListener(this.onStoreChange);
					},
				};
			},

			events : new eventsEmitter(),
			emitChange : function(){
				this.events.emit('CHANGE_EVENT');
			},
			addChangeListener : function(callback){
				this.events.on('CHANGE_EVENT', callback);
			},
			removeChangeListener: function(callback) {
				this.events.removeListener('CHANGE_EVENT', callback);
			}
		}, StoreBlueprint);

		store.events.setMaxListeners(0);

		store.dispatchToken = Dispatcher.register(store.handleAction.bind(store));
		return store;
	}
};

