var React = require('react');
var _ = require('lodash');
var GifCard = require('gifbin/gifCard/gifCard.jsx');

var INC_AMOUNT = 9 * 6;

var GifContainer = React.createClass({
	getDefaultProps: function() {
		return {
			title : null,
			gifs : [],
		};
	},

	getInitialState: function() {
		return {
			drawNumber : INC_AMOUNT
		};
	},

	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
	},
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	handleScroll: function(event) {
		var atPageBottom = (window.innerHeight + window.scrollY) >= document.getElementById('reactContainer').offsetHeight - 300;
		if(atPageBottom && this.state.drawNumber < this.props.gifs.length){
			this.setState({
				drawNumber : this.state.drawNumber + INC_AMOUNT
			})
		}
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
	renderScrollMessage : function(){
		if(this.state.drawNumber > this.props.gifs.length) return null;

		return <div className='scrollMessage'>
			Scroll for more gifs
			<i className='fa fa-chevron-circle-down' />
		</div>;
	},
	render : function(){
		var gifs = _.map(_.slice(this.props.gifs,0, this.state.drawNumber), function(gif){
			return <GifCard gif={gif} key={gif.id} />
		});

		return(
			<div className='gifContainer'>
				{this.renderTitle()}
				{gifs}
				{this.renderEmptyMessage()}
				{this.renderScrollMessage()}
			</div>
		);
	}
});


module.exports = GifContainer;
