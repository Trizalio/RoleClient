define(
    function(){
        return{
            initWebSocket: function (Uri){
                var SmartWS = {};
                SmartWS.Commands = {};

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
                try {
                    var websocket = new WebSocket( Uri );
                    websocket.onopen = function (Event) {
                        console.log("CONNECTED");
                        console.log(this);
                        while (SmartWS.messages && SmartWS.messages.length > 0) {
                            SmartWS.ws.send(SmartWS.messages.pop());
                        }
                    };
                    websocket.onclose = function (Event) {
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
                    };
                    websocket.onmessage = function (Event) {
                        // console.log( this );
                        // console.log( SmartWS );
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
                    };
                    websocket.onerror = function (Event) {
                        console.log('ERROR: ' + Event.data);
                        console.log("Ошибка: " + Event.message);
                    };
                    SmartWS.ws = websocket;
                } catch (exception) {
                    console.log('ERROR: ' + exception);
                }
                return SmartWS;
            },
        }
    }
)