define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container){
                btsp.createAlert("info", "Раздел в разработке. ", "Здесь будут отображатся все проекты");
                // var WebSocket = ws.getWebSocket();
                // var Player;
                // WebSocket.send("get player");
                // WebSocket.handle("player data", function(Data){
                //     Player = jQuery.parseJSON(Data);
                //     WebSocket.send("get user " + 1);//Player.UserId);
                //     // priv.renderUser(Container, User);
                // });
                // WebSocket.handle("no player", function(){
                //     // Player = jQuery.parseJSON(Data);
                //     // WebSocket.send("get user " + 1);//Player.UserId);
                //     // priv.renderUser(Container, User);
                // });
                // WebSocket.handle("user data", function(Data){
                //     btsp.clean(Container);
                //     var User = jQuery.parseJSON(Data);
                //     priv.renderUser(Container, User, Player);
                // });
            },
            // renderUser: function (Container, User, Player){
            //     console.log(User);
            //     console.log(Player);
            //     Container.appendChild(btsp.getPrivateDisplay(User, Player));
            //     // console.log(User);
            // },
        };
        return priv;
    }
    
)