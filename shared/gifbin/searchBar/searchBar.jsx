
var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var utils = require('gifbin/utils.js');

var queryVal;

var SearchBar = React.createClass({

	getDefaultProps: function() {
		return {
			initialValue : "",
			onSearch : function(){}
		};
	},

	getInitialState: function() {
		return {
			focused: false,
			showInfoBox : false,
			waiting : false,
			value : this.props.initialValue
		};
	},

	handleChange : function(e){
		this.setState({
			value : e.target.value,
			waiting : true
		}, this.updateFromChange)
	},

	/* Used to throttled searching */
	updateFromChange : _.debounce(function(){
		var self = this;
		self.props.onSearch(utils.createSearchObject(self.state.value));


		console.log(utils.createSearchObject(self.state.value));


		queryVal = self.state.value;
		self.updateUrl();
		self.setState({ waiting : false });
	}, 200),


	setFocus : function(val){
		this.setState({
			focused : val
		})
	},

	toggleInfoBox : function(){
		this.setState({ showInfoBox : !this.state.showInfoBox })
	},
	hideInfoBox  : function(){
		this.setState({ showInfoBox : false })
	},
	showInfoBox  : function(){
		this.setState({ showInfoBox : true })
	},

	updateUrl : _.throttle(function(){
		var newUrl = window.location.protocol + "//" + document.location.host + document.location.pathname;
		if(queryVal){
			newUrl +="?q=" + queryVal;
		}
		window.history.replaceState(null,null,newUrl);
	}, 500),

	render : function(){
		var self = this;


		var info;
		if(this.state.showInfoBox){
			info = <div className='infoBox' onClick={this.hideInfoBox}>
				<p><code>by:anon</code> returns gifs uploaded by a user</p>
				<p><code>fav:anon</code> returns fav gifs from a user</p>
				<p><code>in:bucket</code> search a specifc bucket</p>
				<p><code>!nsfw</code> exclude search terms</p>
			</div>
		}

		return(
			<div className={cx('searchBar', {'focused' : this.state.focused})}>
				<i className={cx('fa', {'fa-search' : !this.state.waiting, 'fa-clock-o' : this.state.waiting})} />
				<input type='text'
					value={this.state.value}
					onChange={this.handleChange}
					onFocus={this.setFocus.bind(this, true)}
					onBlur={this.setFocus.bind(this, false)} />

				<div className='info'>
					<i className='infoBoxButton fa fa-info' onClick={this.toggleInfoBox} />
					{info}
				</div>
			</div>
		);
	}
});

module.exports = SearchBar;
