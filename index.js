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

// Redis Support

var redis = require('socket.io-redis');
var adapter = redis(process.env.REDIS_URL);

adapter.pubClient.on('error', function(){});
adapter.subClient.on('error', function(){});

io.adapter(adapter);

// Khoros
 
var khoros = require('khoros-middleware')(io,server);
io.use(khoros);