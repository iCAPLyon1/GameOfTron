var speed = 5;
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

function up(speed) 
{
    document.getElementById('display_screen').innerHTML = '&uarr;';

}

function down(speed) 
{
    document.getElementById('display_screen').innerHTML = '&darr;';
}

function left(speed) 
{
    document.getElementById('display_screen').innerHTML = '&larr;';
}

function right(speed) 
{
    document.getElementById('display_screen').innerHTML = '&rarr;';
}