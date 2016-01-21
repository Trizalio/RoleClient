define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket", "modules/html/locations/login", "modules/html/locations/private"],
    function(dom, btsp, ws, login, priv){
        var buis = {
            addLocation: function(Name, Address, Handler){
                // console.log(buis);
                if(!buis._handlers){
                    buis._handlers = {};
                }
                buis._handlers[Address] = Handler;
                // console.log(buis._handlers);
                btsp.addActionToHead(Name, buis.authFail, "#" + Address);
            },
            addDefaultLocation: function(Name, Address, Handler){
                // console.log(buis);
                buis._defaultHandler = Handler;
                // console.log(buis._defaultHandler);  
                btsp.setNameToHead(Name, buis.authFail, "#");
            },
            addLoginLocation: function(Handler){
                // console.log(buis);
                buis._loginHandler = Handler;
                // console.log(buis._loginHandler);
            },
            checkInit: function(){
                if(!buis._initDone) {
                    buis.init();
                    buis._initDone = true;
                }
            },
            // go: function(destination) {
            //     window.location.hash = destination;
            // },
            /*auth: function (){
                // TODO: get hash and navigate there
                // window.location.hash = "home";
                btsp.setNameToHead("Name", buis.goHome, "#home");

                var WebSocket = ws.getWebSocket();
                // WebSocket.send("get map");
                WebSocket.handle("login ok", buis.init);
                WebSocket.handle("login fail", function(){
                    btsp.createAlert("danger", "Авторизация не удалась: ", "неправильная пара логин, пароль.");
                });

                btsp.addToBody(btsp.getAuthForm(
                    /// TODO add button spam blocker and request sended display object
                    /// TODO work around server fails
                    function(a, b){WebSocket.send("post login " + a + " " + cryp.hash(b));}, 
                    buis.init));
            },*/

            processHash: function (){
                buis.checkInit();
                    

                var Hash = window.location.hash;
                console.log(Hash);
                var Path = Hash.split("#");
                var Container = btsp.getBodyContainer();
                var Handler;

                if(window.authDone){
                    if (Path.length > 1) {
                        var TargetLocation = Path[1];
                        console.log(TargetLocation);
                        Handler = buis._handlers[TargetLocation];
                        Path.splice(0, 2);

                    } else {
                        console.log(buis._defaultHandler);
                        Handler = buis._defaultHandler;
                    }
                }else{
                    window.location.hash = "login";
                    Handler = buis._loginHandler;
                }

                if(Handler) {
                    console.log(Handler);
                    btsp.clean(Container);
                    Handler.show(Container, Path);
                } else {
                    console.log("ERROR: location handler isn`t set", Hash);
                }
                
            },
            authFail: function (){
                
            },
            init: function (){
                window.onhashchange = buis.processHash;
                // TODO: get hash and navigate there
                btsp.initHideButton();
                buis.addDefaultLocation("База", "home", priv);
                buis.addLocation("Мой профиль", "private", priv);
                buis.addLoginLocation(login);

                // btsp.deleteBody();
                // btsp.deleteAlerts();
                // btsp.initHideButton();
                // console.log(buis);
                // btsp.addActionToHead("Новости", buis.goNews, "#news");
                // btsp.addActionToHead("Проекты", buis.goProjects, "#projects");
                // btsp.addActionToHead("Люди", buis.goPeople, "#people");
                // btsp.addActionToHead("Мой профиль", buis.goPrivate, "#private");
                
            },
            /*goHome: function (){
                btsp.deleteBody();
                btsp.addToBody(dom.create({tag:"p", text:"home"}));
            },
            goNews: function (){
                btsp.deleteBody();
                btsp.addToBody(dom.create({tag:"p", text:"news"}));
            },
            goProjects: function (){
                btsp.deleteBody();
                btsp.addToBody(dom.create({tag:"p", text:"projects"}));
            },
            goPeople: function (){
                btsp.deleteBody();
                btsp.addToBody(dom.create({tag:"p", text:"people"}));
            },
            goPrivate: function (){
                priv.showPrivate(btsp.getBodyContainer());
                // btsp.deleteBody();
                // btsp.addToBody(dom.create({tag:"p", text:"private"}));
            },*/
            // renderNews: function (){
            //     // dom.deleteBody();
                
            // },
        }
        return buis;
    }
)