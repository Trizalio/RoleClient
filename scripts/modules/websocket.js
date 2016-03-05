define(["modules/ws/bsws"],
    function(Bsws){
        return Bsws;
        /*var ws = {
            getWebSocket: function (){
                var WebSocket = document.WebSocket || 
                        ws.initWebSocket("ws://" + window.location.hostname + ":1991",);
                document.WebSocket = WebSocket;
                return WebSocket;
            },
            initWebSocket: function (Uri, onDisconnection, onConnection){
                var SmartWS = {};
                SmartWS.Commands = {};

                SmartWS.reconnectLater = function (){
                    console.log("reconnectLater");
                    setTimeout(
                        function(){
                            SmartWS.connect(Uri);
                        }, 
                        5000
                    );
                };
                SmartWS.connect = function (Uri){
                    console.log("connect");
                    try {
                        var websocket = new WebSocket( Uri );
                        websocket.onopen = function (Event) {
                            SmartWS.onopen(Event);
                        };
                        websocket.onclose = function (Event) {
                            SmartWS.onopen(Event);
                        };
                        websocket.onmessage = function (Event) {
                            SmartWS.onmessage(Event);
                        };
                        websocket.onerror = function (Event) {
                            SmartWS.onerror(Event);
                        };
                        SmartWS.ws = websocket;
                    } catch (exception) {
                        console.log('ERROR: ' + exception);
                    }
                };

                SmartWS.send = function(message) {
                    console.log(this);
                    if(this.ws && this.ws.readyState == 1)
                    {
                        this.ws.send(message);
                    }
                    else
                    {
                        if(!this.messages)
                        {
                            this.messages = [];
                        }
                        this.messages.push(message);
                    }
                };
                SmartWS.handle = function(Command, Action) {
                    console.log(this);
                    this.Commands[Command] = Action;
                };
                SmartWS.onopen = function(Event) {
                    console.log("CONNECTED");
                    console.log(this);
                    while (this.messages && this.messages.length > 0) {
                        this.ws.send(this.messages.pop());
                    }
                };
                SmartWS.onclose = function (Event) {
                    console.log("DISCONNECTED");
                    if (Event.wasClean) 
                    {
                        console.log('Соединение закрыто чисто');
                    } 
                    else 
                    {
                        console.log('Обрыв соединения'); // например, "убит" процесс сервера
                    }
                    console.log('Код: ' + Event.code + ' причина: ' + Event.reason);
                    SmartWS.reconnectLater();
                };
                SmartWS.onmessage = function (Event) {
                    var SeparatorPosition = Event.data.indexOf(':');
                    var Command = Event.data.substring(0, SeparatorPosition);
                    console.log( "Command received:", Command );
                    var Action = SmartWS.Commands[Command];
                    if(Action){
                        var Data = Event.data.substring(SeparatorPosition + 1);
                        console.log( "Action found, data len:", Data.length );
                        // Action.call(Data);
                        Action(Data);
                    }
                    else
                    {
                        console.log( "No action found to process data");
                    }
                };
                SmartWS.onerror = function (Event) {
                    console.log('ERROR: ' + Event.data);
                    console.log("Ошибка: " + Event.message);
                    SmartWS.reconnectLater();
                };
                SmartWS.connect(Uri);
                
                return SmartWS;
            },
        }
        return ws;*/
    }
)