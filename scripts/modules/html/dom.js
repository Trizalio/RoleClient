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
            getXFromYAndCreateXWithTypeZ: function (X, Y, Z){
                var object = Y.getElementsByClassName( X )[0];
                if(!object){
                    object = document.createElement(Z);
                    object.className = X;
                    Y.appendChild( object );
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
            }
        }
    }
)