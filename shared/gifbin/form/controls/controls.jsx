var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Moment = require('moment');
var GifActions = require('gifbin/gif.actions.js');


var Controls = React.createClass({
	getDefaultProps: function() {
		return {
			gif : {},

			isValid : false,
			loggedInUser : null,

			saveStatus : {},
			onSave : function(){},
		};
	},
	handleLoginClick : function(){
		GifActions.login();
	},
	handleDeleteClick : function(){
		if(confirm("Are you suuuuure you want to delete this?")){
			if(confirm("Are you really really sure?")){
				GifActions.deleteGif(this.props.gif.id, function(res){
					window.location = '/';
				})
			}
		}
	},
	handleSave : function(){
		this.props.onSave();
	},

	openErrorWindow : function(){
		var sourceWindow = window.open();
		sourceWindow.document.write(
			'<code><pre>' +
			JSON.stringify(this.props.saveStatus.errors, null, '  ') +
			'</pre></code>'
		);
	},

	isEditMode : function(){
		return !!(this.props.gif && this.props.gif.id);
	},

	renderInfo : function(){
		if(!this.isEditMode()) return;
		return [
			<FormItem label='views' key='views'>
				<div className='content'>{Number(this.props.gif.views).toLocaleString('en')}</div>
			</FormItem>,
			<FormItem label='created' key='created'>
				<div className='content'>{Moment(this.props.gif.created).fromNow()}</div>
			</FormItem>
		]
	},

	renderUser : function(){
		if(this.isEditMode()){
			return <a className='userLink' href={'/users/' + this.props.gif.user} target="_blank">
				{this.props.gif.user}
				<i className='fa fa-external-link' />
			</a>
		}
		if(this.props.loggedInUser){
			return <a className='userLink' href={'/users/' + this.props.loggedInUser} target="_blank">
				{this.props.loggedInUser}
				<i className='fa fa-external-link' />
			</a>
		}else{
			return <button className='login' onClick={this.handleLoginClick}>
				<i className='fa fa-sign-in' /> login
			</button>
		}
	},

	renderButton : function(){
		var isSaving = this.props.saveStatus.saving;

		var text = 'save';
		if(this.isEditMode()) text = 'update';
		if(isSaving) text = 'saving...';

		return <button className={cx('save', {'create' : !this.isEditMode(), 'update' : this.isEditMode()})}
			disabled={!this.props.isValid}
			onClick={this.handleSave}>
			<i className={cx('fa', {
				'fa-save' : !this.isEditMode() && !isSaving,
				'fa-wrench' : this.isEditMode() && !isSaving,
				'fa-spinner fa-spin' : isSaving
			})} />
			{text}
		</button>
	},

	renderErrors : function(){
		if(!this.props.saveStatus.errors) return null;
		return <div className='errors' onClick={this.openErrorWindow}>
			<i className='fa fa-exclamation-triangle' /> Errors!
		</div>
	},

	renderDeleteButton : function(){
		if(this.isEditMode() && this.props.loggedInUser === 'admin'){
			return <div
				className='deleteButton'
				onClick={this.handleDeleteClick}
				data-tooltip-right='Delete this gif'>
					<i className='fa fa-trash' />
			</div>
		}
	},

	render : function(){
		return <div className='controls'>
			{this.renderInfo()}
			<FormItem label='user'>
				{this.renderUser()}
			</FormItem>
			<div className='bottom'>
				{this.renderDeleteButton()}
				{this.renderErrors()}
				{this.renderButton()}
			</div>
		</div>
	}
});

module.exports = Controls;
















var FormItem = function(props={}){
	return <div className={'formItem ' + props.label}  key={props.label}>
		<label>{props.label}</label>
		{props.children}
	</div>;
}