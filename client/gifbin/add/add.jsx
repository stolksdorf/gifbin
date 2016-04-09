var React = require('react');
var _ = require('lodash');

var GifForm = require('gifbin/form/form.jsx');
//var GifForm = require('gifbin/gifForm/gifForm.jsx');

var Add = React.createClass({
	componentDidMount: function() {
		document.title = 'gifbin.add';
	},

	render : function(){
		return<div className='addPage'>
			<GifForm queryLink={this.props.queryLink}/>
		</div>
	}
});

module.exports = Add;
