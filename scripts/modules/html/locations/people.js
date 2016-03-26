define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        console.log(WebSocket);
        var priv = {
            show: function (Container, Path){
                var WebSocket = ws.getWebSocket();
                if(Path.length == 0)
                {
                // btsp.createAlert("info", "Раздел в разработке. ", "Здесь будет отображатся список всего персонала");
                    console.log(Path);
                    console.log(WebSocket);
                    WebSocket.handle("people data", function(Data){
                        btsp.clean(Container);
                        if(window.auth && window.auth.data == "admin"){
                            priv.renderUserAddMinimal(Container, true);
                        }
                        var People = jQuery.parseJSON(Data);
                        console.log(People);

                        People.forEach(function(Entry) {
                            priv.renderUserMinmal(Container, Entry);
                        });
                    });
                    WebSocket.handle("players data", function(Data){
                        btsp.clean(Container);
                        if(window.auth && window.auth.data == "admin"){
                            priv.renderUserAddMinimal(Container, false);
                        }
                        var Players = jQuery.parseJSON(Data);
                        console.log(Players);

                        Players.forEach(function(Entry) {
                            priv.renderPlayerMinmal(Container, Entry);
                        });
                    });
                    WebSocket.send("get people");
                }
                else
                {
                    var IsUser = Path[0] == "user";
                    var UserId = parseInt(Path[1]);
                    var WebSocket = ws.getWebSocket();

                    if(Path[0] == "user"){
                        WebSocket.handle("user data", function(Data){
                            btsp.clean(Container);
                            var Group = jQuery.parseJSON(Data);
                            priv.renderUser(Container, Group);
                        });
                        WebSocket.send("get user " + UserId);
                    }
                    else if(Path[0] == "player"){
                        var Player;

                        WebSocket.handle("player data", function(Data){
                            Player = jQuery.parseJSON(Data);
                            WebSocket.send("get users");
                        });

                        WebSocket.handle("users data", function(Data){
                            var Users = jQuery.parseJSON(Data);
                            btsp.clean(Container);
                            priv.renderPlayer(Container, Player, Users);
                        });
                         WebSocket.send("get player " + UserId);
                    }
                }
            },

            readUserData: function (Id, sendFunction){
                console.log("readUpdateUserData");
                var inputNameObj = document.getElementById("inputName");
                var inputSurnameObj = document.getElementById("inputSurname");
                var inputPatronymicObj = document.getElementById("inputPatronymic");
                var inputBirthDateObj = document.getElementById("inputBirthDate");
                var inputProfessionObj = document.getElementById("inputProfession");
                var inputDescriptionObj = document.getElementById("inputDescription");
                if(inputNameObj 
                    && inputSurnameObj 
                    && inputPatronymicObj 
                    && inputBirthDateObj 
                    && inputProfessionObj
                    && inputDescriptionObj){
                    var newUser = {
                        Name: inputNameObj.value,
                        Surname: inputSurnameObj.value,
                        Patronymic: inputPatronymicObj.value,
                        BirthDate: inputBirthDateObj.value,
                        Profession: inputProfessionObj.value,
                        Description: inputDescriptionObj.value,
                    };
                    if(Id){
                        newUser.Id = Id;
                    }
                    var fail = false;
                    if(!newUser.Name){
                        inputNameObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputNameObj.style["background-color"] = "#FFFFFF";
                    }
                    if(!newUser.Surname){
                        inputSurnameObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputSurnameObj.style["background-color"] = "#FFFFFF";
                    }
                    if(!newUser.Patronymic){
                        inputPatronymicObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputPatronymicObj.style["background-color"] = "#FFFFFF";
                    }
                    console.log(newUser);
                    if(!fail)
                    {
                        sendFunction(newUser);
                    }
                }else{
                    console.log("internalError");
                }
            },

            readPlayerData: function (Id, sendFunction){
                console.log("readUpdateUserData");
                var inputNameObj = document.getElementById("inputName");
                var inputSurnameObj = document.getElementById("inputSurname");
                var inputPatronymicObj = document.getElementById("inputPatronymic");
                var inputNickObj = document.getElementById("inputNick");
                var inputBirthDateObj = document.getElementById("inputBirthDate");
                var inputQuentaObj = document.getElementById("inputQuenta");
                var inputUserObj = document.getElementById("inputUser");
                var inputAdminObj = document.getElementById("inputAdmin");
                if(inputNameObj 
                    && inputSurnameObj 
                    && inputPatronymicObj 
                    && inputNickObj
                    && inputBirthDateObj 
                    && inputQuentaObj){
                    var newPlayer = {
                        Name: inputNameObj.value,
                        Surname: inputSurnameObj.value,
                        Patronymic: inputPatronymicObj.value,
                        Nick: inputNickObj.value,
                        BirthDate: inputBirthDateObj.value,
                        Quenta: inputQuentaObj.value,
                    };
                    if(Id){
                        newPlayer.Id = Id;
                    }
                    if(inputUserObj){
                        newPlayer.UserId = parseInt(inputUserObj.value);
                    }else{
                        newPlayer.UserId = 0;
                    }
                    if(inputAdminObj){
                        newPlayer.Admin = inputAdminObj.checked;
                    }else{
                        newPlayer.Admin = false;
                    }
                    var fail = false;
                    if(!newPlayer.Name){
                        inputNameObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputNameObj.style["background-color"] = "#FFFFFF";
                    }
                    if(!newPlayer.Surname){
                        inputSurnameObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputSurnameObj.style["background-color"] = "#FFFFFF";
                    }
                    if(!newPlayer.Patronymic){
                        inputPatronymicObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputPatronymicObj.style["background-color"] = "#FFFFFF";
                    }
                    console.log(newPlayer);
                    if(!fail)
                    {
                        sendFunction(newPlayer);
                    }
                }else{
                    console.log("internalError");
                }
            },
            renderUpdateUser: function (Id){
                var Jumbotron = document.getElementById("userData");
                var updateButton = document.getElementById("updateButton");
                if(!Jumbotron){
                    console.log("no Jumbotron!");
                    return;
                }
                if(updateButton){
                    console.log("updateButton already exists!");
                    return;
                }

                var outputNameObj = document.getElementById("inputName");
                var inputNameObj = dom.create
                (
                    {
                        id:"inputName",
                        tag:"input", 
                        type:"text", 
                        value:outputNameObj.innerHTML,
                        placeholder:"Имя"
                    }
                );
                outputNameObj.parentNode.replaceChild(inputNameObj, outputNameObj);

                var outputSurnameObj = document.getElementById("inputSurname");
                var inputSurnameObj = dom.create
                (
                    {
                        id:"inputSurname",
                        tag:"input", 
                        type:"text", 
                        value:outputSurnameObj.innerHTML,
                        placeholder:"Фамилия"
                    }
                );
                outputSurnameObj.parentNode.replaceChild(inputSurnameObj, outputSurnameObj);

                var outputPatronymicObj = document.getElementById("inputPatronymic");
                var inputPatronymicObj = dom.create
                (
                    {
                        id:"inputPatronymic",
                        tag:"input", 
                        type:"text", 
                        value:outputPatronymicObj.innerHTML,
                        placeholder:"Отчество"
                    }
                );
                outputPatronymicObj.parentNode.replaceChild(inputPatronymicObj, outputPatronymicObj);

                var outputBirthdateObj = document.getElementById("inputBirthDate");
                var inputBirthDateObj = dom.create
                (
                    {
                        id:"inputBirthDate",
                        tag:"input", 
                        type:"date", 
                        value:outputBirthdateObj.innerHTML,
                    }
                );
                outputBirthdateObj.parentNode.replaceChild(inputBirthDateObj, outputBirthdateObj);

                var outputProfessionObj = document.getElementById("inputProfession");
                var inputProfessionObj = dom.create
                (
                    {
                        id:"inputProfession",
                        tag:"input", 
                        type:"text", 
                        value:outputProfessionObj.innerHTML,
                        placeholder:"Специализация"
                    }
                );
                outputProfessionObj.parentNode.replaceChild(inputProfessionObj, outputProfessionObj);

                var outputDescriptionObj = document.getElementById("inputDescription");
                var inputDescriptionObj = dom.create
                (
                    {
                        id:"inputDescription",
                        tag:"input", 
                        type:"text", 
                        value:outputDescriptionObj.innerHTML,
                        placeholder:"Статус"
                    }
                );
                outputDescriptionObj.parentNode.replaceChild(inputDescriptionObj, outputDescriptionObj);


                dom.insert(Jumbotron, 
                    dom.create
                    (
                        {
                            id:"updateButton",
                            tag:"button", 
                            text:"Сохранить изменения",
                            class:"btn btn-success btn-sm",
                            onclick:function(){
                                priv.readUserData(Id, priv.sendUpdateUserData);
                            }
                        }
                    )
                );

            },

            renderUpdatePlayer: function (Id){
                var Jumbotron = document.getElementById("userData");
                var updateButton = document.getElementById("updateButton");
                if(!Jumbotron){
                    console.log("no Jumbotron!");
                    return;
                }
                if(updateButton){
                    console.log("updateButton already exists!");
                    return;
                }

                var outputNameObj = document.getElementById("inputName");
                var inputNameObj = dom.create
                (
                    {
                        id:"inputName",
                        tag:"input", 
                        type:"text", 
                        value:outputNameObj.innerHTML,
                        placeholder:"Имя"
                    }
                );
                outputNameObj.parentNode.replaceChild(inputNameObj, outputNameObj);

                var outputSurnameObj = document.getElementById("inputSurname");
                var inputSurnameObj = dom.create
                (
                    {
                        id:"inputSurname",
                        tag:"input", 
                        type:"text", 
                        value:outputSurnameObj.innerHTML,
                        placeholder:"Фамилия"
                    }
                );
                outputSurnameObj.parentNode.replaceChild(inputSurnameObj, outputSurnameObj);

                var outputPatronymicObj = document.getElementById("inputPatronymic");
                var inputPatronymicObj = dom.create
                (
                    {
                        id:"inputPatronymic",
                        tag:"input", 
                        type:"text", 
                        value:outputPatronymicObj.innerHTML,
                        placeholder:"Отчество"
                    }
                );
                outputPatronymicObj.parentNode.replaceChild(inputPatronymicObj, outputPatronymicObj);

                var outputNickObj = document.getElementById("inputNick");
                var inputNickObj = dom.create
                (
                    {
                        id:"inputNick",
                        tag:"input", 
                        type:"text", 
                        value:outputNickObj.innerHTML,
                        placeholder:"Ник"
                    }
                );
                outputNickObj.parentNode.replaceChild(inputNickObj, outputNickObj);

                var outputBirthdateObj = document.getElementById("inputBirthDate");
                var inputBirthDateObj = dom.create
                (
                    {
                        id:"inputBirthDate",
                        tag:"input", 
                        type:"date", 
                        value:outputBirthdateObj.innerHTML,
                    }
                );
                outputBirthdateObj.parentNode.replaceChild(inputBirthDateObj, outputBirthdateObj);

                

                var outputQuentaObj = document.getElementById("inputQuenta");
                var inputQuentaObj = dom.create
                (
                    {
                        id:"inputQuenta",
                        tag:"input", 
                        type:"text", 
                        value:outputQuentaObj.innerHTML,
                        placeholder:"Квента"
                    }
                );
                outputQuentaObj.parentNode.replaceChild(inputQuentaObj, outputQuentaObj);


                var outputUserObj = document.getElementById("inputUser");
                outputUserObj.disabled = false;

                var outputAdminObj = document.getElementById("inputAdmin");
                outputAdminObj.disabled = false;


                dom.insert(Jumbotron, 
                    dom.create
                    (
                        {
                            id:"updateButton",
                            tag:"button", 
                            text:"Сохранить изменения",
                            class:"btn btn-success btn-sm",
                            onclick:function(){
                                priv.readPlayerData(Id, priv.sendUpdatePlayerData);
                            }
                        }
                    )
                );

            },

            renderPlayer: function (Container, Player, Users){
                console.log(Player);

                var Jumbotron = dom.create(
                    {id:"userData", tag:"div",class:"jumbotron col-lg-12",role:"presentation"});

                if(window.auth.data == "admin"){
                    var AdminPanel = dom.create
                    (
                        {
                            tag:"div",
                            // class:"well well-sm",
                            class:"btn-toolbar"
                        }
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Изменить данные игрока",
                                class:"btn btn-info btn-sm",
                                onclick:function(){
                                    priv.renderUpdatePlayer(Player.Id);
                                }
                            }
                        )
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Зайти за этого игрока",
                                class:"btn btn-info btn-sm",
                                onclick:function(){priv.sendLogas(Player);}
                                
                            }
                        )
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Удалить игрока",
                                class:"btn btn-warning btn-sm",
                                onclick:function(){
                                    var deleter = document.getElementById("deleter");
                                    console.log(deleter);
                                    if(deleter){
                                        deleter.className = "btn btn-warning btn-sm";
                                    }
                                }
                            }
                        )
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                id:"deleter", 
                                tag:"button", 
                                text:"Удалить(отключено на сервере)",
                                class:"btn btn-warning btn-sm hidden",
                                onclick:function(){
                                    priv.sendDeletePlayer(Player.Id);
                                    document.getElementById("deleter").className 
                                                = "btn btn-warning btn-sm hidden";
                                }
                            }
                        )
                    );
                    dom.insert(Container,AdminPanel);
                }

                dom.insert(Container,Jumbotron);

                var NameGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(NameGroup, dom.create(
                        {tag:"b", text:"Имя: "}));
                dom.insert(NameGroup, dom.create(
                        {id:"inputName",tag:"text", text:Player.Name}));
                dom.insert(Jumbotron,NameGroup);

                var SurnameGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(SurnameGroup, dom.create(
                        {tag:"b", text:"Фамилия: "}));
                dom.insert(SurnameGroup, dom.create(
                        {id:"inputSurname",tag:"text", text:Player.Surname}));
                dom.insert(Jumbotron,SurnameGroup);

                var PatronymicGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(PatronymicGroup, dom.create(
                        {tag:"b", text:"Отчество: "}));
                dom.insert(PatronymicGroup, dom.create(
                        {id:"inputPatronymic",tag:"text", text:Player.Patronymic}));
                dom.insert(Jumbotron,PatronymicGroup);

                var NickGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(NickGroup, dom.create(
                        {tag:"b", text:"Ник: "}));
                dom.insert(NickGroup, dom.create(
                        {id:"inputNick",tag:"text", text:Player.Nick}));
                dom.insert(Jumbotron, NickGroup);

                var BirthDateGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(BirthDateGroup, dom.create(
                        {tag:"b", text:"Дата рождения: "}));
                dom.insert(BirthDateGroup, dom.create(
                        {id:"inputBirthDate",tag:"text", text:Player.BirthDate}));
                dom.insert(Jumbotron,BirthDateGroup);

                var QuentaGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(QuentaGroup, dom.create(
                        {tag:"b", text:"Квента: "}));
                dom.insert(QuentaGroup, dom.create(
                        {id:"inputQuenta",tag:"text", text:Player.Quenta}));
                dom.insert(Jumbotron, QuentaGroup);

      // <select class="form-control">
      //   <option>test</option>
      //   <option>2</option>
      // </select>

      // <select class="form-control" id="sel1">
      //   <option value="1">test</option>
      //   <option>2</option>
      //   <option>3</option>
      //   <option>4</option>
      // </select>
                var UserGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(UserGroup, dom.create(
                        {tag:"b", text:"Персонаж: "}));
                var Selector = dom.create(
                        {id:"inputUser",tag:"select", class:"form-control"});
                    dom.insert(Selector,
                        dom.create(
                            {
                                tag:"option", 
                                text:"Нет персонажа", 
                                value:0
                            }));
                for (var i = 0; i < Users.length; ++i) {
                    dom.insert(Selector,
                        dom.create(
                            {
                                tag:"option", 
                                text:Users[i].Surname + " " + 
                                    Users[i].Name + " " + 
                                    Users[i].Patronymic + ", " + 
                                    Users[i].Profession, 
                                value:Users[i].Id
                            }));
                }
                Selector.value = Player.UserId;
                Selector.disabled = true;


                // dom.insert(Selector, dom.create(
                //         {tag:"b", text:"Персонаж: "}));
                dom.insert(UserGroup, Selector);
                dom.insert(Jumbotron, UserGroup);



    //             <div class="checkbox disabled">
    //   <label><input type="checkbox" disabled>Option 3</label>
    // </div>
                var AdminGroup = dom.create(
                    {tag:"p"}
                )
                var checkbox = dom.create(
                        {id:"inputAdmin", tag:"input", type:"checkbox"});
                checkbox.disabled = true;
                checkbox.checked = Player.Admin;
                dom.insert(AdminGroup, dom.create(
                        {tag:"b", text:"Администратор: "}));
                dom.insert(AdminGroup, checkbox);
                // dom.insert(AdminGroup, 
                //     dom.insert(
                //         dom.create(
                //             {id:"inputAdmin",tag:"div", text:Player.Admin}),
                //         dom.insert(
                //             dom.create(
                //                 {tag:"label", text:Player.Admin}),
                //             dom.create(
                //                 {id:"inputAdmin",tag:"input", text:Player.Admin})
                //             )
                //         )
                //     )
                // );
                dom.insert(Jumbotron, AdminGroup);

                // var ProfessionGroup = dom.create(
                //     {tag:"p"}
                // )
                // dom.insert(ProfessionGroup, dom.create(
                //         {tag:"b", text:"Специальность: "}));
                // dom.insert(ProfessionGroup, dom.create(
                //         {id:"inputProfession",tag:"text", text:User.Profession}));
                // dom.insert(Jumbotron,ProfessionGroup);

                // var DescriptionGroup = dom.create(
                //     {tag:"p"}
                // )
                // dom.insert(DescriptionGroup, dom.create(
                //         {tag:"b", text:"Имя: "}));
                // dom.insert(DescriptionGroup, dom.create(
                //         {id:"inputDescription",tag:"text", text:User.Description}));
                // dom.insert(Jumbotron,DescriptionGroup);


                /*dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Имя: " + User.Name}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Фамилия: " + User.Surname}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Отчество: " + User.Patronymic}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Специальность: " + User.Profession}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Характеристика: " + User.Description}));*/
                // var GroupsListDOMO = dom.create(
                //         {tag:"p", text:"Состоит в группах: "});
                // dom.insert(Jumbotron, GroupsListDOMO);
                // for (var i = 0; i < User.Groups.length; ++i) {
                //     if( i > 0){
                //         dom.insert(GroupsListDOMO,
                //             dom.create(
                //                 {tag:"no", 
                //                 text:", "}));
                //     }
                //     dom.insert(GroupsListDOMO,
                //         dom.create(
                //             {tag:"a", text:User.Groups[i].Name, href:"#projects#" + User.Groups[i].Id}));
                // }

            },
            renderUser: function (Container, User){
                console.log(User);

                var Jumbotron = dom.create(
                    {id:"userData", tag:"div",class:"jumbotron col-lg-12",role:"presentation"});

                if(window.auth.data == "admin"){
                    var AdminPanel = dom.create
                    (
                        {
                            tag:"div",
                            // class:"well well-sm",
                            class:"btn-toolbar"
                        }
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Изменить персонажа",
                                class:"btn btn-info btn-sm",
                                onclick:function(){
                                    priv.renderUpdateUser(User.Id);
                                }
                            }
                        )
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Удалить персонажа",
                                class:"btn btn-warning btn-sm",
                                onclick:function(){
                                    var deleter = document.getElementById("deleter");
                                    console.log(deleter);
                                    if(deleter){
                                        deleter.className = "btn btn-warning btn-sm";
                                    }
                                }
                            }
                        )
                    );
                    dom.insert(AdminPanel, 
                        dom.create
                        (
                            {
                                id:"deleter", 
                                tag:"button", 
                                text:"Удалить(отключено на сервере)",
                                class:"btn btn-warning btn-sm hidden",
                                onclick:function(){
                                    priv.sendDeleteUser(User.Id);
                                    document.getElementById("deleter").className 
                                                = "btn btn-warning btn-sm hidden";
                                }
                            }
                        )
                    );
                    dom.insert(Container,AdminPanel);
                }

                dom.insert(Container,Jumbotron);

                var NameGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(NameGroup, dom.create(
                        {tag:"b", text:"Имя: "}));
                dom.insert(NameGroup, dom.create(
                        {id:"inputName",tag:"text", text:User.Name}));
                dom.insert(Jumbotron,NameGroup);

                var SurnameGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(SurnameGroup, dom.create(
                        {tag:"b", text:"Фамилия: "}));
                dom.insert(SurnameGroup, dom.create(
                        {id:"inputSurname",tag:"text", text:User.Surname}));
                dom.insert(Jumbotron,SurnameGroup);

                var PatronymicGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(PatronymicGroup, dom.create(
                        {tag:"b", text:"Отчество: "}));
                dom.insert(PatronymicGroup, dom.create(
                        {id:"inputPatronymic",tag:"text", text:User.Patronymic}));
                dom.insert(Jumbotron,PatronymicGroup);

                var BirthDateGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(BirthDateGroup, dom.create(
                        {tag:"b", text:"Дата рождения: "}));
                dom.insert(BirthDateGroup, dom.create(
                        {id:"inputBirthDate",tag:"text", text:User.BirthDate}));
                dom.insert(Jumbotron,BirthDateGroup);

                var ProfessionGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(ProfessionGroup, dom.create(
                        {tag:"b", text:"Специальность: "}));
                dom.insert(ProfessionGroup, dom.create(
                        {id:"inputProfession",tag:"text", text:User.Profession}));
                dom.insert(Jumbotron,ProfessionGroup);

                var DescriptionGroup = dom.create(
                    {tag:"p"}
                )
                dom.insert(DescriptionGroup, dom.create(
                        {tag:"b", text:"Статус: "}));
                dom.insert(DescriptionGroup, dom.create(
                        {id:"inputDescription",tag:"text", text:User.Description}));
                dom.insert(Jumbotron,DescriptionGroup);


                /*dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Имя: " + User.Name}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Фамилия: " + User.Surname}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Отчество: " + User.Patronymic}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Специальность: " + User.Profession}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"p", text:"Характеристика: " + User.Description}));*/
                var GroupsListDOMO = dom.create(
                        {tag:"p", text:"Состоит в группах: "});
                dom.insert(Jumbotron, GroupsListDOMO);
                for (var i = 0; i < User.Groups.length; ++i) {
                    if( i > 0){
                        dom.insert(GroupsListDOMO,
                            dom.create(
                                {tag:"no", 
                                text:", "}));
                    }
                    dom.insert(GroupsListDOMO,
                        dom.create(
                            {tag:"a", text:User.Groups[i].Name, href:"#projects#" + User.Groups[i].Id}));
                }
            },
            renderUserMinmal: function (Container, User){

                console.log(User);
                var WellUser = dom.insert(
                    dom.create(
                        {
                            tag:"div",
                            class:"well well-sm",
                        }
                    ),
                    dom.create
                    (
                        {
                            tag:"a", 
                            text: 
                                User.Surname + " " + 
                                User.Name + " " + 
                                User.Patronymic + ", " + 
                                User.Profession,
                            href:"#people#user#" + User.Id
                        }
                    )
                );
                dom.insert(Container,WellUser);
            },
            renderPlayerMinmal: function (Container, Player){

                console.log(Player);
                var WellUser = dom.insert(
                    dom.create(
                        {
                            tag:"div",
                            class:"well well-sm",
                        }
                    ),
                    dom.create
                    (
                        {
                            tag:"a", 
                            text: 
                                Player.Surname + " " + 
                                Player.Name + " " + 
                                Player.Patronymic + ", " + 
                                Player.Nick,
                            href:"#people#player#" + Player.Id,
                        }
                    )
                );
                dom.insert(Container,WellUser);
            },
            renderUserAddMinimal: function (Container, IsUser){
                var WebSocket = ws.getWebSocket();
                console.log("renderUserAddMinimal");

                var NewUser = dom.insert(
                    dom.create(
                        {
                            tag:"div",
                            class:"well well-sm",
                        }
                    ),
                    dom.create
                    (
                        {
                            tag:"button", 
                            text:"+",
                            class:"btn btn-default btn-sm",
                            "data-toggle":"collapse",
                            "data-target":"#creator",
                        }
                    )
                );
                // <ul class="nav nav-tabs nav-justified"> 
                //     <li role="presentation" class="active">
                //         <a href="#">Home</a>
                //     </li> 
                //     <li role="presentation">
                //         <a href="#">Profile</a>
                //     </li> 
                // </ul>
                if(IsUser)
                {
                    dom.insert(NewUser,
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Персонажи",
                                class:"btn btn-default btn-sm active",
                            }
                        )
                    );
                    dom.insert(NewUser,
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Игроки",
                                class:"btn btn-default btn-sm",
                                onclick:function(){WebSocket.send("get players");}
                            }
                        )
                    );

                    var UserForm = dom.create
                    (
                        {
                            id:"creator",
                            tag:"div", 
                            class:"collapse"
                        }
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputName", 
                                placeholder:"Имя"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputSurname", 
                                placeholder:"Фамилия"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputPatronymic", 
                                placeholder:"Отчество"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"date",
                                value:"2080-01-01",
                                class:"form-control",
                                id:"inputBirthDate", 
                                placeholder:"Дата рождения"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputProfession", 
                                placeholder:"Специальность"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputDescription", 
                                placeholder:"Статус"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Добавить нового персонажа",
                                class:"btn btn-info btn-sm",
                                onclick:function(){
                                    priv.readUserData(null, priv.sendNewUserData);
                                }
                            }
                        )
                    );
                    dom.insert(NewUser,UserForm);
                }
                else
                {
                    dom.insert(NewUser,
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Персонажи",
                                class:"btn btn-default btn-sm",
                                onclick:function(){WebSocket.send("get people");}
                            }
                        )
                    );
                    dom.insert(NewUser,
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Игроки",
                                class:"btn btn-default btn-sm active",
                            }
                        )
                    );

                    var UserForm = dom.create
                    (
                        {
                            id:"creator",
                            tag:"div", 
                            class:"collapse"
                        }
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputName", 
                                placeholder:"Имя"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputSurname", 
                                placeholder:"Фамилия"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputPatronymic", 
                                placeholder:"Отчество"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputNick", 
                                placeholder:"Ник"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"date",
                                value:"2080-01-01",
                                class:"form-control",
                                id:"inputBirthDate", 
                                placeholder:"Дата рождения"
                            }
                        )
                    );
                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"input",
                                type:"text",
                                class:"form-control",
                                id:"inputQuenta", 
                                placeholder:"Квента"
                            }
                        )
                    );

                    // var AdminGroup = dom.create(
                    //     {tag:"p"}
                    // )
                    // var checkbox = dom.create(
                    //         {id:"inputAdmin", tag:"input", type:"checkbox"});
                    // checkbox.disabled = true;
                    // checkbox.checked = Player.Admin;
                    // dom.insert(AdminGroup, dom.create(
                    //         {tag:"b", text:"Администратор: "}));
                    // dom.insert(AdminGroup, checkbox);
                    // var outputAdminObj = document.getElementById("inputAdmin");
                    // outputAdminObj.disabled = false;
                    // dom.insert(UserForm, AdminGroup);


                    dom.insert(UserForm, 
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:"Добавить нового игрока",
                                class:"btn btn-info btn-sm",
                                onclick:function(){
                                    priv.readPlayerData(null, priv.sendNewPlayerData);
                                }
                            }
                        )
                    );
                    dom.insert(NewUser,UserForm);
                }
                
                dom.insert(Container,NewUser);
            },
            /*readNewUserData: function (){
                console.log("readNewUserData");
                var inputNameObj = document.getElementById("inputName");
                var inputSurnameObj = document.getElementById("inputSurname");
                var inputPatronymicObj = document.getElementById("inputPatronymic");
                var inputBirthDateObj = document.getElementById("inputBirthDate");
                var inputProfessionObj = document.getElementById("inputProfession");
                var inputDescriptionObj = document.getElementById("inputDescription");
                if(inputNameObj 
                    && inputSurnameObj 
                    && inputPatronymicObj 
                    && inputBirthDateObj 
                    && inputProfessionObj
                    && inputDescriptionObj){
                    var newUser = {
                        Name: inputNameObj.value,
                        Surname: inputSurnameObj.value,
                        Patronymic: inputPatronymicObj.value,
                        BirthDate: inputBirthDateObj.value,
                        Profession: inputProfessionObj.value,
                        Description: inputDescriptionObj.value,
                    };
                    var fail = false;
                    if(!newUser.Name){
                        inputNameObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputNameObj.style["background-color"] = "#FFFFFF";
                    }
                    if(!newUser.Surname){
                        inputSurnameObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputSurnameObj.style["background-color"] = "#FFFFFF";
                    }
                    if(!newUser.Patronymic){
                        inputPatronymicObj.style["background-color"] = "#FFCCCC";
                        fail = true;
                    }else{
                        inputPatronymicObj.style["background-color"] = "#FFFFFF";
                    }
                    console.log(newUser);
                    if(!fail)
                    {
                        priv.sendNewUserData(newUser);
                    }
                }else{
                    console.log("internalError");
                }
            },*/
            sendLogas: function (Player){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post logas " + Player.Id);

                WebSocket.handle("logas ok", function(Data){
                        // btsp.createAlert("success", "Вы зашли за " 
                        //     + Player.Surname + " "
                        //     + Player.Name + " "
                        //     + Player.Patronymic + ", "
                        //     + Player.Nick + ". ", 
                        // "Поздравляю!");
                        window.auth.data = "";
                        window.location.hash = "";
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось зайти за персонажа. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть, пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("no player", function(Data){
                    btsp.createAlert("danger", "Не удалось найти персонажа, за которого Вы хотите зайти. ", 
                        "Если Вы не пытались ничего хакнуть, пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("logas admin", function(Data){
                    btsp.createAlert("danger", "Заходить за других админов запрещено. ", 
                        Data);
                    }
                );
            },
            sendNewUserData: function (User){
                var WebSocket = ws.getWebSocket();

                WebSocket.handle("user added", function(Data){
                        btsp.createAlert("success", "Персонаж добавлен. ", 
                        "Поздравляю!");
                        WebSocket.send("get people");
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось добавить нового персонажа. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть, пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("user manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось добавить нового персонажа. ", 
                        Data);
                    }
                );
                WebSocket.send("post user add " + JSON.stringify(User));
            },
            sendNewPlayerData: function (Player){
                var WebSocket = ws.getWebSocket();

                WebSocket.handle("player added", function(Data){
                        btsp.createAlert("success", "Игрок добавлен. ", 
                        "Поздравляю!");
                        WebSocket.send("get people");
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось добавить нового игрока. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть, пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("player manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось добавить нового игрока. ", 
                        Data);
                    }
                );
                WebSocket.send("post player add " + JSON.stringify(Player));
            },
            sendUpdateUserData: function (User){
                var WebSocket = ws.getWebSocket();

                WebSocket.handle("user updated", function(Data){
                        btsp.createAlert("success", "Персонаж изменён. ", 
                        "Поздравляю!");
                        WebSocket.send("get user " + User.Id);
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось изменить персонажа. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть(не по игре), пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("user manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось изменить персонажа. ", 
                        Data);
                    }
                );
                WebSocket.send("post user update " + JSON.stringify(User));
            },
            sendUpdatePlayerData: function (Player){
                var WebSocket = ws.getWebSocket();

                WebSocket.handle("player updated", function(Data){
                        btsp.createAlert("success", "Игрок изменён. ", 
                        "Поздравляю!");
                        WebSocket.send("get player " + Player.Id);
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось изменить игрока. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть(не по игре), пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("player manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось изменить игрока. ", 
                        Data);
                    }
                );
                WebSocket.send("post player update " + JSON.stringify(Player));
            },
            sendDeleteUser: function (UserId){
                var WebSocket = ws.getWebSocket();

                WebSocket.handle("user deleted", function(Data){
                        btsp.createAlert("success", "Персонаж удалён. ", 
                        "Поздравляю!");
                        WebSocket.send("get user " + UserId);
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось удалить персонажа. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть(не по игре), пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("user manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось удалить персонажа. ", 
                        Data);
                    }
                );
                WebSocket.send("post user delete " + UserId);
            },
            sendDeletePlayer: function (PlayerId){
                var WebSocket = ws.getWebSocket();

                WebSocket.handle("user deleted", function(Data){
                        btsp.createAlert("success", "Игрок удалён. ", 
                        "Поздравляю!");
                        WebSocket.send("get user " + UserId);
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось удалить игрока. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть(не по игре), пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("player manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось удалить удалить. ", 
                        Data);
                    }
                );
                WebSocket.send("post player delete " + PlayerId);
            },
        };
        return priv;
    }
    
)