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
            
                var tmp =  dom.create(
                            {tag:"a", href:hash,text:text,onclick:onClick}
                        );
                // console.log(tmp.onclick);
                // console.log(onClick);
                Right.appendChild
                ( 
                    dom.insert(
                        dom.create
                        (
                            {tag:"li",/*class:"active",*/role:"presentation"}
                        ),
                        tmp
                    )
                );
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
            getBodyContainer: function (object){
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
            getPrivateDisplay: function(User, Player){

// <div class="col-xs-12 col-sm-9">
//           <ul class="nav nav-tabs" id="myTab">
//             <li class="active"><a href="#common" data-toggle="tab">Общая информация</a></li>
//             <li><a href="#work" data-toggle="tab">Деятельность</a></li>
//             <li><a href="#projects" data-toggle="tab">Проекты</a></li>
//             {% if showhealth or self %}
//               <li><a href="#health" data-toggle="tab">Здоровье</a></li>
//             {% endif %}
//             {% if self %}
//               <li><a href="#closed" data-toggle="tab">Неигровая информация</a></li>
//             {% endif %}
//           </ul>

//           <div class="tab-content">
//             <div class="tab-pane active" id="common">
//               <div class="well">
//                <!--<p><b>Имя: {{ profile.name }}</b></p>
//                <p><b>Фамилия: {{ profile.surname }}</b></p>-->
//                <p><b>ФИО:</b> {{ profile.surname }} {{ profile.name }} {{ profile.middlename }}</p>
//                <p><b>Возраст:</b> {{ profile.age }}</p>
//                <p><b>Пол:</b> {% if profile.male %}Мужской{% endif %}{% if not profile.male %}Женский{% endif %}
//               </div>
//             </div>
//             <div class="tab-pane" id="work">
//               <div class="well">
//                <p><b>Должность:</b> {{ profile.workstatus }}</p>
//                <p><b>Класс допуска:</b> {{ profile.access }}</p>
//                <p><b>Специальность:</b> {{ profile.education }}</p>
//               </div>
//             </div>

//             {% if showhealth or self %}
//               <div class="tab-pane" id="health">
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
//             {% endif %}

//             <div class="tab-pane" id="projects">
//               {% if projectmembers %}
//                {% for n in projectmembers %}
//                 <div class="well">
//                  <a href="/project/{{ n.project_id }}/">{{ n.project.name }} </a>
//                  <p>{{ n.status }}</p>
//                 </div>
//                {% endfor %}
//               {% else %}
//                <div class="well">
//                 <h4><p class="text-error">На проектах не заригистрирован</p></h4>
//                </div>
//               {% endif %}
//             </div>

//             {% if self %}
//               <div class="tab-pane" id="closed">
//                 <div class="well">
//                  <!--<p><b>Имя: {{ profile.name }}</b></p>
//                  <p><b>Фамилия: {{ profile.surname }}</b></p>-->
//                  <p><b>Квента:</b></p>
//                  <p><b>Квесты(задачи на игру):</b></p>
//                  <p><b>Сдан ли взнос:</b></p>
//                 </div>
//               </div>
//             {% endif %}

//           </div>
//          </div>

//                 <ul class="nav nav-tabs">
//   <li role="presentation" class="active"><a href="#">Home</a></li>
//   <li role="presentation"><a href="#">Profile</a></li>
//   <li role="presentation"><a href="#">Messages</a></li>
// </ul>
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


                var TabContent = dom.create(
                            {tag:"div", class:"tab-content"});
                dom.insert(Jumbotron,TabContent);
                
                var TabPaneUser = dom.create(
                            {tag:"div", class:"tab-pane active", id:"user"});
                dom.insert(TabContent,TabPaneUser);
                var WellUser = dom.create(
                    {tag:"div",class:"well"});
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Имя:" + User.Name}));
                dom.insert(WellUser,
                    dom.create(
                        {tag:"p", text:"Фамилия:" + User.Surname}));
                dom.insert(TabPaneUser,WellUser);
                
                var TabPaneHidden = dom.create(
                            {tag:"div", class:"tab-pane", id:"hidden"});
                dom.insert(TabContent,TabPaneHidden);
                var WellHidden = dom.create(
                    {tag:"div",class:"well"});
                dom.insert(WellHidden,
                    dom.create(
                        {tag:"p", text:"Skills:"}));
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