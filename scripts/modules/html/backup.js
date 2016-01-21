define(
    function(){
        return{
            // addToHeadLeft: function (object){
            //     // var Nav = this.getXFromYAndCreateXWithTypeZ("navbar navbar-inverse navbar-fixed-top", document.body, "nav");
            //     // var Container = this.getXFromYAndCreateXWithTypeZ("container", Nav, "div");
            //     var Container = this.getXFromYAndCreateXWithTypeZ("container", document.body, "div");
            //     var Nav = this.getXFromYAndCreateXWithTypeZ("navbar navbar-inverse", Container, "nav");
            //     var Left = this.getXFromYAndCreateXWithTypeZ("nav navbar-nav", Nav, "ul");
            //     Left.appendChild( object );
            // },
            setNameToHead: function (text, onClick){
                this.create({tag:"a", text:"Title"});
                // var Nav = this.getXFromYAndCreateXWithTypeZ("navbar navbar-inverse navbar-fixed-top", document.body, "nav");
                // var Container = this.getXFromYAndCreateXWithTypeZ("container", Nav, "div");
                var Container = this.getXFromYAndCreateXWithTypeZ("container", document.body, "div");
                var Nav = this.getXFromYAndCreateXWithTypeZ("navbar navbar-default", Container, "nav");
                var Right = this.getXFromYAndCreateXWithTypeZ("navbar-header", Nav, "div");
                Right.appendChild( this.create({tag:"a",href:"#",class:"navbar-brand",text:text,onclick:onClick}) );
            },
            addActionToHead: function (text, onClick){
                // var Nav = this.getXFromYAndCreateXWithTypeZ("navbar navbar-inverse navbar-fixed-top", document.body, "nav");
                // var Container = this.getXFromYAndCreateXWithTypeZ("container", Nav, "div");
                var Container = this.getXFromYAndCreateXWithTypeZ("container", document.body, "div");
                var Nav = this.getXFromYAndCreateXWithTypeZ("navbar navbar-default", Container, "nav");
                var Right = this.getXFromYAndCreateXWithTypeZ("nav navbar-nav pull-right", Nav, "ul");
                Right.appendChild( this.createLi(text, onClick) );
            },
            addToBody: function (object){
                // var Main = this.getXFromYAndCreateXWithTypeZ("main", document.body, "div");
                // var Container = this.getXFromYAndCreateXWithTypeZ("container", Main, "div");
                var Container = this.getXFromYAndCreateXWithTypeZ("container", document.body, "div");
                var Main = this.getXFromYAndCreateXWithTypeZ("main", Container, "div");
                Main.appendChild( object );
                // this.getBody().appendChild( object );
                // document.body.appendChild( object );
            },
            // addToContainer: function (object){
            //     this.getContainer().appendChild( object );
            // },
            createJumbotron: function (HeaderText, BodyText, ContentObject){
                var Jumbotron = document.createElement("div");
                Jumbotron.className = "jumbotron col-lg-7";
                var Header = document.createElement("h1");
                Header.innerHTML = HeaderText;
                Jumbotron.appendChild( Header );
                var Body = document.createElement("p");
                Body.innerHTML = BodyText;
                Body.className = "lead";
                Jumbotron.appendChild( Body );
                if(!!ContentObject) {
                    Jumbotron.appendChild( ContentObject );
                }
                return Jumbotron;
            },
            createButton: function (ButtonText, ButtonAction){
                var Button = document.createElement("button");
                Button.className = "btn btn-lg btn-default";
                Button.innerHTML = ButtonText;
                if(!!ButtonAction) {
                    Button.onclick = ButtonAction;
                }
                return Button;
            },
            createLi: function (LiText, LiAction){
                var Li = document.createElement("li");
                Li.setAttribute("role", "presentation");
                Li.className = "active";
                var A = document.createElement("a");
                A.innerHTML = LiText;
                A.setAttribute("href", "#");
                Li.appendChild( A );
                // A.className = "lead";
                // Li.innerHTML = LiText;
                if(!!LiAction) {
                    A.onclick = LiAction;
                }
                return Li;
            },
            createA: function (text, action){
                // var Li = document.createElement("li");
                // Li.setAttribute("role", "presentation");
                // Li.className = "active";
                var A = document.createElement("a");
                A.innerHTML = text;
                A.setAttribute("href", "#");
                A.setAttribute("class", "navbar-brand");
                // Li.appendChild( A );
                // A.className = "lead";
                // Li.innerHTML = LiText;
                if(!!action) {
                    A.onclick = action;
                }
                return A;
            },
            create: function(args){
                console.log(args);
                var obj = document.createElement(args.tag);
                for (var property in args) {
                    if (args.hasOwnProperty(property)) {
                        if(property == "text"){
                            obj.innerHTML = args[property];
                        } else if(property == "onclick"){
                            obj.onclick = args[property];
                        } else if(property == "class"){
                            obj.className = args[property];
                        } else if(property == "id"){
                            obj.id = args[property];
                        } else if(property == "tag"){
                            continue;
                        } else {
                            obj.setAttribute(property, args[property]);
                        }
                    }
                }
                return obj;
                // if(!!args.text){
                //     obj.innerHTML = rgs.text;
                // }

            },
            //.navbar-brand
            /*getContainer: function (){
                var Container = document.body.getElementsByClassName( "container" )[0];
                if(!Container){
                    Container = document.createElement("div");
                    Container.className = "container";
                    document.body.appendChild( Container );
                }
                return Container;
            },
            getHead: function (){
                var Navbar = document.body.getElementsByClassName( "navbar" )[0];
                if(!Navbar){
                    Navbar = document.createElement("nav");
                    Navbar.className = "navbar navbar-inverse navbar-fixed-top";
                    this.getContainer().appendChild( Navbar );
                }
                return Navbar;
            },
            getBody: function (){
                var Body = this.getContainer().getElementsByClassName( "body" )[0];
                if(!Body){
                    Body = document.createElement("div");
                    Body.className = "body";
                    this.getContainer().appendChild( Body );
                }
                return Body;
            },*/
            getXFromYAndCreateXWithTypeZ: function (X, Y, Z){
                var object = Y.getElementsByClassName( X )[0];
                if(!object){
                    object = document.createElement(Z);
                    object.className = X;
                    Y.appendChild( object );
                }
                return object;
            }
        }
    }
)