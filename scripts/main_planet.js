define(["modules/dom", "modules/canvas", "modules/map", "modules/websocket", "libs/jquery-2.1.4"],
    function(dom, canv, map, ws, $){
        var Canvas = canv.createCanvas();
        Canvas.width = window.innerWidth ;
        Canvas.height = window.innerHeight ;
        Canvas.style.position='absolute';
        Canvas.style.left = 0;
        Canvas.style.top = 0;
        // Canvas.
        dom.addToBody(Canvas);
        var Map = null;//map.generateMap();
        console.log(Canvas);
        console.log(Map);
        map.renderMap(Canvas, Map);
        var WebSocket = ws.initWebSocket("ws://localhost:1991");
        WebSocket.send("get map");
        WebSocket.handle("accept map", function(Data){
            console.log("Data: " + Data);
            Map = map.parseMapFromJson(Data);
            map.renderMap(Canvas, Map);
        });




        Canvas.addEventListener("touchstart", ontouchstart, false);
        Canvas.addEventListener("touchmove", ontouchmove, true);
        Canvas.addEventListener("touchend", ontouchend, false);

        // Canvas.ontouchstart = function(e){
        //     map.renderPlanet(Canvas, Map, (e.x / Canvas.width) * Math.PI * 2);
        //     e.preverntdefault();
        //     // console.log("touch");
        //     // var canvas_x = event.targetTouches[0].pageX;
        //     // var canvas_y = event.targetTouches[0].pageY;
        //     // console.log(canvas_x +", "+canvas_y);
        // }
        // Canvas.onmousedown = function(e){
        //     map.renderPlanet(Canvas, Map, (e.x / Canvas.width) * Math.PI * 2);
        // }

        var Angle = Math.PI;
        var StartPosition = 0;
        var MouseDown = false;
        var DeltaAngle = 0;
        // canvas.addEventListener("touchstart", test, false);
        // console.log("init");
        function ontouchstart (e){
            e.preventDefault();
            // console.log("ontouchstart");
            // console.log(e.touches);
            if(!e.touches.length){
                return;
            }
            console.log("wrote");

            StartPosition = (e.touches[0].pageX / Canvas.width) * Math.PI * 2;
            MouseDown = true;
        }
        function ontouchend (e){
            e.preventDefault();
            // console.log("ontouchend");
            // console.log(e.touches);
            //if(!e.touches.length){
            //    return;
            //}
            //var CurPosition = (e.touches[0].pageX / Canvas.width) * Math.PI * 2;
            // DeltaAngle = CurPosition - StartPosition;
            Angle -= DeltaAngle;
            MouseDown = false;
        }
        function ontouchmove (e){
            e.preventDefault();
            // console.log("ontouchmove");
            // console.log(e.touches);
            if(!e.touches.length){
                return;
            }
            if(MouseDown){
                var CurPosition = (e.touches[0].pageX / Canvas.width) * Math.PI * 2;
                DeltaAngle = CurPosition - StartPosition;
                map.renderPlanet(Canvas, Map, Angle - DeltaAngle);
            }
        }



        Canvas.onmousedown = function(e1){
            StartPosition = (e1.x / Canvas.width) * Math.PI * 2;
            this.onmousemove = function(e2){
                var CurPosition = (e2.x / Canvas.width) * Math.PI * 2;
                var DeltaAngle = CurPosition - StartPosition;
                map.renderPlanet(Canvas, Map, Angle - DeltaAngle);
            }
        }
        Canvas.onmouseup = function(e1){
            var CurPosition = (e1.x / Canvas.width) * Math.PI * 2;
            var DeltaAngle = CurPosition - StartPosition;
            Angle -= DeltaAngle;
            this.onmousemove = function(e2){
            }
        }


        // Canvas.onmousedown = function(e){
        //     this.onmousemove = function(e){
        //         map.renderPlanet(Canvas, Map, (e.x / Canvas.width) * Math.PI * 2);
        //     }
        // }
        // Canvas.onmouseup = function(e){
        //     this.onmousemove = function(e){
        //     }
        // }
        // map.renderPlanet(Canvas, Map, Math.PI * 3/4);
    }
);