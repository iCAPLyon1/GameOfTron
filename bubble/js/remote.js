var socket = io.connect('http://134.214.233.109:2222');
$(document).ready(function() {
    socket.on('status', function (data) {
      console.log(data);
    });
});

function sendUp(value)
{
    console.log("Up");
    socket.emit('up', { 'value': value });
}

function sendDown(value)
{
    console.log("Down");
    socket.emit('down', { 'value': value });
}

function sendLeft(value)
{
    console.log("Left");
    socket.emit('left', { 'value': value });
}

function sendRight(value)
{
    console.log("Right");
    socket.emit('right', { 'value': value });
}
