define(["modules/html/dom", "modules/html/bootstrap", "modules/websocket"],
    function(dom, btsp, ws){
        var qrpContainer;
        var qrp = {
            show: function (Container, Path){
                console.log(Path);
                qrpContainer = Container;

                qrcode.callback = qrp.decodedQR;


                var Panel = dom.create(
                        {
                            tag:"div",
                            class:"well well-sm",
                        }
                    );
                dom.insert(Container, Panel);

                var fileInput = dom.create(
                    {tag:"input",type:"file",capture:"camera",accept:"image/*"});
                dom.insert(Panel, fileInput);
                fileInput.onchange = qrp.gotPic;
                $('input[type=file]').bootstrapFileInput();

                dom.insert(Panel,
                    dom.create
                    (
                        {
                            tag:"button", 
                            text:"Получить qr код",
                            class:"btn btn-default",
                            onclick:function(){
                                WebSocket.send("get qr");
                            }
                        }
                    )
                );

                var qrOutput = dom.create(
                    {tag:"div"});
                dom.insert(Container, qrOutput);

                var WebSocket = ws.getWebSocket();
                console.log(Path);






                // WebSocket.send("get qr");
                WebSocket.handle("qr data", function(Data){

                    var Qr = jQuery.parseJSON(Data);
                    qrp.renderQr(qrOutput, Qr);
                });
            },
            gotPic: function (event) {
                // alert("event got");
                // console.log("event got");
                if(event.target.files.length == 1 && 
                   event.target.files[0].type.indexOf("image/") == 0) {
                    qrcode.decode(URL.createObjectURL(event.target.files[0]));
                    //$("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));
                }
            },
            decodedQR: function (data) {
                console.log("decoded", data);

                var WebSocket = ws.getWebSocket();
                WebSocket.send("get qr " + data);

                WebSocket.handle("qr recognised", function(Data){
                    var qrData = jQuery.parseJSON(Data);
                    console.log(qrData);
                    qrp.renderRecognisedQR(qrpContainer, qrData);
                }
                );

                WebSocket.handle("qr unrecognised", function(Data){
                    btsp.createAlert("danger", "Этот QR код ничему не соответствует. ", 
                        "");
                    }
                );
                // alert(1);
                // document.getElementById("qr-text").innerHTML = ( data );
            },
            renderRecognisedQR: function (Container, qrData){

                $(Container).empty();
                console.log(Container);

                var Jumbotron = dom.create(
                    {tag:"div",class:"jumbotron col-lg-12",role:"presentation"});
                dom.insert(Container, Jumbotron);
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h2", text:qrData.object}));
                dom.insert(Jumbotron,
                    dom.create(
                        {tag:"h3", text:qrData.data}));

                var buttonGroup = dom.create({
                                tag:"div", 
                                class:"btn-group-vertical",
                                role:"group",});
                dom.insert(Jumbotron, buttonGroup);

                var WebSocket = ws.getWebSocket();
                qrData.actions.forEach(function(Entry) {

                    dom.insert(buttonGroup,
                        dom.create
                        (
                            {
                                tag:"button", 
                                text:Entry,
                                class:"btn btn-default",
                                onclick:function(){
                                    WebSocket.send("post qr " + Entry);
                                }
                            }
                        )
                    );
                    // var WellAction = dom.insert(
                    //     dom.create(
                    //         {
                    //             tag:"div",
                    //             class:"well well-sm",
                    //         }
                    //     ),
                    //     dom.create
                    //     (
                    //         {
                    //             tag:"a", 
                    //             text: Entry,
                    //             // href:"#people#user#" + User.Id
                    //         }
                    //     )
                    // );
                    // dom.insert(Jumbotron,WellAction);
                });

                /*var Users = dom.create(
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
                        text:" в: " + News.Datetime}));*/
            },
            renderQr: function (Container, Qr){
            
            //Credit: https://www.youtube.com/watch?v=EPYnGFEcis4&feature=youtube_gdata_player


                var options = {
                    render: 'canvas',
                    // ecLevel: $('#eclevel').val(),
                    // minVersion: parseInt($('#minversion').val(), 10),

                    fill: "#000000",
                    background: "#FFFFFF",
                    // // fill: $('#img-buffer')[0],

                    text: Qr.value,
                    size: 200,
                    // radius: parseInt($('#radius').val(), 10) * 0.01,
                    // quiet: parseInt($('#quiet').val(), 10),

                    // mode: parseInt($('#mode').val(), 10),

                    // mSize: parseInt($('#msize').val(), 10) * 0.01,
                    // mPosX: parseInt($('#mposx').val(), 10) * 0.01,
                    // mPosY: parseInt($('#mposy').val(), 10) * 0.01,

                    // label: $('#label').val(),
                    // fontname: $('#font').val(),
                    // fontcolor: $('#fontcolor').val(),

                    // image: $('#img-buffer')[0]
                };


                console.log(Qr);
                var t1 = $(Container);
                var t2 = t1.empty();
                var t3 = t2.qrcode(options);
            },
        };
        return qrp;
    }
    
)