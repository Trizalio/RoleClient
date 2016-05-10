define(
    function(){
        return{
            set: function(obj, args){
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

            },
            create: function(args){
                var obj = document.createElement(args.tag);
                this.set(obj, args);
                return obj;

            },
            getXFromYAndCreateXWithTypeZ: function (X, Y, Z, prepend){
                var object = Y.getElementsByClassName( X )[0];
                if(!object){
                    object = document.createElement(Z);
                    object.className = X;
                    if(prepend)
                    {
                        if(Y.children.length)
                        {
                            Y.insertBefore( object, Y.children[0]);
                        }
                        else
                        {
                            Y.appendChild( object );
                        }
                    }
                    else
                    {
                        Y.appendChild( object );
                    }
                }
                return object;
            },
            findClassInObjectAndReturnOrCreateWithArgs: function (object, args){
                var target = object.getElementsByClassName( args.class )[0];
                if(!target){
                    target = this.create(args);
                    object.appendChild(target);
                }
                return target;
            },
            insert: function (outer, inner){
                outer.appendChild(inner);
                return outer;
            },
            findId: function (findId){
                return window.document.getElementById(findId);
            }
        }
    }
)