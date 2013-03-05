$(document).ready(function(){

    var socket = io.connect('http://localhost:2222');
      socket.on('status', function (data) {
        console.log(data);
      });

    $(".direction-btn").click(function(){
        eval("send"+$(this).attr("data-toggle")+"('"+$(this).attr("data-toggle")+"', socket)");
    });
});

function sendUp(value, socket)
{
    console.log("UP");
    socket.emit('up', { 'value': value });
}

function sendDown(value, socket)
{
    console.log("DOwn");
    socket.emit('down', { 'value': value });
}

function sendLeft(value, socket)
{
    console.log("Left");
    socket.emit('left', { 'value': value });
}

function sendRight(value, socket)
{
    console.log("Right");
    socket.emit('right', { 'value': value });
}