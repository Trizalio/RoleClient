define(
    function(){
        return{
            createCanvas: function (){
                return document.createElement("canvas");
            },
            fillCanvas: function (Canvas, Fillstyle){
                var Context = Canvas.getContext("2d");
                Context.rect(0, 0, Canvas.width, Canvas.height);
                Context.fillStyle = Fillstyle;
                Context.fill();
            },
            drawRect: function(Canvas, BaseX, BaseY, BaseK, X, Y, Width, Height, Red, Green, Blue){
                // console.log("Draw X: " + X + ", Y: " + Y + ", Width: " + Width + ", Height: " + Height + ", Red: " + Red + ", Green: " + Green);
                var Context = Canvas.getContext("2d");
                // Context.rect();
                Context.fillStyle = 'rgb(' + Math.floor(Red) + ',' + Math.floor(Green) + ',' + Math.floor(Blue) + ')';
                var b = 0;

                Context.fillRect((X + BaseX) * BaseK + b, 
                                (Y + BaseY) * BaseK + b, 
                                Width * BaseK - b, 
                                Height * BaseK - b);
            },
            draw4DotPoligon: function(Canvas, BaseX, BaseY, BaseK, X1, Y1, X2, Y2, X3, Y3, X4, Y4, Red, Green, Blue){
                // console.log("Draw X: " + X + ", Y: " + Y + ", Width: " + Width + ", Height: " + Height + ", Red: " + Red + ", Green: " + Green);
                var Context = Canvas.getContext("2d");
                // Context.rect();
                Context.fillStyle = 'rgb(' + Math.floor(Red) + ',' + Math.floor(Green) + ',' + Math.floor(Blue) + ')';
                var b = 0;

                Context.beginPath();
                Context.moveTo((X1 + BaseX) * BaseK + b, (Y1 + BaseY) * BaseK + b);
                Context.lineTo((X2 + BaseX) * BaseK + b, (Y2 + BaseY) * BaseK - b);
                Context.lineTo((X3 + BaseX) * BaseK - b, (Y3 + BaseY) * BaseK - b);
                Context.lineTo((X4 + BaseX) * BaseK - b, (Y4 + BaseY) * BaseK + b);
                Context.closePath();
                Context.fill();
                // Context.fillRect(X+b, Y+b, Width-b, Height-b);
            },
        }
    }
)