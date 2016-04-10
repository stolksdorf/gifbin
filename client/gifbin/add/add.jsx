var React = require('react');
var _ = require('lodash');

var GifForm = require('gifbin/form/form.jsx');
var GifStore = require('gifbin/gif.store.js');

var Add = React.createClass({
	componentDidMount: function() {
		document.title = 'gifbin.add';
	},

	render : function(){
		var query = GifStore.getQuery();
		var queryLink;
		if(query && query.i){
			queryLink = query.i;
		}

		return <div className='addPage'>
			<GifForm queryLink={queryLink}/>
		</div>
	}
});

module.exports = Add;
