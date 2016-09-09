define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var qrpContainer;
        var stat = {

            decreaseHP: function (){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post healthloss");
            },
            decreasePP: function (){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post psyloss");
            },

            render:function(Container, Data)
            {
                btsp.clean(Container);
                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation", id:"qrController"});
                dom.insert(Container, Jumbotron);

                var BaseForm = dom.create(
                    {
                        tag:"form",
                        class:"form",
                    }
                );
                dom.insert(Jumbotron, BaseForm);


                stat.addButtonToolbar(BaseForm, 
                    [
                        [
                            {text:"Здоровье"}
                        ],
                        [
                            {text:"-", callback:stat.decreaseHP},
                            {text:Data.Hp + "/" + Data.HpMax}
                        ]
                    ]
                );
                stat.addButtonToolbar(BaseForm, 
                    [
                        [
                            {text:"Психика"}
                        ],
                        [
                            {text:"-", callback:stat.decreasePP},
                            {text:Data.Pp + "%"}
                        ]
                    ]
                );
                if(Data.Air > 0)
                {
                    stat.addButtonToolbar(BaseForm, 
                        [
                            [
                                {text:"Вы находитесь за пределами станции"}
                            ]
                        ]
                    );
                    if(Data.Air > 7 * 60) {
                        stat.addButtonToolbar(BaseForm, 
                            [
                                [
                                    {text:"Запас воздуха"}
                                ],
                                [
                                    {text:Math.ceil((Data.Air - (7 * 60)) / 6)/10 + " мин"}
                                ]
                            ]
                        );
                    }else{
                        if(Data.Air > 4 * 60) {
                            stat.addButtonToolbar(BaseForm, 
                                [
                                    [
                                        {text:"Кислородное голодание:"}
                                    ],
                                    [
                                        {text:"Самочувствие нормальное"}
                                    ],
                                    [
                                        {text:"Смерть через"}
                                    ],
                                    [
                                        {text:Math.ceil(Data.Air / 6)/10 + " мин"}
                                    ]
                                ]
                            );
                        }else if(Data.Air > 2 * 60) {
                            stat.addButtonToolbar(BaseForm, 
                                [
                                    [
                                        {text:"Кислородное голодание:"}
                                    ],
                                    [
                                        {text:"Головокружение, слабость, тошнота"}
                                    ],
                                    [
                                        {text:"Смерть через"}
                                    ],
                                    [
                                        {text:Math.ceil(Data.Air / 6)/10 + " мин"}
                                    ]
                                ]
                            );
                        }else {
                            stat.addButtonToolbar(BaseForm, 
                                [
                                    [
                                        {text:"Кислородное голодание:"}
                                    ],
                                    [
                                        {text:"Повреждение лёгких"}
                                    ],
                                    [
                                        {text:"Смерть через"}
                                    ],
                                    [
                                        {text:Math.ceil(Data.Air / 6)/10 + " мин"}
                                    ]
                                ]
                            );
                        }
                    }
                    if(Data.Air < 7 * 60) {

                    }
                }else{
                    stat.addButtonToolbar(BaseForm, 
                        [
                            [
                                {text:"Вы находитесь на станции"}
                            ]
                        ]
                    );
                }

                if(Data.Stun > 0)
                {
                    stat.addButtonToolbar(BaseForm, 
                        [
                            [
                                {text:"Вы оглушены:"}
                            ],
                            [
                                {text:"Без сознания"}
                            ],
                            [
                                {text:Math.ceil(Data.Stun / 6)/10 + " мин"}
                            ]
                        ]
                    );
                }
            },

            show: function (Container, Path){
                console.log(Path);

                window.CurrentLocation = "status";

                var WebSocket = ws.getWebSocket();
                WebSocket.handle("status data", function(Data){
                    if(window.CurrentLocation == "status")
                    {
                        Status = jQuery.parseJSON(Data);
                        console.log(Status);
                        stat.render(Container, Status);
                    }
                });
                WebSocket.handle("update status", function(Data){
                    if(window.CurrentLocation == "status")
                    {
                        WebSocket.send("get status");
                    }
                });
                WebSocket.send("get status");


            },



            addButtonToolbar: function (BaseForm, ButtonsArrayArray){
                var Toolbar = dom.create(
                        {
                            tag:"div",
                            class:"btn-toolbar",
                            role:"toolbar",
                        }
                    );
                dom.insert(BaseForm, Toolbar);

                for (var i = 0; i < ButtonsArrayArray.length; ++i) {
                    stat.addButtonGroup(Toolbar, ButtonsArrayArray[i]);
                };

            },
            addButtonGroup: function (ButtonToolbar, ButtonsArray){
                var Group = dom.create(
                        {
                            tag:"div",
                            class:"btn-group",
                            role:"group",
                        }
                    );
                dom.insert(ButtonToolbar, Group);

                for (var i = 0; i < ButtonsArray.length; ++i) {
                    stat.addButton(Group, ButtonsArray[i].text, ButtonsArray[i].callback);
                };
            },

            addButton: function (ButtonGroup, text, callback){

                var objToCreate = 
                        {
                            tag:"button",
                            type:"button",
                            class:"btn btn-lg btn-default",
                            text:text,
                        };
                if(!callback){
                    objToCreate.class += " disabled";
                }else{
                    objToCreate.onclick = callback;
                }
                var Button = dom.create(objToCreate);
                dom.insert(ButtonGroup, Button);
            },

            
        };
        return stat;
    }
    
)