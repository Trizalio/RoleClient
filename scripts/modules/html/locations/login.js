define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket", "modules/crypto"],
    function(dom, btsp, ws, cryp){
        var login = {

            show: function (Container){           
                // btsp.clean(Container);
                // TODO: get hash and navigate there
                // window.location.hash = "home";
                // btsp.setNameToHead("Name", buis.goHome, "#home");

                var WebSocket = ws.getWebSocket();
                // WebSocket.send("get map");
                WebSocket.handle("login ok", function(data){
                    console.log(data);
                    window.auth = {};
                    window.auth.data = data;
                    window.auth.done = true;
                    window.location.hash = "";
                });
                WebSocket.handle("login fail", function(){
                    btsp.createAlert("danger", "Авторизация не удалась: ", "неправильная пара логин, пароль.");
                });

                btsp.addToBody(btsp.getAuthForm(
                    /// TODO add button spam blocker and request sended display object
                    /// TODO work around server fails
                    function(a, b){WebSocket.send("post login " + a + " " + cryp.hash(b));}, 
                    function(){window.location.hash = "";
                    window.auth = {};
                    window.auth.done = true;}));
            },
        };
        return login;
    }
    
)