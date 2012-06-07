
/* Change the font size so that these are not small in screen resolutions greater than 96ppi such as the display of the new iPad.

By default, if the resolution is less than 96ppi then does nothing. But if greater than this, then enlarges the font to a size equivalent to a 96ppi screen.

You can customize the default PPI.
*/


(function() {

	(function($) {
		$.fn.responsivesize = function(options) {
			var defaults;
			defaults = {
				density: 96
			};
			$.extend(defaults, options);
			return this.each(function() {
				var $this, getFontSize, getPPI, nFontSize, ppi;
				$this = $(this);
				getPPI = function() {
					var element, ppi;
					element = $("<div style='float: left; margin: 0; padding: 0; visibility: hidden; width: 1in;'></div>");
					element.appendTo("body");
					ppi = element.outerWidth();
					element.remove();
					return ppi;
				};
				getFontSize = function() {
					var size;
					size = $this.css("font-size");
					size = Number(size.substr(0, size.length - 2));
					return size;
				};
				ppi = getPPI();
				if (ppi > defaults.density) {
					nFontSize = Math.round(ppi * getFontSize() / defaults.density) + "px";
				}
				$this.css("font-size", nFontSize);
				return true;
			});
		};
	})(jQuery);

}).call(this);
