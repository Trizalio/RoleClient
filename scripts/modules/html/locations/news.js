define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var news = {
            show: function (Container, Path){
                console.log(Path);
                window.CurrentLocation = "news";
                // if(Path.length == 0)
                // {
                // btsp.createAlert("info", "Раздел в разработке. ", "Здесь будет отображатся список всего персонала");
                    var WebSocket = ws.getWebSocket();
                    console.log(Path);
                    WebSocket.send("get news");
                    WebSocket.handle("news data", function(Data){

                        var News = jQuery.parseJSON(Data);
                        console.log(News);
                    
                        // var Jumbotron = dom.create(
                            // {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                        // Container.appendChild(Jumbotron);

                        News.forEach(function(Entry) {
                            news.renderNewsMinmal(Container, Entry);
                        });
                    });
                // }
            },
            /*renderUser: function (Container, User){
                console.log(User);
                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                dom.insert(Container,Jumbotron);

                dom.insert(Jumbotron,
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
                        {tag:"p", text:"Характеристика: " + User.Description}));
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
            },*/
            renderNewsMinmal: function (Container, News){

                console.log(News);
                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                dom.insert(Container, Jumbotron);
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h2", text:News.Subject}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h3", text:News.Text}));

                var Users = dom.create(
                        {tag:"p", text:""});
                dom.insert(Jumbotron, Users);
                if(News.Author.Id > 0){
                    dom.insert(Users,
                        dom.create(
                            {tag:"no", 
                            text:"Автор: "}));
                    dom.insert(Users,
                        dom.create(
                            {tag:"a", 
                            text:News.Author.Name + " " + News.Author.Surname + " " + News.Author.Patronymic + " ", 
                            href:"#people#user#" + News.Author.Id}));
                }
                dom.insert(Users,
                    dom.create(
                        {tag:"no", 
                        text:"из группы: "}));
                dom.insert(Users,
                    dom.create(
                        {tag:"a", 
                        text:News.Group.Name,
                        href:"#projects#" + News.Group.Id}));
                dom.insert(Users,
                    dom.create(
                        {tag:"no", 
                        text:" в: " + News.Datetime}));

                /*console.log(User);
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
                dom.insert(Container,WellUser);*/
            },
        };
        return news;
    }
    
)