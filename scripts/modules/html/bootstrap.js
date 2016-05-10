define(["modules/html/dom", "modules/html/bootstrap_init"],
    function(dom, btsp_init){
        btsp_init.init();
        return{
            initHideButton: function(){
                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Head = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-header"});
                var HideButton = dom.findClassInObjectAndReturnOrCreateWithArgs ( Head, 
                    {
                        tag:"button", 
                        type:"button", 
                        // text:"Навигация", 
                        class:"navbar-toggle collapsed", 
                        "data-toggle":"collapse", 
                        "data-target":"#navbar", 
                        "aria-expanded":"false", 
                        "aria-controls":"navbar"
                    }
                );
                var Hint = dom.findClassInObjectAndReturnOrCreateWithArgs ( HideButton, 
                    {
                        tag:"span", 
                        class:"sr-only", 
                        text:"Навигация"
                    }
                );
                dom.insert(HideButton, dom.create({
                        tag:"span", 
                        class:"icon-bar"
                    }));
                dom.insert(HideButton, dom.create({
                        tag:"span", 
                        class:"icon-bar"
                    }));
                dom.insert(HideButton, dom.create({
                        tag:"span", 
                        class:"icon-bar"
                    }));
                // <span class="sr-only">Toggle navigation</span>
                // <span class="icon-bar"></span>
                // <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
            },
            addExpButton: function(text, onClick, hash){
                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Head = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-header"});
                var HideButton = dom.create (
                    {
                        tag:"button", 
                        type:"button", 
                        // text:"+", 
                        class:"navbar-toggle collapsed", 
                        // "data-toggle":"collapse", 
                        // "data-target":"#navbar"+hash, 
                        // "aria-expanded":"false", 
                        // "aria-controls":"navbar"
                    }
                );
                dom.insert(Head, HideButton);
                
                var Hint = dom.findClassInObjectAndReturnOrCreateWithArgs ( HideButton, 
                    {
                        tag:"span", 
                        class:"sr-only", 
                        text:text
                    }
                );

                // var Collapse = dom.create ({tag:"div", class:"navbar-collapse collapse nothing", id:"navbar" + hash});
                // dom.insert(Container, Collapse);
                // var Right = dom.create ({tag:"ul", class:"nav navbar-nav navbar-right"});
                // dom.insert(Collapse, Right);
            
                // // return;


                // var tmp =  dom.create({tag:"li",role:"presentation"});

                // Right.appendChild
                // ( 
                //     dom.insert(
                //         tmp,
                //         dom.create(
                //             {tag:"a", href:hash,text:text,onclick:onClick}
                //         )
                //     )
                // );
                // return tmp;
                // dom.insert(HideButton, dom.create({
                //         tag:"span", 
                //         class:"icon-bar"
                //     }));
                // dom.insert(HideButton, dom.create({
                //         tag:"span", 
                //         class:"icon-bar"
                //     }));
                dom.insert(HideButton, dom.create({
                        tag:"span", 
                        class:"glyphicon glyphicon-heart"
                    }));
                // <span class="sr-only">Toggle navigation</span>
                // <span class="icon-bar"></span>
                // <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
            },
            setModal:function(show, title, text, buttons){
                var Fade = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"div", class:"modal-backdrop fade in"});
                var Modal = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"div", class:"modal fade", role:"dialog"});
                if(show){
                    Fade.style.display = "block";
                    Modal.className = "modal fade in";
                    Modal.style.display = "block";
                }else{
                    Fade.style.display = "none";
                    Modal.className = "modal fade";
                    Modal.style.display = "none";
                    return;
                }
                var Dialog = dom.findClassInObjectAndReturnOrCreateWithArgs ( Modal, {tag:"div", class:"modal-dialog modal-sm"});
                var Content = dom.findClassInObjectAndReturnOrCreateWithArgs ( Dialog, {tag:"div", class:"modal-content"});


                var Header = dom.findClassInObjectAndReturnOrCreateWithArgs ( Content, {tag:"div", class:"modal-header"});
                var Title = dom.findClassInObjectAndReturnOrCreateWithArgs ( Header, {tag:"h4", class:"modal-title"});
                dom.set(Title, {text:title});

                var Body = dom.findClassInObjectAndReturnOrCreateWithArgs ( Content, {tag:"div", class:"modal-body"});
                var Text = dom.findClassInObjectAndReturnOrCreateWithArgs ( Body, {tag:"p", class:"modal-text"});
                dom.set(Text, {text:text});

                var Footer = dom.findClassInObjectAndReturnOrCreateWithArgs ( Content, {tag:"div", class:"modal-footer"});


            // <div class="modal-backdrop fade in"></div>
            // <div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-right: 15px;">
    
  // </div>
                /*<div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Modal Header</h4>
                            </div>
                            <div class="modal-body">
                                <p>This is a small modal.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>*/
            },
            setNameToHead: function (text, onClick, hash){

                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Head = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-header"});
                var Brand = dom.findClassInObjectAndReturnOrCreateWithArgs ( Head, 
                    {tag:"a", class:"navbar-brand", href:hash}
                );
                dom.set(Brand, {text:text, onclick:onClick});
                // console.log(Brand.onclick);
            },
            addActionToHead: function (text, onClick, hash){

                
                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Collapse = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-collapse collapse", id:"navbar"});
                var Right = dom.findClassInObjectAndReturnOrCreateWithArgs ( Collapse, {tag:"ul", class:"nav navbar-nav navbar-right"});
            
                var tmp =  dom.create
                        (
                            {tag:"li",/*class:"active",*/role:"presentation"}
                        );
                // console.log(tmp.onclick);
                // console.log(onClick);
                Right.appendChild
                ( 
                    dom.insert(
                        tmp,
                        dom.create(
                            {tag:"a", href:hash,text:text,onclick:onClick}
                        )
                    )
                );
                return tmp;
            },
            addToBody: function (object){
                // var Main = this.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                // var Container = this.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var BodyContainer = dom.getXFromYAndCreateXWithTypeZ("body-container", Container, "div");
                BodyContainer.appendChild( object );
                // this.getBody().appendChild( object );
                // document.body.appendChild( object );
            },
            getBodyContainer: function (){
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                return  BodyContainer = dom.getXFromYAndCreateXWithTypeZ("body-container", Container, "div");
            },
            clean: function (object){
                while (object.firstChild) {
                    object.removeChild(object.firstChild);
                }
            },
            deleteBody: function (){
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var BodyContainer = dom.getXFromYAndCreateXWithTypeZ("body-container", Container, "div");
                Container.removeChild( BodyContainer );
            },
            deleteAlerts: function (){
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var AlertContainer = dom.getXFromYAndCreateXWithTypeZ("alert-container", Container, "div");
                Container.removeChild( AlertContainer );
            },
            addAlert: function (object){
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var AlertContainer = dom.getXFromYAndCreateXWithTypeZ("alert-container", Container, "div", true);
                var Alert = AlertContainer.getElementsByClassName(object.className);

                for (var i = 0; i < Alert.length; ++i) {
                    AlertContainer.removeChild(Alert[i]);
                }

                AlertContainer.appendChild( object );
                // this.getBody().appendChild( object );
                // document.body.appendChild( object );
            },
            createAlert: function (type, boldText, otherText){
                var Alert = dom.create(
                    {tag:"div", id:"alert-"+type,class:"alert alert-" + type + " alert-dismissible",role:"alert"});
                dom.insert(Alert,
                    dom.insert(
                        dom.create(
                            {tag:"button", type:"button", class:"close", "data-dismiss":"alert", "aria-label":"Close"}),
                        dom.create(
                            {tag:"span", "aria-hidden":"true", text:"&times;"})
                    )
                );
                dom.insert(Alert,
                    dom.create(
                        {tag:"div", text:"<strong>"+boldText +"</strong>"+ otherText})
                );
                // dom.insert(Alert,
                //     dom.create(
                //         {tag:"div", text:"неправильная пара логин, пароль."})
                // );
                this.addAlert(Alert);
            },
            getManDisplay: function(User){
                // var Jumbotron = dom.create(
                    // {tag:"div",class:"col-lg-12",role:"presentation"});
                var WellUser = dom.create(
                    {tag:"div",class:"well well-sm", 
                        text: 
                        User.Surname + " " + 
                        User.Name + " " + 
                        User.Patronymic + ", " + 
                        User.Profession});
                // dom.insert(WellUser,
                //     dom.create(
                //         {tag:"p", 
                //         text: 
                //         User.Surname + " " + 
                //         User.Name + " " + 
                //         User.Patronymic + ", " + 
                //         User.Profession}));
                return WellUser;
            },
            getPrivateDisplay: function(User, Player, logout){
                var Jumbotron = dom.create(
                    {tag:"div",class:"col-lg-12",role:"presentation"});
                var Nav = dom.create(
                    {tag:"ul",class:"nav nav-tabs"});
                dom.insert(Jumbotron, Nav);
                dom.insert(Nav,
                    dom.insert(
                        dom.create(
                            {tag:"li", role:"presentation", class:"active"}),
                        dom.create(
                            {tag:"a", "data-toggle":"tab", href:"#user", text:"Персонаж"})));
                dom.insert(Nav,
                    dom.insert(
                        dom.create(
                            {tag:"li", role:"presentation"}),
                        dom.create(
                            {tag:"a", "data-toggle":"tab", href:"#hidden", text:"Скрытое"})));
                dom.insert(Nav,
                    dom.insert(
                        dom.create(
                            {tag:"li", role:"presentation"}),
                        dom.create(
                            {tag:"a", "data-toggle":"tab", href:"#player", text:"Игрок"})));
                dom.insert(Nav,
                    dom.create(
                        {
                            tag:"a", 
                            text:"Выход",
                            role:"button",
                            class:"btn btn-lg btn-danger",
                            onclick:logout
                        }
                    )
                );


                var TabContent = dom.create(
                            {tag:"div", class:"tab-content"});
                dom.insert(Jumbotron,TabContent);
                
                var TabPaneUser = dom.create(
                            {tag:"div", class:"tab-pane active", id:"user"});
                dom.insert(TabContent,TabPaneUser);
                var WellUser = dom.create(
                    {tag:"div",class:"well"});
                dom.insert(TabPaneUser,WellUser);
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Имя: " + User.Name}));
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Фамилия: " + User.Surname}));
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Отчество: " + User.Patronymic}));
                var Gender = "жен.";
                if(User.Male)
                {
                    Gender = "муж.";
                }
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Пол: " + Gender}));
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Специальность: " + User.Specialty}));
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Профессия: " + User.Profession}));
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Интересы: " + User.Description}));
                var GroupsListDOMO = dom.create(
                        {tag:"p", text:"Состоит в группах: "});
                dom.insert(WellUser, GroupsListDOMO);
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
                
                var TabPaneHidden = dom.create(
                            {tag:"div", class:"tab-pane", id:"hidden"});
                dom.insert(TabContent,TabPaneHidden);
                var WellHidden = dom.create(
                    {tag:"div",class:"well"});
                dom.insert(WellHidden,
                    dom.create(
                        {tag:"p", text:"Здесь будут навыки и подобная, скрытая от посторонних глаз, но игровая, информация:"}));
                dom.insert(TabPaneHidden,WellHidden);
                
                var TabPanePlayer = dom.create(
                            {tag:"div", class:"tab-pane", id:"player"});
                dom.insert(TabContent,TabPanePlayer);
                var WellPlayer = dom.create(
                    {tag:"div",class:"well"});
                dom.insert(WellPlayer,
                    dom.create(
                        {tag:"p", text:"ФИО игрока: " + 
                        Player.Surname + " " +
                        Player.Name + " " +
                        Player.Patronymic}));
                dom.insert(WellPlayer,
                    dom.create(
                        {tag:"p", text:"Ник: " + 
                        Player.Nick}));
                dom.insert(WellPlayer,
                    dom.create(
                        {tag:"p", text:"Дата рождения: " + 
                        Player.BirthDate}));
                dom.insert(WellPlayer,
                    dom.create(
                        {tag:"p", text:"Квента: " + 
                        Player.Quenta}));
                dom.insert(TabPanePlayer,WellPlayer);
                // <div class="tab-pane" id="health">
//                 <div class="well">
//                  <p><b>HP(пункты здоровья)(максимум):</b> </p>
//                  <br>
//                  <p><b>Импланты:</b> </p>
//                  <p><b>Группа крови:</b> </p>
//                  <p><b>Заболевания:</b> </p>
//                  <p><b>Терапия:</b> </p>
//                  <p><b>Дата последнего осмотра:</b> </p>
//                 </div>
//               </div>
                return Jumbotron;
            },
            getAuthForm: function (onLogin, onGuest){
                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                var Form = dom.create(
                    {tag:"form",class:"form-signin"});
                dom.insert(Jumbotron, Form);
                dom.insert(Form,
                    dom.create(
                        {tag:"h2", text:"Авторизуйтесь для входа в систему"}));
                var inputLogin = dom.create({
                    tag:"input",
                    type:"login",
                    class:"form-control",
                    autofocus:"", 
                    id:"inputLogin", 
                    placeholder:"Логин"
                });
                dom.insert(Form,
                    dom.insert(
                        dom.create({tag:"p"}),inputLogin));
                var inputPassword = dom.create({
                    tag:"input",
                    type:"password",
                    class:"form-control", 
                    id:"inputPassword", 
                    placeholder:"Пароль"});
                dom.insert(Form,
                    dom.insert(
                        dom.create({tag:"p"}),inputPassword));
                var onEnterCallback = function() {
                    onLogin(inputLogin.value, inputPassword.value)
                };
                dom.insert(Form,
                    dom.insert(
                        dom.create({tag:"p"}),
                        dom.create(
                            {tag:"a", 
                            id:"enter", 
                            text:"Авторизоваться",
                            role:"button",
                            class:"btn btn-lg btn-success",
                            onclick:onEnterCallback
                        })));
                dom.insert(Form,
                    dom.insert(
                        dom.create({tag:"p"}),
                        dom.create(
                            {tag:"a", 
                            id:"guest", 
                            text:"Войти в систему, как гость",
                            role:"button",
                            class:"btn btn-lg btn-danger",
                            onclick:onGuest
                        })));
                return Jumbotron;
            },
            // genetateBlock: function(title, text, date, ){

            //     dom.create
            //     (
            //         {tag:"div",class:"jumbotron",role:"presentation"}
            //     )
            //     var Jumbotron = document.createElement("div");
            //     Jumbotron.className = "jumbotron col-lg-7";
            //     var Header = document.createElement("h1");
            //     Header.innerHTML = HeaderText;
            //     Jumbotron.appendChild( Header );
            //     var Body = document.createElement("p");
            //     Body.innerHTML = BodyText;
            //     Body.className = "lead";
            //     Jumbotron.appendChild( Body );
            //     if(!!ContentObject) {
            //         Jumbotron.appendChild( ContentObject );
            //     }
            //     return Jumbotron;
            // }
        }
    }
)