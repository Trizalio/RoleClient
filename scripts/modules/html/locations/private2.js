define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container){
                window.CurrentLocation = "private";
                var WebSocket = ws.getWebSocket();
                var Player;
                WebSocket.send("get player");
                WebSocket.handle("self data", function(Data){
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
            test: function (){
                console.log("nice");
            },
            createLinksArrayFromGroupsArray: function (Groups){
                var Result = [];
                var First = true;
                Groups.forEach(function(Entry) {
                    if(First){
                        First = false;
                    }else{
                        Result.push(dom.create({tag:"no", text:", "}));
                    }
                    Result.push(dom.create({tag:"a", href:"#projects#" + Entry.Id, text:Entry.Name}));
                });
                return Result;
            },
            renderUser: function (Container, User, Player){
                console.log(User);
                console.log(Player);
                var BirthDate = Date.parse(User.BirthDate);
                // console.log(BirthDate);
                var CurDate = new Date();
                CurDate.setFullYear(2116);
                // console.log(CurDate);
                var DeltaTime = CurDate - BirthDate;
                // console.log(DeltaTime);
                var DeltaDate = new Date(DeltaTime);
                // console.log(DeltaDate);
                var Years = DeltaDate.getFullYear() - 1970;
                console.log(User.BirthDate, Years);
                // Container.appendChild(btsp.getPrivateDisplay(User, Player, priv.logout));
                var TestTable = btsp.tableViewNew();
                btsp.tableViewAppendRow(TestTable, "ФИО", User.Surname + " " + User.Name + " " + User.Patronymic, "Name");
                btsp.tableViewAppendRow(TestTable, "Возраст (лет)", Years, "Age");
                var Gender = "жен.";
                if(User.Male){
                    Gender = "муж.";
                }
                btsp.tableViewAppendRow(TestTable, "Пол", Gender, "Gender");
                btsp.tableViewAppendRow(TestTable, "Специальность", User.Specialty, "Specialty");
                btsp.tableViewAppendRow(TestTable, "Подразделение", User.Profession, "Profession");
                btsp.tableViewAppendRowObjects(TestTable, "Проекты", 
                    priv.createLinksArrayFromGroupsArray(User.Groups), "Groups");
                btsp.tableViewAppendRow(TestTable, "Интересы", User.Description, "Description", 
                    "Изменить", function(){priv.changePress("Description")});

                var Well = dom.insert(
                    dom.create({tag:"div", class:"well"}),
                    TestTable
                );
                var NavTabs = btsp.navTabsNew(Container);
                btsp.navTabsAdd(NavTabs, Well, "User", "Персонаж", true);


                var TestTable2 = btsp.tableViewNew();
                btsp.tableViewAppendRow(TestTable2, "Навыки", "Отсутствуют", "skills");
                var Well2 = dom.insert(
                    dom.create({tag:"div", class:"well"}),
                    TestTable2
                );
                btsp.navTabsAdd(NavTabs, Well2, "Hidden", "Скрытое", false);

                // Container.appendChild(Well);
                // console.log(User);
            },

            changePress: function(Name){
                btsp.editTableView(Name);
                var Button = btsp.getTableViewButton(Name);
                Button.onclick = function(){priv.savePress(Name)};
                Button.innerHTML = "Сохарнить";
            },
            savePress: function(Name){
                btsp.saveTableView(Name);
                var Button = btsp.getTableViewButton(Name);
                Button.onclick = function(){priv.changePress(Name)};
                Button.innerHTML = "Изменить";
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