ZeroClipboard.config( { moviePath: "../libs/ZeroClipboard/ZeroClipboard.swf" });

Gifbin_RandBtn = xo.view.extend({
	schematic : DOM.div({class : 'btn purple hint--bottom', 'data-hint':"Random Link"},
		DOM.i({class:'icon-random'})
	),
	render : function(){
		var self = this;
		this.zc = new ZeroClipboard(this.dom.view);

		this.zc.on('dataRequested', function(zc) {
			zc.setText(self.model.link);
		});

		this.zc.on( 'mouseover', function(zc) {
			self.dom.view.addClass('hint--always');
		});

		this.zc.on( 'mouseout', function(zc) {
			self.dom.view.removeClass('hint--always');
			self.dom.view.attr('data-hint', "Random Link");
		});

		this.zc.on( 'complete', function(zc) {
			self.dom.view.attr('data-hint', "Copied!");
			self.model.increaseLinkCount();
			self.trigger('click');
		});
		return this;
	}
});