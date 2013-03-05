var io = require('socket.io').listen(2222);


io.sockets.on('connection', function (socket) {
  socket.emit('status', {'sync' : true});
  socket.on('up', function (data) {
    console.log(data);
    socket.broadcast.emit('goUp', data);
  });
  socket.on('down', function (data) {
    console.log(data);
    socket.broadcast.emit('goDown', data);
  });
  socket.on('left', function (data) {
    console.log(data);
    socket.broadcast.emit('goLeft', data);
  });
  socket.on('right', function (data) {
    console.log(data);
    socket.broadcast.emit('goRight', data);
  });

});