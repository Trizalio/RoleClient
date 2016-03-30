define(["modules/canvas"],
    function(Canv){
        var Module = {

            // MAP_WIDTH : 62.83185307179586,//64
            // MAP_HEIGHT : 20,
            // MAP_BLOCKS : 8,
            // MIN_TEMP : -30,
            // MAX_TEMP : 60,
            // SIZE_FACTOR : 100,
            // PLANET_DISPLAY_X : 31.4,
            // PLANET_DISPLAY_Y : 30,
            getPlanetRadius: function(){
                return this.MAP_WIDTH / 4;
            },
            getPlanetPosition: function(Map){
                var Position = {};
                Position.X = this.MAP_WIDTH /2;
                Position.Y = this.MAP_HEIGHT + this.getPlanetRadius();
                return Position
            },

            getStep: function(Map, Y){
                var RelativeHeight = Math.abs(((Y + 0.5) / this.MAP_HEIGHT) - 0.5) * 2;
                // var Step = Math.floor(1/(1.0 - RelativeHeight) * this.SIZE_FACTOR) / this.SIZE_FACTOR;
                var Step = 1/(1.0 - RelativeHeight);
                return Step;
                // var RealX = Math.floor(Math.floor(X / Step) * Step);
            },

            // getWidth: function(Y){
            //     var Step = this.getStep(Map, Y);
            //     var Amount = Math.ceil(this.MAP_WIDTH / Step);
            //     var Width = this.MAP_WIDTH / Amount;
            //     console.log("Step: " + Step + ", Amount: " + Amount + ", Width: " + Width);
            //     // console.log();
            //     return Width;
            //     // var RealX = Math.floor(Math.floor(X / Step) * Step);
            // },
            getPointByCoordinates: function (Map, X, Y){
                // console.log("Get X: " + X + ", Y: " + Y);
                // var RelativeHeight = Math.abs(((Y + 0.5) / this.MAP_HEIGHT) - 0.5) * 2;
                // var k = 10;
                // var Step = Math.floor(1/(1.0 - RelativeHeight) * k) / k;
                var Step = this.getStep(Map, Y);
                // var RealX = Math.floor(X / Step) * Step;
                var RealX = Math.floor(Math.floor(X / Step) * Step);

                // console.log("Return RelativeHeight: " + RelativeHeight + ", Step: " + Step);
                // console.log("Return X: " + RealX + ", Y: " + Y);
                return Map.Raw[RealX][Y];
            },
            getXFromAlpha: function(Alpha){
                var X = Alpha / (Math.PI * 2) * this.MAP_WIDTH;
                // console.log("Alpha: " + Alpha + " -> X: " + X);
                return X;
            },
            getYFromBeta: function(Beta){
                var Y = (Beta / (Math.PI * 2) + 0.5) * this.MAP_HEIGHT;
                // console.log("Beta: " + Beta + " -> Y: " + Y);
                return Y;
            },
            getAlphaFromX: function(X){
                var Alpha = ((X / this.MAP_WIDTH)) * Math.PI * 2;
                // console.log("X: " + X + " -> Alpha: " + Alpha);
                return Alpha;
            },
            getBetaFromY: function(Y){
                var Beta = ((Y / this.MAP_HEIGHT) - 0.5) * Math.PI / 2;
                // console.log("Y: " + Y + " -> Beta: " + Beta);
                return Beta;
            },
            getPointByAngles: function (Map, Alpha, Beta){
                console.log(Map);
                var X = this.getXFromAlpha(Alpha);
                var Y = this.getYFromBeta(Beta);
                return this.getPointByCoordinates(Map, X, Y);
            },

            initShifting:function (Map){
                for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                    var Width = this.getStep(Map, Y);
                    // console.log(Width);
                    var NextCellX = 0;
                    for (X = 0; X < this.MAP_WIDTH; X++) {
                        var CurCell = Map.Raw[X][Y];
                        if(X >= NextCellX){
                            CurCell.Real = true;
                            NextCellX += Width;
                        } else {
                            CurCell.Real = false;
                        }
                    }
                }
                Map.Width = new Array();
                Map.Amount = new Array();
                for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                    Map.Amount[Y] = 0;
                    for (X = 0; X < this.MAP_WIDTH; X++) {
                        var CurCell = Map.Raw[X][Y];
                        if(CurCell.Real){
                            Map.Amount[Y] += 1;
                        }
                    }
                    Map.Width[Y] = this.MAP_WIDTH / Map.Amount[Y];
                }
            },

            forEachCell2:function (Map, action){
                for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                    var RealX = 0;
                    var Width = Map.Width[Y];
                    for (X = 0; X < this.MAP_WIDTH; X++) {
                        var CurCell = Map.Raw[X][Y];
                        if(CurCell.Real){
                            action.call(this, CurCell, RealX, Y);
                            RealX += Width;
                        }
                    }
                }
            },

            forEachCell:function (Map, action){
                for (X = 0; X < this.MAP_WIDTH; X++) {
                    for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                        var CurCell = this.getPointByCoordinates(Map, X, Y);
                        CurCell.Cycled = false;
                    }
                }
                for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                    var RealX = 0;
                    var Width = this.getWidth(Y);
                    for (X = 0; X < this.MAP_WIDTH; X++) {
                        var CurCell = this.getPointByCoordinates(Map, X, Y);
                        if(!CurCell.Cycled){
                            CurCell.Cycled = true;
                            action.call(this, CurCell, RealX, Y);
                            RealX += Width;
                        }
                    }
                }
            },

            /*generateMap: function (){
                console.log("generateMap");
                var Map = {};
                Map.Raw = new Array();

                for (X = 0; X < this.MAP_WIDTH; X++) {
                    Map.Raw[X] = new Array();
                    for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                        Map.Raw[X][Y] = {};
                    }
                }
                this.initShifting(Map);
                console.log(this);
                this.forEachCell2(Map, function(Cell, X, Y){
                    var Beta = this.getBetaFromY(Y);
                    var Alpha = this.getAlphaFromX(X);
                    // console.log(Beta+", "+Math.cos(Beta)+", "+(this.MAX_TEMP - this.MIN_TEMP)+", "+(Math.cos(Beta)*(this.MAX_TEMP - this.MIN_TEMP)));
                    Cell.Temperature = (Math.cos(Alpha)) * Math.cos(Beta*2) * (this.MAX_TEMP - this.MIN_TEMP) + this.MIN_TEMP;
                });

                console.log(Map);
                return Map;
            },*/
            parseMapFromJson: function (Json){
                console.log("parseMapFromJson");
                var PreMap = jQuery.parseJSON(Json);
                console.log(PreMap);


                console.log("generateMap");
                var Map = {};
                Map.Raw = PreMap.Map;
                /// Read size;

                this.initShifting(Map);
                console.log(Map);

                return Map;
                /*var Map = {};
                Map.Raw = new Array();

                for (X = 0; X < this.MAP_WIDTH; X++) {
                    Map.Raw[X] = new Array();
                    for (Y = 0; Y < this.MAP_HEIGHT; Y++) {
                        Map.Raw[X][Y] = {};
                    }
                }
                this.initShifting(Map);
                console.log(this);
                this.forEachCell2(Map, function(Cell, X, Y){
                    var Beta = this.getBetaFromY(Y);
                    var Alpha = this.getAlphaFromX(X);
                    // console.log(Beta+", "+Math.cos(Beta)+", "+(this.MAX_TEMP - this.MIN_TEMP)+", "+(Math.cos(Beta)*(this.MAX_TEMP - this.MIN_TEMP)));
                    Cell.Temperature = (Math.cos(Alpha)) * Math.cos(Beta*2) * (this.MAX_TEMP - this.MIN_TEMP) + this.MIN_TEMP;
                });

                console.log(Map);
                return Map;*/
            },
            /*sleep: function (ms) {
                ms += new Date().getTime();
                while (new Date() < ms){}
            }, */

            renderMap: function (Canvas, Map){
                if(!Map){
                    return;
                }
                var K = Math.min(Canvas.width / this.MAP_WIDTH, Canvas.height / this.MAP_HEIGHT);
                console.log("renderMap");
                Canv.fillCanvas(Canvas, "black");

                this.forEachCell2(Map, function(Cell, X, Y){
                    // console.log(Cell.Temperature+", "+(Cell.Temperature - this.MIN_TEMP)+", "+(this.MAX_TEMP - this.MIN_TEMP)+", "+(Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP));
                    // Canv.drawRect(Canvas, 50+X*K, 50+Y*K, 1, 1, X*5, Y*20, 0);
                    Canv.drawRect(Canvas, 0, 0, K, X, Y, Map.Width[Y], 1, (Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP) * 255, 0, (this.MAX_TEMP - Cell.Temperature) / (this.MAX_TEMP - this.MIN_TEMP) * 255);
                    //this.sleep(100);
                });

            },
            renderCellOnPlanet: function (Canvas, Cell, LeftCellBorder, RightCellBorder, TopCellBorder, BottomCellBorder){
                var k = Math.min(Canvas.width / this.MAP_WIDTH, Canvas.height / this.MAP_HEIGHT);
                // console.log("LeftCellBorder: " + LeftCellBorder + ", RightCellBorder: " + RightCellBorder);
                // console.log("TopCellBorder: " + TopCellBorder + ", BottomCellBorder: " + BottomCellBorder);
                var AlphaLeft = this.getAlphaFromX(LeftCellBorder);
                var AlphaRight = this.getAlphaFromX(RightCellBorder);
                // console.log("Alpha: " + Alpha + ", cos(Alpha): " + Math.cos(Alpha));
                // if(Alpha > Math.PI/2){
                // console.log("Alpha: " + Alpha + ", cos(Alpha): " + Math.cos(Alpha));
                // }
                var AlphaLeftCos = (Math.sin(AlphaLeft));
                var AlphaRightCos = (Math.sin(AlphaRight));

                var BetaTop = this.getBetaFromY(TopCellBorder) * 2;
                var BetaBottom = this.getBetaFromY(BottomCellBorder) * 2;

                var BetaTopCos = (Math.cos(BetaTop));
                var BetaBottomCos = (Math.cos(BetaBottom));
                var BetaTopSin = (Math.sin(BetaTop));
                var BetaBottomSin = (Math.sin(BetaBottom));
                // console.log("BetaTop: " + BetaTop + ", cos(BetaTop): " + BetaTopCos);
                // console.log("BetaBottom: " + BetaBottom + ", cos(BetaTop): " + BetaBottomCos);

                LeftCellBorder -= this.MAP_WIDTH / 2;
                RightCellBorder -= this.MAP_WIDTH / 2;
                TopCellBorder -= this.MAP_HEIGHT / 2;
                BottomCellBorder -= this.MAP_HEIGHT / 2;

                var BasePointX = this.getPlanetPosition().X;//this.MAP_WIDTH / 2;
                var BasePointY = this.getPlanetPosition().Y;//this.MAP_HEIGHT * (1 / 2) + this.MAP_WIDTH / 2;
                var Radius = this.getPlanetRadius();
                Canv.draw4DotPoligon(Canvas, BasePointX, BasePointY, k,
                                    Radius * AlphaLeftCos * BetaTopCos , Radius * BetaTopSin,
                                    Radius * AlphaLeftCos * BetaBottomCos , Radius * BetaBottomSin,
                                    Radius * AlphaRightCos * BetaBottomCos, Radius * BetaBottomSin,
                                    Radius * AlphaRightCos * BetaTopCos, Radius * BetaTopSin,
                                    (Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP) * 255, 0, (this.MAX_TEMP - Cell.Temperature) / (this.MAX_TEMP - this.MIN_TEMP) * 255);
                        
            },
            renderPlanet: function (Canvas, Map, Angle){
                if(!Map){
                    return;
                }

                while(Angle > (Math.PI * 2)){
                    Angle -= Math.PI * 2;
                }
                while(Angle < 0){
                    Angle += Math.PI * 2;
                }
                var k = Math.min(Canvas.width / this.MAP_WIDTH, Canvas.height / this.MAP_HEIGHT);
                console.log("renderMap: " + Angle);
                // Canv.fillCanvas(Canvas, "black");
                Canv.drawRect(Canvas, this.getPlanetPosition().X, this.getPlanetPosition().Y, k,
                                -this.getPlanetRadius(),
                                -this.getPlanetRadius(),
                                this.getPlanetRadius() * 2,
                                this.getPlanetRadius() * 2, 
                                0, 0, 0);
                    
                // var Angle = Math.PI;
                var Center = this.getXFromAlpha(Angle);//Angle / (2 * Math.PI) * this.MAP_WIDTH;
                var LeftBorder = Center - 0.25 * this.MAP_WIDTH;
                var RightBorder = Center + 0.25 * this.MAP_WIDTH;
                var Reversed = false;
                var ReverseDirection = 0;
                if(LeftBorder < 0)
                {
                    LeftBorder += this.MAP_WIDTH;
                    Reversed = true;
                    ReverseDirection = 1;
                }
                if(RightBorder > this.MAP_WIDTH)
                {
                    RightBorder -= this.MAP_WIDTH;
                    Reversed = true;
                    ReverseDirection = -1;
                }
                this.forEachCell2(Map, function(Cell, X, Y){
                    var Width = Map.Width[Y];

                    var LeftCellBorder = X;
                    var RightCellBorder = X + Width;

                    var TopCellBorder = Y;
                    var BottomCellBorder = Y + 1;

                    if(Reversed == false){
                        if(LeftCellBorder < RightBorder && RightCellBorder > LeftBorder) {
                            if(LeftCellBorder < LeftBorder){
                                LeftCellBorder = LeftBorder;
                            }
                            if(RightCellBorder > RightBorder){
                                RightCellBorder = RightBorder;
                                // Width -= X + Width - RightBorder;
                                // X = RightBorder - Width;
                            }
                            var ShiftX = this.getXFromAlpha(Angle);
                            // console.log(ShiftX);
                            this.renderCellOnPlanet(Canvas, Cell, LeftCellBorder - ShiftX, 
                                RightCellBorder - ShiftX, TopCellBorder, BottomCellBorder);
                            // Canv.draw4DotPoligon(Canvas, 
                            //                     X * AlphaCos, Y,
                            //                     X * AlphaCos, Y-1,
                            //                     (X + Width) * AlphaCos, Y-1,
                            //                     (X + Width) * AlphaCos, Y,
                            //                     (Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP) * 255, 0, (this.MAX_TEMP - Cell.Temperature) / (this.MAX_TEMP - this.MIN_TEMP) * 255);
                            //Canv.drawRect(Canvas, X*K, (Y+this.MAP_HEIGHT*1.5)*K, K*Width, K, (Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP) * 255, 0, (this.MAX_TEMP - Cell.Temperature) / (this.MAX_TEMP - this.MIN_TEMP) * 255);
                        }
                    }
                    else if (Reversed == true){
                        if (LeftCellBorder < RightBorder)  {
                            // if(LeftCellBorder > LeftBorder){
                            //     // LeftCellBorder = LeftBorder;
                            // }
                            if(RightCellBorder > RightBorder){
                                 RightCellBorder = RightBorder;
                                // Width -= X + Width - RightBorder;
                                // X = RightBorder - Width;
                            }
                            if(ReverseDirection == 1){
                                var ShiftX =  -this.MAP_WIDTH / 4 
                                        // + this.MAP_WIDTH/ 2
                                         + RightBorder;
                            }else{
                                var ShiftX =  this.MAP_WIDTH / 4 
                                        - this.MAP_WIDTH/ 2 
                                        + RightBorder;
                            }
                            // console.log(ShiftX);
                            this.renderCellOnPlanet(Canvas, Cell, LeftCellBorder - ShiftX, 
                               RightCellBorder - ShiftX, TopCellBorder, BottomCellBorder);

                        } else if( RightCellBorder > LeftBorder) {
                            if(LeftCellBorder < LeftBorder){
                                 LeftCellBorder = LeftBorder;
                            }
                            // if(RightCellBorder < RightBorder){
                            //     // RightCellBorder = RightBorder;
                            //     // Width -= X + Width - RightBorder;
                            //     // X = RightBorder - Width;
                            // }
                            if(ReverseDirection == 1){
                                var ShiftX = -this.MAP_WIDTH / 4
                                        + this.MAP_WIDTH/ 2 + LeftBorder;
                            }else{
                                var ShiftX = this.MAP_WIDTH / 4
                                        //+ this.MAP_WIDTH/ 2 
                                        + LeftBorder;
                            }
                            // console.log(ShiftX);
                            this.renderCellOnPlanet(Canvas, Cell, LeftCellBorder - ShiftX, 
                                RightCellBorder - ShiftX, TopCellBorder, BottomCellBorder);
                        }
                    }
                    // console.log(Cell.Temperature+", "+(Cell.Temperature - this.MIN_TEMP)+", "+(this.MAX_TEMP - this.MIN_TEMP)+", "+(Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP));
                    // Canv.drawRect(Canvas, 50+X*K, 50+Y*K, 1, 1, X*5, Y*20, 0);
                    // Canv.drawRect(Canvas, X*K, (Y+this.MAP_HEIGHT)*K, K*Map.Width[Y], K, (Cell.Temperature - this.MIN_TEMP) / (this.MAX_TEMP - this.MIN_TEMP) * 255, 0, (this.MAX_TEMP - Cell.Temperature) / (this.MAX_TEMP - this.MIN_TEMP) * 255);
                    //this.sleep(100);
                });

            },

        }

            Module.MAP_HEIGHT = 20;
            Module.MAP_WIDTH = Module.MAP_HEIGHT * Math.PI;// 31.4;
            Module.MIN_TEMP = -30;
            Module.MAX_TEMP = 60;
            return Module;
    }
)