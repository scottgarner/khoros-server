window.onload = function () {

      var socket = io.connect(window.document.location.host ,{ transports: ['websocket', 'polling'] });

      socket.on('connect', function() {
        console.log("CONNECTED");
      });

      socket.on('disconnect', function() {
        console.log("DISCONNECTED");
      });      
   
      socket.on('message', function(data) {        
        console.log(data);
      }); 

      socket.on('position', function(data) {        

		cube.position.set( data.x * 10, data.y * 10, -data.z * 10);

      });    

}
