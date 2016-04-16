var React = require('react');
var _ = require('lodash');


var randomTags = [
	"tacos",
	"thumbs up",
	"you got to be kidding me",
	"Micheal Cera",
	"Cereal flip",
	"adventure time",
	"not a sloth lolz",
	"Feeling It",
	"umad",
	"you're god damn right",
	"oh no he didn't"
	];

var Tags = React.createClass({
	getDefaultProps: function() {
		return {
			gif : {},
			onChange : function(){},
			placeholder : _.sampleSize(randomTags, _.random(3,5)).join(', ')
		};
	},

	handleTagChange : function(e){
		this.props.onChange({
			...this.props.gif,
			tags : e.target.value
		});
	},

	render : function(){
		return <textarea
			className='tags'
			value={this.props.gif.tags}
			placeholder={this.props.placeholder}
			onChange={this.handleTagChange}
		/>
	}
});

module.exports = Tags;
