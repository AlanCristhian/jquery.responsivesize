### Change the font size so that these are not small in screen resolutions greater than 96DPI such as the display of the new iPad.

By default, if the resolution is less than 96DPI then does nothing. But if greater than this, then enlarges the font to a size equivalent to a 96DPI screen.

You can customize the default DPI. ###

(($)->
	$.fn.responsivesize = (options) ->
		defaults =
			density: 96
			adaptFont: true
			adaptImages: true

		$.extend(defaults, options)

		### devuelve los dpi de la pantalla del usuario ###
		getDPI = ->
			element = $("<div style='float: left; margin: 0; padding: 0; visibility: hidden; width: 1in;'></div>")
			element.appendTo("body")
			DPI = element.outerWidth()
			element.remove()
			DPI

		### devuelve el tamaño de fuente en pixeles ###
		getFontSize = (element) ->
			size = element.css("font-size")
			size = Number(size.substr(0, size.length - 2))
			size

		### ajusta el tamaño de fuente ###
		adaptFontSize = (element)->
			DPI = getDPI()
			if DPI > defaults.density
				nFontSize = Math.round(DPI * getFontSize(element) / defaults.density) + "px"
			element.css("font-size", nFontSize)
			return

		### ajusta el tamaño de las imágenes ###
		adaptImagesSize = (element)->
			DPI = getDPI()
			if DPI > defaults.density
				images = $("img", element)
				images.each ->
					$this = $(@)
					newHeight = Math.round(DPI * $this.outerHeight() / defaults.density) + "px"
					newWidth = Math.round(DPI * $this.outerWidth() / defaults.density) + "px"
					$this.css("height": newHeight, "width": newWidth)
			return

		### aplica los cambios a los elementos seleccionados ###
		@.each ->
			$this = $(@)
			if $this
				if defaults.adaptFont
					adaptFontSize($this)
				if defaults.adaptImages
					adaptImagesSize($this)
			return
	return
)(jQuery)