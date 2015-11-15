var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('draw', function(msg){
    io.emit('draw', msg);
  });

  socket.on('resize', function(msg){
    io.emit('resize', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
