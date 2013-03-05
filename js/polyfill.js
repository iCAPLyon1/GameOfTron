Modernizr.load(
    {
		test: Modernizr.inputtypes["color"],
  		nope: ['polyfill/spectrum/spectrum.js', 'polyfill/spectrum/spectrum.css']
	},
	{
  		test: Modernizr.inputtypes["range"],
  		nope: ['polyfill/fd-slider/js/fd-slider.js', 'polyfill/fd-slider/css/fd-slider.css']
    }
);
