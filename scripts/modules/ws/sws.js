define(["modules/ws/ws"],
    function(Ws){
        var reconnectDelay = 5000;
        var reconnectDelayStep = 1000;
        var sws = {
            // getWebSocket: function (){
            //     var WebSocket = document.WebSocket || 
            //             sws.initWebSocket("ws://" + window.location.hostname + ":1991");
            //     document.WebSocket = WebSocket;
            //     return WebSocket;
            // },
            getSmartWebSocket: function (Uri, onDisconnection, onCooldownTick, onConnection){
                var SmartWS = {};
                SmartWS.Commands = {};
///////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////
                SmartWS.onOpen = function(Event) {
                    console.log("CONNECTED");
                    console.log(Event);
                    if(SmartWS.ws.readyState == 1){
                        onConnection();
                        while (SmartWS.messages && SmartWS.messages.length > 0) {
                            SmartWS.ws.send(this.messages.pop());
                        }
                    }
                };
                SmartWS.onClose = function (Event) {
                    console.log("DISCONNECTED");
                    console.log('Соединение закрыто чисто:', Event.wasClean);
                    console.log('Код: ' + Event.code + ' причина: ' + Event.reason);
                    SmartWS.reconnectLater();
                    onDisconnection(reconnectDelay);
                };
                SmartWS.onMessage = function (Event) {
                    var SeparatorPosition = Event.data.indexOf(':');
                    var Command = Event.data.substring(0, SeparatorPosition);
                    console.log( "Command received:", Command );
                    var Action = SmartWS.Commands[Command];
                    if(Action){
                        var Data = Event.data.substring(SeparatorPosition + 1);
                        console.log( "Action found, data len:", Data.length );
                        // Action.call(Data);
                        Action(Data);
                    }else{
                        console.log( "No action found to process data");
                    }
                };
                SmartWS.onError = function (Event) {
                    console.log('ERROR: ' + Event.data);
                    console.log("Ошибка: " + Event.message);
                    // SmartWS.reconnectLater();
                    // onDisconnection(reconnectDelay);
                };
///////////////////////////////////////////////////////////////////////////////////////////
                SmartWS.connect = function (){
                    SmartWS.ws = Ws.getWebSocket
                    (
                        Uri, 
                        SmartWS.onOpen, 
                        SmartWS.onClose, 
                        SmartWS.onMessage, 
                        SmartWS.onError
                    );
                };
                SmartWS.reconnectLater = function (){
                    console.log("reconnectLater");
                    SmartWS.delay = reconnectDelay;
                    setTimeout(
                        function(){
                            SmartWS.tick();
                        }, 
                        reconnectDelayStep
                    );
                };
                SmartWS.tick = function (){
                    SmartWS.delay -= reconnectDelayStep;
                    if(SmartWS.delay <= 0){
                        SmartWS.connect();
                    }else{
                        onCooldownTick(SmartWS.delay);
                        setTimeout(
                            function(){
                                SmartWS.tick();
                            }, 
                            reconnectDelayStep
                        );
                    }
                };
///////////////////////////////////////////////////////////////////////////////////////////
                SmartWS.connect();
                
                return SmartWS;
            },
        }
        return sws;
    }
)