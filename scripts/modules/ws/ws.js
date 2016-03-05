define(
    function(){
        var ws = {
            getWebSocket: function (Uri, onOpen, onClose, onMessage, onError){
                var websocket;
                try {
                    var websocket = new WebSocket( Uri );
                    websocket.onopen = onOpen;
                    websocket.onclose = onClose;
                    websocket.onmessage = onMessage;
                    websocket.onerror = onError;
                } catch (exception) {
                    console.log('ERROR: ' + exception);
                }
                return websocket;
            },
        }
        return ws;
    }
)