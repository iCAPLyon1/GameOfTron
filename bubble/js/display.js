$(document).ready(function () {
    console.log('ready');
    var speed = 10;

    function up(diff) {
        var top = $('#bubble').css('top');
        top = top.replace('px', '');
        top = top-(diff*speed);
        top = top+'px';
        $('#bubble').css('top', top);
        console.log('up to :'+top);
    }

    function down(diff) {
        var top = $('#bubble').css('top');
        top = top.replace('px', '');
        top = parseInt(top)+(diff*speed);
        top = top+'px';
        $('#bubble').css('top', top);
        console.log('down to :'+top);
    }

    function left(diff) {
        var left = $('#bubble').css('left');
        left = left.replace('px', '');
        left = left-(diff*speed);
        left = left+'px';
        $('#bubble').css('left', left);
        console.log('left to :'+left);
    }

    function right(diff) {
        var left = $('#bubble').css('left');
        left = left.replace('px', '');
        left = parseInt(left)+(diff*speed);
        left = left+'px';
        $('#bubble').css('left', left);
        console.log('right to :'+left);
    }

    $(document).on('keypress', function(e){
        console.log(e.keyCode);
        //alert(e.keyCode);
        if(e.keyCode == 37) {
            left(3);
            e.preventDefault();
        }else if(e.keyCode == 38) {
            up(3);
            e.preventDefault();
        }else if(e.keyCode == 39) {
            right(3);
            e.preventDefault();
        }else if(e.keyCode == 40) {
            down(3);
            e.preventDefault();
        }
    }); 

    var socket = io.connect("http://134.214.232.142:2222");
    socket.on('status', function (data) {
        console.log(data);
    });

    socket.on('goUp', function(data) {
        console.log(data);
        up(data.value);
    });
    socket.on('goDown', function(data) {
        console.log(data);
        down(data.value);
    });
    socket.on('goLeft', function(data) {
        console.log(data);
        left(data.value);
    });
    socket.on('goRight', function(data) {
        console.log(data);
        right(data.value);
    });          
});