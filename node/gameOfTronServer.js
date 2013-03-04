var io = require('socket.io').listen(1025);
var playerNumber = 0;
var game = new Object();
game.users = new Array();

io.sockets.on('connection', function (socket) {
  socket.emit('state', { 'connected': true, 'game': game, 'id': playerNumber });
  playerNumber++;
  socket.on('update', function (user) {
    var id = user.id;
    //console.log(user);
    game.users[id] = user;
    //console.log(game.users);
    socket.broadcast.emit('refresh', game.users);
  });
});