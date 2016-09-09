define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container){
                window.CurrentLocation = "exit";
                
                var Well = dom.create({tag:"div", class:"well center-block"});
                Well.style["max-width"] = "400px";

                var Button = dom.create({tag:"button", class:"btn btn-danger btn-block", 
                    text:"Выход", onclick:priv.logout});
                var Text = dom.create({tag:"h2", 
                    text:"Для выхода нажмите"});

                dom.insert(Well,
                    dom.insert(dom.create({tag:"p"}), Text)
                );
                dom.insert(Well,
                    dom.insert(dom.create({tag:"p"}), Button)
                );
                dom.insert(Container, Well);

                // Well.style["max-width"] = "400px";
                // var Row1 = dom.insert(
                //     dom.create({tag:"div", class:"row"}),
                //     dom.create({tag:"div", class:"well center-block", text:"Если Вы хотите покинуть базу нажмите"})
                // );
                // dom.insert(Container, Row1);

                // var Div = dom.insert(
                //     dom.create({tag:"div", class:"col-sm-2 col-sm-offset-5"}),
                //     dom.create({tag:"button", class:"btn btn-danger", text:"Выход", onclick:priv.logout})
                // );
                // var Row2 = dom.insert(
                //     dom.create({tag:"div", class:"row"}),
                //     Div
                // );
                // dom.insert(Container, Row2);

            },
            logout: function(){
                localStorage.setItem("login", "");
                localStorage.setItem("passwordHash", "");
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post logout");
                WebSocket.handle("logout ok", function(){
                    window.auth = {};
                    window.location.hash = "#login";
                });
            },
        };
        return priv;
    }
    
)