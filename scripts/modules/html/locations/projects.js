define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var priv = {
            show: function (Container, Path){
                window.CurrentLocation = "projects";
                if(Path.length == 0)
                {
                    // btsp.createAlert("info", "Раздел в разработке. ", "Здесь будут отображатся все проекты");

                    var WebSocket = ws.getWebSocket();
                    WebSocket.send("get projects");
                    WebSocket.handle("projects data", function(Data){
                        var Groups = jQuery.parseJSON(Data);
                        console.log(Groups);

                        Groups.forEach(function(Entry) {
                            // var Group = jQuery.parseJSON(Entry);
                            priv.renderGroupsMinimal(Container, Entry);
                        });
                    });
                }
                else
                {
                    var ProjectId = parseInt(Path[0]);
                    var WebSocket = ws.getWebSocket();
                    WebSocket.send("get project " + ProjectId);
                    WebSocket.handle("project data", function(Data){
                        btsp.clean(Container);
                        var Group = jQuery.parseJSON(Data);
                        priv.renderGroup(Container, Group);
                    });
                }
            },
            renderGroupsMinimal: function (Container, Group){

                console.log(Group);
                var WellGroup = dom.insert(
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
                            text: Group.Name,
                            href:"#projects#" + Group.Id
                        }
                    )
                );
                dom.insert(Container,WellGroup);
            },
            renderGroup: function (Container, Group){
                console.log(Group);
                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                dom.insert(Container, Jumbotron);
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h2", text:Group.Name}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h3", text:Group.Description}));
                var Users = dom.create(
                        {tag:"p", text:"Участники: "});
                dom.insert(Jumbotron, Users);
                for (var i = 0; i < Group.Users.length; ++i) {
                    if( i > 0){
                        dom.insert(Users,
                            dom.create(
                                {tag:"no", 
                                text:", "}));
                    }
                    dom.insert(Users,
                        dom.create(
                            {tag:"a", 
                            text:Group.Users[i].Name + " " + Group.Users[i].Surname + " " + Group.Users[i].Patronymic, 
                            href:"#people#user#" + Group.Users[i].Id}));
                }
            },
        };
        return priv;
    }
    
)