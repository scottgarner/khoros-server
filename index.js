// Express

var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Socket IO

var io = require('socket.io')(server);
var middleware = require('socketio-wildcard')();
var redis = require('socket.io-redis');
var adapter = redis(process.env.REDIS_URL);

adapter.pubClient.on('error', function(){});
adapter.subClient.on('error', function(){});

io.adapter(adapter);
io.use(middleware);

io.on('connection', function(socket){

	var room = socket.handshake['query']['room'];
	if (room) socket.join(room);

	socket.on('*', function(packet){

		if(packet.type == 2) {
			var type = packet.data[0];
			var data = packet.data[1];

			data.clientID = socket.client.id;

			if (data.room) {
				io.to(data.room).emit(type, data);
			}
		}
	});

});
