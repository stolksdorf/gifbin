ZeroClipboard.config( { moviePath: "../libs/ZeroClipboard/ZeroClipboard.swf" });

Gifbin_LinkBtn = xo.view.extend({
	schematic : DOM.div({class : 'btn green hint--bottom', 'data-hint':"Copy Link"},
		DOM.i({class:'icon-copy'})
	),
	render : function(){
		var self = this;
		this.zc = new ZeroClipboard(this.dom.view);

		this.zc.clip(this.dom.view);

		this.zc.on('dataRequested', function(zc) {
			zc.setText(self.model.link);
		});

		this.zc.on('mouseover', function(zc) {
			self.dom.view.addClass('hint--always');
			self.trigger('mouseover');
		});

		this.zc.on('mouseout', function(zc) {
			self.dom.view.removeClass('hint--always');
			self.dom.view.attr('data-hint', "Copy Link");
			self.trigger('mouseout');
		});

		this.zc.on('complete', function(zc) {
			self.dom.view.attr('data-hint', "Copied!");
			self.model.increaseLinkCount();
			self.trigger('click');
		});
		return this;
	}
});