var server = require('http').createServer();
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
var adapter = redis(process.env.REDIS_URL);

adapter.pubClient.on('error', function(){});
adapter.subClient.on('error', function(){});

io.adapter(adapter);

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});

  socket.on('broadcast', function(data){
	io.sockets.emit('event', data);	
  });
});

server.listen(process.env.PORT);
