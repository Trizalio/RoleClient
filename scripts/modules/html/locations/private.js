define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container){
                var WebSocket = ws.getWebSocket();
                var Player;
                WebSocket.send("get player");
                WebSocket.handle("player data", function(Data){
                    Player = jQuery.parseJSON(Data);
                    console.log(Player);
                    WebSocket.send("get user " + Player.UserId);
                    // priv.renderUser(Container, User);
                });
                WebSocket.handle("no player", function(){
                    btsp.createAlert("warning", "У Вас нет профиля - ", "Вы авторизованы, как гость");
                    // Player = jQuery.parseJSON(Data);
                    // WebSocket.send("get user " + 1);//Player.UserId);
                    // priv.renderUser(Container, User);
                });
                WebSocket.handle("user data", function(Data){
                    btsp.clean(Container);
                    var User = jQuery.parseJSON(Data);
                    priv.renderUser(Container, User, Player);
                });
            },
            renderUser: function (Container, User, Player){
                console.log(User);
                console.log(Player);
                Container.appendChild(btsp.getPrivateDisplay(User, Player, priv.logout));
                // console.log(User);
            },

            logout: function(){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post logout");
                WebSocket.handle("logout ok", function(){
                    window.authDone = false;
                    window.location.hash = "#login";
                });
            },
        };
        return priv;
    }
    
)