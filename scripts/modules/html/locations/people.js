define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container, Path){
                if(Path.length == 0)
                {
                // btsp.createAlert("info", "Раздел в разработке. ", "Здесь будет отображатся список всего персонала");
                    var WebSocket = ws.getWebSocket();
                    console.log(Path);
                    WebSocket.handle("people data", function(Data){
                        btsp.clean(Container);
                        if(window.auth && window.auth.data == "admin"){
                            priv.renderUserAddMinimal(Container);
                        }
                        var People = jQuery.parseJSON(Data);
                        console.log(People);
                    
                        // var Jumbotron = dom.create(
                            // {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                        // Container.appendChild(Jumbotron);

                        People.forEach(function(Entry) {
                            priv.renderUserMinmal(Container, Entry);
                        });
                    });
                    WebSocket.send("get people");
                }
                else
                {
                    var UserId = parseInt(Path[0]);
                    var WebSocket = ws.getWebSocket();
                    WebSocket.handle("user data", function(Data){
                        btsp.clean(Container);
                        var Group = jQuery.parseJSON(Data);
                        priv.renderUser(Container, Group);
                    });
                    WebSocket.send("get user " + UserId);
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
            renderUser: function (Container, User){
                console.log(User);

                var Jumbotron = dom.create(
                    {id:"userData", tag:"div",class:"jumbotron col-lg-12",role:"presentation"});

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
                        {tag:"b", text:"Имя: "}));
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
                            href:"#people#" + User.Id
                        }
                    )
                );
                dom.insert(Container,WellUser);
            },
            renderUserAddMinimal: function (Container){

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
            sendNewUserData: function (User){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post user add " + JSON.stringify(User));

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
            },
            sendUpdateUserData: function (User){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post user update " + JSON.stringify(User));

                WebSocket.handle("user updated", function(Data){
                        btsp.createAlert("success", "Персонаж изменён. ", 
                        "Поздравляю!");
                        WebSocket.send("get user " + User.Id);
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось изменить персонажа. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть, пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("user manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось изменить персонажа. ", 
                        Data);
                    }
                );
            },
            sendDeleteUser: function (UserId){
                var WebSocket = ws.getWebSocket();
                WebSocket.send("post user delete " + UserId);

                WebSocket.handle("user deleted", function(Data){
                        btsp.createAlert("success", "Персонаж удалён. ", 
                        "Поздравляю!");
                        WebSocket.send("get user " + UserId);
                    }
                );
                WebSocket.handle("not allowed", function(Data){
                    btsp.createAlert("danger", "Не удалось удалить персонажа. ", 
                        "Недостаточно прав. Если Вы не пытались ничего хакнуть, пожалуйста, свяжитесь с МГ");
                    }
                );
                WebSocket.handle("user manage fail", function(Data){
                    btsp.createAlert("danger", "Не удалось удалить персонажа. ", 
                        Data);
                    }
                );
            },
        };
        return priv;
    }
    
)