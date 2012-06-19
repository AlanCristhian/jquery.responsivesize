

/* Change the font size so that these are not small in screen resolutions greater than 96DPI such as the display of the new iPad.

By default, if the resolution is less than 96DPI then does nothing. But if greater than this, then enlarges the font to a size equivalent to a 96DPI screen.

You can customize the default DPI. */

(function() {

	(function($) {
		$.fn.responsivesize = function(options) {
			var adaptFontSize, adaptImagesSize, defaults, getDPI, getFontSize;
			defaults = {
				density: 96,
				adaptFont: true,
				adaptImages: true
			};
			$.extend(defaults, options);

			/* devuelve los dpi de la pantalla del usuario */
			getDPI = function() {
				var DPI, element;
				element = $("<div style='float: left; margin: 0; padding: 0; visibility: hidden; width: 1in;'></div>");
				element.appendTo("body");
				DPI = element.outerWidth();
				element.remove();
				return DPI;
			};

			/* devuelve el tamaño de fuente en pixeles */
			getFontSize = function(element) {
				var size;
				size = element.css("font-size");
				size = Number(size.substr(0, size.length - 2));
				return size;
			};

			/* ajusta el tamaño de fuente */
			adaptFontSize = function(element) {
				var DPI, nFontSize;
				DPI = getDPI();
				if (DPI > defaults.density) {
					nFontSize = Math.round(DPI * getFontSize(element) / defaults.density) + "px";
				}
				element.css("font-size", nFontSize);
			};

			/* ajusta el tamaño de las imágenes */
			adaptImagesSize = function(element) {
				var DPI, images;
				DPI = getDPI();
				if (DPI > defaults.density) {
					images = $("img", element);
					images.each(function() {
						var $this, newHeight, newWidth;
						$this = $(this);
						newHeight = Math.round(DPI * $this.outerHeight() / defaults.density) + "px";
						newWidth = Math.round(DPI * $this.outerWidth() / defaults.density) + "px";
						return $this.css({
							"height": newHeight,
							"width": newWidth
						});
					});
				}
			};

			/* aplica los cambios a los elementos seleccionados */
			return this.each(function() {
				var $this;
				$this = $(this);
				if (defaults.adaptFont) {
					adaptFontSize($this);
				}
				if (defaults.adaptImages) {
					adaptImagesSize($this);
				}
			});
		};
	})(jQuery);

}).call(this);
