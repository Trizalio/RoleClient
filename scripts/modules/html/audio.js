define(["modules/html/bootstrap", "modules/websocket"],
    function(btsp, ws){

        var audi = {
            speak: function (Text){
                // var msg = new SpeechSynthesisUtterance($("#input_text").val());
                // msg.voice = window.speechSynthesis.getVoices()[16];
                // msg.lang = 'ru-RU';
                // window.speechSynthesis.speak(msg);
                console.log("speak", Text);
                var msg = new SpeechSynthesisUtterance(Text);
                msg.voice = window.speechSynthesis.getVoices()[16];
                msg.lang = 'ru-RU';
                // console.log(msg);
                // console.log(speechSynthesis.getVoices());
                // speechSynthesis.getVoices().forEach(function(voice) {
                //   console.log(voice.name, voice.lang, voice.default ? '(default)' :'');
                // });
                // msg.lang = 'ru-RU';
                window.speechSynthesis.speak(msg);

            },
        }
        var WebSocket = ws.getWebSocket();
        WebSocket.handle("read", function(Data){
        var Message = jQuery.parseJSON(Data);
            audi.speak(Message.text);

        btsp.createAlert("warning", "Влияние на вас: ", 
            Message.text);
        });
        return audi;
    }
)