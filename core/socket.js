function socketContext (io) {
    
    var _socket;
    
    var send = {
        self: (eventName, data) => { 
            _socket.emit(eventName, data)
        },
    
        allAndSelf: (eventName, data) => {
            io.emit(eventName, data);
        },

        all: (eventName, data) => {
            _socket.broadcast.emit(eventName, data);
        },

        toRoomAndSelf: (roomName, eventName, data) => {
            io.sockets.in(roomName).emit(eventName, data);
        },

        toRoom: (roomId, eventName, data) => {
            _socket.broadcast.to(roomId).emit(eventName, data);
        },

        toSocket: (socketId, eventName, data) => {
            _socket.broadcast.to(socketId).emit(eventName, data);
        }
    }
    
    var listen = (eventName, callback, once) => {
        once 
            ? _socket.once(eventName, callback)
            : _socket.on(eventName, callback)
    };
    
    var joinTo = (roomId) => {
        _socket.join(roomId);
    };
    
    var getRoom = (roomName) => {
        return io.sockets.adapter.rooms[roomName];
    };
    
    var connect = (callback) => {
        io.once('connection', (socket) => {
            _socket = socket;
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
        socket: _socket,
        getRoom: getRoom,
        disconnect: disconnect,
        reconnect: reconnect,
        connect: connect
    }
}

module.exports = socketContext;