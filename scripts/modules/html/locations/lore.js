define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var lore = {
            show: function (Container, Path){
                console.log(Path);
                window.CurrentLocation = "lore";
                // if(Path.length == 0)
                // {
                // btsp.createAlert("info", "Раздел в разработке. ", "Здесь будет отображатся список всего персонала");
                var WebSocket = ws.getWebSocket();
                console.log(Path);
                WebSocket.send("get lore");
                WebSocket.handle("lore data", function(Data){

                    var Lores = jQuery.parseJSON(Data);
                    console.log(Lores);
                
                    // var Jumbotron = dom.create(
                        // {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                    // Container.appendChild(Jumbotron);

                    Lores.forEach(function(Entry) {
                        lore.renderLore(Container, Entry);
                    });
                });
                // }
            },
            renderLore: function (Container, LoreBlock){

                console.log(LoreBlock);
                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                dom.insert(Container, Jumbotron);
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h3", text:LoreBlock.Title}));
                var MAX_LENGTH = 60;
                if(LoreBlock.Text.length > MAX_LENGTH)
                {
                    var preText = LoreBlock.Text.substr(MAX_LENGTH);
                    var separator = preText.search(" ");
                    if(separator >= 0)
                    {
                        var subText = LoreBlock.Text.substr(0, MAX_LENGTH + separator);
                        var subBlock = dom.create({tag:"h4", text:subText});
                        dom.insert(Jumbotron, subBlock);

                        var opener = dom.create(
                                {tag:"a", text:">>>", href:"#lore"});

                        var openFun = function()
                        {
                            dom.set(subBlock, {text:LoreBlock.Text});
                            dom.set(opener, {text:"<<<"});
                            dom.set(opener, {onclick:closeFun});
                        }
                        var closeFun = function()
                        {
                            dom.set(subBlock, {text:subText});
                            dom.set(opener, {text:">>>"});
                            dom.set(opener, {onclick:openFun});
                        }
                        dom.set(opener, {onclick:openFun});

                        dom.insert(Jumbotron, opener);
                    }


                    // dom.insert(Jumbotron,
                    //     dom.create(
                    //         {tag:"a", text:">>>", href:"#lore", onclick:function(){
                    //             dom.set(subBlock, {text:LoreBlock.Text});
                    //             dom.set(this, {text:"<<<", });

                    //         }}
                    //         ));
                }
                else
                {
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h4", text:LoreBlock.Text}));
                }

                var Users = dom.create(
                        {tag:"p", text:""});
            },
        };
        return lore;
    }
    
)