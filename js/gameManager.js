jQuery(document).ready(function() {
    $('form[name="player"]').on('submit', function(event) {
        event.preventDefault();
        var player = new Player(
            $(this.username).val(), 
            $(this.color).val(),
            $(this.size).val()
        );

        var socket = io.connect('http://localhost:1025');

        var canvasOptions = {
            'width' : 600,
            'height' : 400,
            'bgcolor' : '#333333',
            'bordercolor' : '#000000',
            'shadowOffset' : 1,
            'shadowBlur' :2,
            'autoMove' : false,
            'socket' : socket
        }

        var canvas;

        socket.on('state', function(data){
            console.log(data);
            player.id = data.id;
            canvas = initializeCanvas('game-canvas', canvasOptions, player);
        });

        socket.on('refresh', function (data) {
            //console.log('refresh');
            //console.log(data);
            refreshCanvas(canvas, canvasOptions, data);
        });
    });
});