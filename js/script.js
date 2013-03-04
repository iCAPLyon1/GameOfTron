Modernizr.load([
  {
    load: 'http://code.jquery.com/jquery-1.9.1.min.js',
    complete: function () {
      if ( !window.jQuery ) {
            Modernizr.load('vendor/jquery-1.9.1.min.js');
      }
    }
  }
]);


