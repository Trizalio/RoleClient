define(["modules/ws/sws", "modules/html/dom", "modules/html/bootstrap"],
    function(Sws, dom, btsp){
        function makeText(delay){
            return "Пожалуйста, " +
                    "проверьте Ваше подключение. Автоматическая попытка переподключения через "
                    + (delay / 1000) + " секунд";
        };

        var bsws = {
            getWebSocket: function (){
                var WebSocket = document.WebSocket || 
                        Sws.getSmartWebSocket("ws://" + window.location.hostname + ":1991",
                            bsws.onDisconnection, 
                            bsws.onCooldownTick, 
                            bsws.onConnection);
                document.WebSocket = WebSocket;
                return WebSocket;
            },
            
            onDisconnection: function (delay){
                btsp.setModal(true, "#НЕ ИГРА# Нет связи с сервером", makeText(delay));
            },
            onCooldownTick: function (delay){
                btsp.setModal(true, "#НЕ ИГРА# Нет связи с сервером", makeText(delay));
            },
            onConnection: function (){
                btsp.setModal(false);
            },
        }
        return bsws;
    }
)