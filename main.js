console.log("let`s get started");

$(document).ready(function() {

    cleanPage();
    setErrorHandler();
    logToDOM("DOM загружен");

    window.myAudio = addAudio(window.DomLogger, "test_44100Hz_256bit.mp3");
    addButton(window.DomLogger, "нажать для попытки воспроизвести музыку", function(){
        logToDOM("Попытка воспроизведения");
        window.myAudio.play();
        // window.testsSource.start(0);
        // window.redytoplay=true;               
        addTestResult("AudioViaWebSocket", "started");
    });

    aboutBrowser();
    createWebSocket();
    initAudioContext();
    hasGetUserMedia();
    setInterval(function() {
        if(window.testResult.UserMedia)
        {
            sendTestResult();
        }
    }, 1000);
    }

);

/*$.ajax({url: "test.txt", success: function(result){
    $("body").html(result);
}});*/

///DOM control functions/////////////////////////////////
function aboutBrowser()
{
    // logToDOM("Полное название браузера: " + navigator.userAgent);
    // logToDOM("Сокращённое название браузера: " + sayswho());

    logToDOM("Browser CodeName: " + navigator.appCodeName);
    logToDOM("Browser Name: " + navigator.appName);
    logToDOM("Browser Version: " + navigator.appVersion);
    logToDOM("Cookies Enabled: " + navigator.cookieEnabled);
    logToDOM("Browser Language: " + navigator.language);
    logToDOM("Browser Online: " + navigator.onLine);
    logToDOM("Platform: " + navigator.platform);
    logToDOM("User-agent header: " + navigator.userAgent);
}
function cleanPage()
{
    document.body.innerHTML = "";
}
function setErrorHandler()
{
    window.onerror = function(msg, url, linenumber) {
        logToDOM('Произошла ошибка: ' + msg + ',\nв файле: ' + url + ',\nна строке: ' + linenumber);
        return true;
    }
}
function logToDOM(text)
{
    if(!window.DomLogger)
    {
        window.DomLogger = document.createElement("p");
        document.body.appendChild( window.DomLogger );
    }
    var newMassage = document.createElement("div");
    newMassage.innerHTML = text;
    window.DomLogger.appendChild( newMassage );
}
function addScript(url) { var newScript = document.createElement("script"); newScript.src = url; document.body.appendChild( newScript );}
function addButton(target, disc, func)
{
    $('<a/>', {
        id: 'DeviceMotionEvent',
        class: 'btn btn-primary btn-lg',
        role: 'button',
        //href: 'http://google.com',
        //title: 'Become a Googler',
        //rel: 'external',
        text: disc
    }).click(func).appendTo(target);
}
function addAudio(target, source)
{
    var newAudio = document.createElement("audio");
    newAudio.src = source;
    newAudio.autoplay = true;
    window.DomLogger.appendChild( newAudio );
    return newAudio;
}
function addVideo()
{
    var newVideo = document.createElement("video");
    newVideo.width = 200;
    newVideo.onclick = function(){this.src = ""};
    window.DomLogger.appendChild( newVideo );
    return newVideo;
}
/////////////////////////////////////////////////////////

function createWebSocket()
{
    window.ws = new WebSocket("ws://109.173.98.148:1991");
    logToDOM("WebSocket создан");

    window.ws.onopen = function() 
    {
        logToDOM("Соединение установлено");
        logToDOM("Отправка тестового пакета данных: \"test\"");
        sendByWS("test");

        while (window.messages && window.messages.length > 0) {
            window.ws.send(window.messages.pop());
        }
    };

    window.ws.onclose = function(event) 
    {
        if (event.wasClean) 
        {
            logToDOM('Соединение закрыто чисто');
        } 
        else 
        {
            logToDOM('Обрыв соединения'); // например, "убит" процесс сервера
            addTestResult("WebSocket", false);
        }
        logToDOM('Код: ' + event.code + ' причина: ' + event.reason);
    };

    window.ws.onmessage = function(event) 
    {
        logToDOM("По websocket получены данные");
        if(typeof(event.data) == typeof(""))
        {
            logToDOM("Тип данных: текст, содержимое сообщения: " + event.data);
            if(event.data == "test passed")
            {
                logToDOM("Тест websocket пройден");
                addTestResult("WebSocket", true);

                //logToDOM("Отправка тестового пакета данных: \"get test audio\"");
                //sendByWS("get test audio");
            }
            else if(event.data == "got test result")
            {
                logToDOM("Отчёт доставлен");
            }
            else if(event.data == "play")
            {
                logToDOM("Указание запустить музыку");
                window.myAudio.play();
            }


        }
        else
        {
            logToDOM("Тип данных: бинарные данные, размер: " + event.data.size);
            logToDOM("Попытка считать данные в аудио буффер");
            playByteArray(event.data);
        }
    };

    window.ws.onerror = function(error) 
    {
        logToDOM("Ошибка: " + error.message);
        addTestResult("WebSocket", false);
    };
}

///init audio context////////////////////////////////////
function initAudioContext()
{
    logToDOM("Проверка поддержки AudioContext");
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            logToDOM("AudioContext не поддерживается");
            addTestResult("AudioContext", false);
            return;
        }
        window.AudioContext = window.webkitAudioContext;
        logToDOM("AudioContext поддерживается");
        addTestResult("AudioContext", true);
    }
    else
    {
        logToDOM("AudioContext поддерживается");
        addTestResult("AudioContext", true);
    }
}
/////////////////////////////////////////////////////////

function playByteArray(byteArray) {
    var fileReader = new FileReader();
    fileReader.onload = function() 
    {
        logToDOM("Данные считаны в аудиобуфер, попытка декодирования");
        addTestResult("AudioViaWebSocket", "red");
        var context = new window.AudioContext();
        context.decodeAudioData(this.result, function(buffer) 
        {
            logToDOM("Данные декодированы, попытка воспроизведения");
            addTestResult("AudioViaWebSocket", "decoded");
            window.testsSource = context.createBufferSource();
            window.testsSource.buffer = buffer;
            window.testsSource.connect(context.destination);
            window.testsSource.onended = function(){
                logToDOM("Воспроизведение завершено");
                addTestResult("AudioViaWebSocket", "finished");
            };
            if(!window.redytoplay)
            {
                addButton(window.DomLogger, "нажать для попытки воспроизвести музыку", function(){
                logToDOM("Попытка воспроизведения");
                window.testsSource.start(0);
                window.redytoplay=true;               
                addTestResult("AudioViaWebSocket", "started");
                });
            }
            else
            {
                logToDOM("Попытка воспроизведения");
                window.testsSource.start(0);
                addTestResult("AudioViaWebSocket", "started");
            }
            console.log(source);
        },

        function(e){"Error with decoding audio data" + e.err});
        //);
    };
    fileReader.readAsArrayBuffer(byteArray);
}
//////////////////////////////////////////////////////////
function hasGetUserMedia() {
    logToDOM("Проверка поддержки UserMedia");
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {

        navigator.getUserMedia({ audio: true, video: true },
            function(stream) {

                //Extract video track.
                var videoDevice = stream.getVideoTracks()[0];
                // Check if this device supports a picture mode...
                var captureDevice = new ImageCapture(videoDevice);
                if (captureDevice) 
                {
                    //captureDevice.onframe = processFrame;
                    captureDevice.grabFrame();
                }

                var video = addVideo();
                video.src = window.URL.createObjectURL(stream);
                console.log(stream);
                video.onloadedmetadata = function(e) {
                    video.play();
                    addTestResult("UserMedia", true);
                };
            },
            function(err) {
                logToDOM("Возникла следующая ошибка: " + err.name);
                addTestResult("UserMedia", err.name);
            }
        );
    } else {
        logToDOM("UserMedia не поддерживается");
        addTestResult("UserMedia", false);
    }
}

//////////////////////////////////////////////////////////
function addTestResult(name, status)
{
    if(!window.testResult)
    {
        window.testResult = {};
        window.testResult.client = sayswho();
    }
    window.testResult[name] = status;
    console.log(window.testResult);

    var pair = {};
    pair[name] = status;
    var message = $.toJSON(pair);
    sendByWS(message);
}

function sendByWS(message)
{
    if(window.ws && window.ws.readyState == 1)
    {
        window.ws.send(message);
    }
    else
    {
        if(!window.messages)
        {
            window.messages = [];
        }
        window.messages.push(message);
    }
}

function sendTestResult()
{
    if(window.testResult && !window.resultSent)
    {
        logToDOM("Отправка отчёта");
        sendByWS($.toJSON(window.testResult));
        window.resultSent = true;
    }
}

//////////////////////////////////////////////////////////
function sayswho(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}