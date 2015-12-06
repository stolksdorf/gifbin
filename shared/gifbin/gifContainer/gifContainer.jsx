var React = require('react');
var _ = require('lodash');
var GifCard = require('gifbin/gifCard/gifCard.jsx');

var GifContainer = React.createClass({
	getDefaultProps: function() {
		return {
			title : null,
			gifs : []
		};
	},
	renderTitle : function(){
		if(!this.props.title) return null;
		return <h1>{this.props.title}</h1>
	},
	renderEmptyMessage : function(){
		if(this.props.gifs.length) return null;
		return(
			<div className='emptyMessage'>
				<i className='fa fa-frown-o' />
				{_.sample([
					'No gifs bruh',
					'INSSUFFICIENT RESULTS FOR MEANINGFUL SEARCH',
					'Your gifs are in another castle',
					"We couldn't find anything"
				])}
			</div>
		);
	},
	render : function(){
		var gifs = _.map(this.props.gifs, function(gif){
			return <GifCard gif={gif} key={gif.id} />
		});
		return(
			<div className='gifContainer'>
				{this.renderTitle()}
				{gifs}
				{this.renderEmptyMessage()}
			</div>
		);
	}
});


module.exports = GifContainer;
