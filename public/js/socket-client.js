function socketContext(io, url) {
    var socket = io(url);

    var sendAndListen = function (eventName, data, callback) {
        socket.emit(eventName, data);
        socket.on(eventName, callback);
    };
    
    var send = function (eventName, data) {
        socket.emit(eventName, data);
    };
    
    var listen = function (eventName, callback) {
        socket.on(eventName, callback);
    };
    
    return {
        sendAndListen: sendAndListen,
        listen: listen,
        send: send,
        socket: socket
    }
}