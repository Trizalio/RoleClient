define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container, Path){
                btsp.createAlert("info", "Раздел в разработке. ", "Здесь будет отображатся список всего персонала");
                var WebSocket = ws.getWebSocket();
                console.log(Path);
                WebSocket.send("get people");
                WebSocket.handle("people data", function(Data){

                    var People = jQuery.parseJSON(Data);
                    console.log(People);
                
                    // var Jumbotron = dom.create(
                        // {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                    // Container.appendChild(Jumbotron);

                    People.forEach(function(Entry) {
                        var Man = jQuery.parseJSON(Entry);
                        priv.renderMan(Container, Man);
                        console.log(Man);   
                    });
                });
            },
            renderMan: function (Container, Man){
                Container.appendChild(btsp.getManDisplay(Man));
                console.log(Man);
            },
        };
        return priv;
    }
    
)