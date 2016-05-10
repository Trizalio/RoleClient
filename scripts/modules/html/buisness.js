define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket",
    "modules/html/locations/login",
    "modules/html/locations/private",
    "modules/html/locations/messages",
    "modules/html/locations/projects",
    "modules/html/locations/people",
    "modules/html/locations/news",
    "modules/html/locations/qrpage",
    "modules/html/locations/status",
    "modules/html/audio"],
    function(dom, btsp, ws, login, priv, mes, proj, peop, news, qrp, stat, audi){
        audi.speak("Соединение установлено");
        var buis = {
            ////////////////////////////////
            /// TODO WEBSOCKET RECONNECT ///
            ////////////////////////////////
            addChildLocation: function(Address, ParentAddress, Handler){
                if(!buis._handlers){
                    console.error("buis._handlers is undefined");
                    return;
                }
                buis._handlers[Address] = Handler;

                if(!buis._locations){
                    console.error("buis._locations is undefined");
                    return;
                }
                buis._locations[Address] = buis._locations[ParentAddress];
            },
            addLocation: function(Name, Address, Handler){
                // console.log(buis);
                if(!buis._handlers){
                    buis._handlers = {};
                }
                buis._handlers[Address] = Handler;

                if(!buis._locations){
                    buis._locations = {};
                }
                buis._locations[Address] = btsp.addActionToHead(Name, buis.authFail, "#" + Address);
                
                // console.log(buis._handlers);
            },
            addDefaultLocation: function(Name, Address, Handler){
                // console.log(buis);
                buis._defaultHandler = Handler;
                // console.log(buis._defaultHandler);  
                btsp.setNameToHead(Name, buis.authFail, "#" + Address);


                // btsp.addExpButton(Name, buis.authFail, "test");
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
                // console.log(Hash);
                var Path = Hash.split("#");
                var Container = btsp.getBodyContainer();
                var Handler;

                for (var LocationObject in buis._locations) {
                    if (buis._locations.hasOwnProperty(LocationObject)) {
                        dom.set(buis._locations[LocationObject], {class:""});
                    }
                }

                if(window.auth && window.auth.done){
                    console.log(Path);
                    if (Path.length > 1) {
                        var TargetLocation = Path[1];
                        Path.splice(0, 2);
                        console.log(TargetLocation);
                        Handler = buis._handlers[TargetLocation];
                        LocationObject = buis._locations[TargetLocation];
                        if(LocationObject){
                            dom.set(LocationObject, {class:"active"});
                        }

                    } else {
                        console.log(buis._defaultHandler);
                        Handler = buis._defaultHandler;
                    }
                }else{
                    window.location.hash = "login";
                    Handler = buis._loginHandler;
                }

                if(Handler) {
                    // console.log(Handler);
                    btsp.clean(Container);
                    btsp.deleteAlerts();
                    if(window.auth && window.auth.data == "admin"){
                    btsp.createAlert("warning", "#НЕ ИГРА# Вы авторизованы как администратор. ", 
                        "Если Вы не заходили под администратором, пожалуйста, свяжитесь с МГ. И помните, большая сила - большая ответственность.");
                    }
                    Handler.show(Container, Path);
                } else {
                    window.location.hash = "";
                    // console.log("ERROR: location handler isn`t set", Hash);
                }
                
            },
            authFail: function (){
                
            },
            init: function (){
                window.onhashchange = buis.processHash;
                // TODO: get hash and navigate there
                btsp.initHideButton();
                buis.addDefaultLocation("База", "status", stat);
                buis.addLocation("Лента", "news", news);
                buis.addLocation("Статус", "status", stat);
                buis.addLocation("Воздействия", "qrpage", qrp);
                buis.addLocation("Проекты", "projects", proj);
                buis.addLocation("Люди", "people", peop);
                // buis.addChildLocation("player", "people", peop);
                buis.addLocation("Сообщения", "messages", mes);
                buis.addLocation("Мой профиль", "private", priv);
                // buis.addLocation("Выход", "exit", {show:function(){
                //     window.location.hash = "login";
                //     window.authDone = false;}});
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