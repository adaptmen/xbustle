function socketContext (io) {
    
    var socket;
    
    var send = {
        self: (eventName, data) => { 
            socket.emit(eventName, data)
        },
    
        allAndSelf: (eventName, data) => {
            io.emit(eventName, data);
        },

        all: (eventName, data) => {
            socket.broadcast.emit(eventName, data);
        },

        toRoomAndSelf: (roomName, eventName, data) => {
            io.sockets.in(roomName).emit(eventName, data);
        },

        toRoom: (roomId, eventName, data) => {
            socket.broadcast.to(roomId).emit(eventName, data);
        },

        toSocket: (socketId, eventName, data) => {
            socket.broadcast.to(socketId).emit(eventName, data);
        }
    }
    
    var listen = (eventName, callback, once) => {
        once 
            ? socket.once(eventName, callback)
            : socket.on(eventName, callback)
    };
    
    var joinTo = (roomId) => {
        socket.join(roomId);
    };
    
    var getRoom = (roomName) => {
        return io.sockets.adapter.rooms[roomName];
    };
    
    var connect = (callback) => {
        io.once('connection', (_socket) => {
            socket = _socket;
            callback(socket);
        }); 
    };
    
    var reconnect = (callback) => {
        listen('reconnect', callback, true);
    };
    
    var disconnect = (callback) => {
        listen('disconnect', callback, true);
    };
    
    
    return {
        send: send,
        listen: listen,
        joinTo: joinTo,
        socket: socket,
        getRoom: getRoom,
        disconnect: disconnect,
        reconnect: reconnect,
        connect: connect
    }
}

module.exports = socketContext;

// sending to sender-client only
 /*socket.emit('message', "this is a test");

 // sending to all clients, include sender
 io.emit('message', "this is a test");

 // sending to all clients except sender
 socket.broadcast.emit('message', "this is a test");

 // sending to all clients in 'game' room(channel) except sender
 socket.broadcast.to('game').emit('message', 'nice game');

 // sending to all clients in 'game' room(channel), include sender
 io.in('game').emit('message', 'cool game');

 // sending to sender client, only if they are in 'game' room(channel)
 socket.to('game').emit('message', 'enjoy the game');

 // sending to all clients in namespace 'myNamespace', include sender
 io.of('myNamespace').emit('message', 'gg');

 // sending to individual socketid
 socket.broadcast.to(socketid).emit('message', 'for your eyes only');*/