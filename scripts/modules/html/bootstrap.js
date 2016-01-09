define(["modules/html/dom"],
    function(dom){
        return{
            initHideButton: function(){
                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Head = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-header"});
                var HideButton = dom.findClassInObjectAndReturnOrCreateWithArgs ( Head, 
                    {
                        tag:"button", 
                        type:"button", 
                        class:"navbar-toggle collapsed", 
                        "data-toggle":"collapse", 
                        "data-target":"#navbar", 
                        "aria-expanded":"false", 
                        "aria-controls":"navbar"
                    }
                );
            },
            setNameToHead: function (text, onClick){

                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Head = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-header"});
                var Brand = dom.findClassInObjectAndReturnOrCreateWithArgs ( Head, 
                    {tag:"a", class:"navbar-brand", href:"#"}
                );
                dom.set(Brand, {text:text, onclick:onClick});
            },
            addActionToHead: function (text, onClick){

                
                var Nav = dom.findClassInObjectAndReturnOrCreateWithArgs ( document.body, {tag:"nav", class:"navbar navbar-default"});
                var Container = dom.findClassInObjectAndReturnOrCreateWithArgs ( Nav, {tag:"div", class:"container"});
                var Collapse = dom.findClassInObjectAndReturnOrCreateWithArgs ( Container, {tag:"div", class:"navbar-collapse collapse"});
                var Right = dom.findClassInObjectAndReturnOrCreateWithArgs ( Collapse, {tag:"ul", class:"nav navbar-nav pull-right"});
            
                Right.appendChild
                ( 
                    dom.insert(
                        dom.create
                        (
                            {tag:"li",class:"active",role:"presentation"}
                        ),
                        dom.create(
                            {tag:"a",href:"#",text:text,onclick:onClick}
                        )
                    )
                );
            },
            addToBody: function (object){
                // var Main = this.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                // var Container = this.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", document.body, "div");
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", Container, "div");
                Main.appendChild( object );
                // this.getBody().appendChild( object );
                // document.body.appendChild( object );
            },
            deleteBody: function (){
                var Container = dom.getXFromYAndCreateXWithTypeZ("container", document.body, "div");
                var Main = dom.getXFromYAndCreateXWithTypeZ("main", Container, "div");
                Container.removeChild( Main );
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