var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// path para utilizar /../ en la ruta del sendFile
var path = require('path');

// para servir los archivos estaticos
app.use('/bower', express.static(path.resolve(__dirname + '/../frontend/bower_components')));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../frontend/app/index.html'));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
