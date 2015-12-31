console.log("let`s get started");

$(document).ready(function() {
    console.log("dom loaded");

/*$.ajax({url: "test.txt", success: function(result){
    $("body").html(result);
}});*/

window.totalMoveX = 0;
window.totalMoveY = 0;
window.totalMoveZ = 0;

function addButton(target, text, func){
    $('<a/>', {
        id: 'DeviceMotionEvent',
        class: 'btn btn-primary btn-lg',
        role: 'button',
        //href: 'http://google.com',
        //title: 'Become a Googler',
        //rel: 'external',
        text: 'Горизонтальное положение'
    }).click(func).appendTo(target);
}

window.ws = new WebSocket("ws://109.173.98.148:1991");
window.ws.onopen = function() {
  console.log("Соединение установлено.");
};

window.ws.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

window.ws.onmessage = function(event) {
  console.log("Получены данные " + event.data.size);
  console.log(event.data);
  playByteArray(event.data);
  //window.ws.send("Test");
};

window.ws.onerror = function(error) {
  console.log("Ошибка " + error.message);
};
// var DeviceMotionEventOutput = document.createElement("p");//.addClass( "DeviceMotionEventOutput" );
// var DeviceOrientationOutput = document.createElement("p");//.addClass( "DeviceOrientationOutput" );

document.body.innerHTML = "";
// document.body.appendChild( DeviceMotionEventOutput );
// document.body.appendChild( DeviceOrientationOutput );
$('<p/>', {
    id: 'DeviceMotionEvent',
    //href: 'http://google.com',
    //title: 'Become a Googler',
    //rel: 'external',
    text: 'Motion'
}).appendTo('body');
$('<div/>', {
    id: 'DeviceMotionEventOutput',
    text: 'no value'
}).appendTo('#DeviceMotionEvent');
$('<div/>', {
    id: 'DeviceMotionAcc',
    text: 'init done!'
}).appendTo('#DeviceMotionEvent');
$('<div/>', {
    id: 'DeviceMotionEventStatus',
    text: 'init done!'
}).appendTo('#DeviceMotionEvent');

$('<p/>', {
    id: 'DeviceOrientation',
    text: 'Orientation!'
}).appendTo('body');
$('<div/>', {
    id: 'DeviceOrientationOutput',
    text: 'no value!'
}).appendTo('#DeviceOrientation');
$('<div/>', {
    id: 'DeviceOrientationStatus',
    text: 'init done!'
}).appendTo('#DeviceOrientation');

$('<p/>', {
    id: 'GravitySimulation',
    text: 'GravitySimulation'
}).appendTo('body');
$('<div/>', {
    id: 'GravitySimulationAngles',
    text: 'init done!'
}).appendTo('#GravitySimulation');
$('<div/>', {
    id: 'GravitySimulationSinCos',
    text: 'init done!'
}).appendTo('#GravitySimulation');
$('<div/>', {
    id: 'GravitySimulationResult',
    text: 'init done!'
}).appendTo('#GravitySimulation');

window.calibrationState = "start";
addButton('body', 'стартовое положение', function(){console.log("1"); window.calibrationState = "horisontal";});
addButton('body', 'поворот по горизонтали положение', function(){console.log("2"); window.calibrationState = "rotated";});
addButton('body', 'на боку', function(){console.log("2"); window.calibrationState = "sided";});

window.DeviceOrientationAngles = {alpha: 90, beta: 0, gamma: 90 };
console.log(window.DeviceOrientationAngles);

if(window.DeviceMotionEvent){
  window.addEventListener("devicemotion", motion, false);
}else{
  $("#DeviceMotionEventStatus").html("DeviceMotionEvent is not supported");
}
if(window.DeviceOrientation){
  window.addEventListener("deviceorientation", orientation, false);
}else{
  $("#DeviceOrientationStatus").html("DeviceOrientation is not supported");
}
window.firsrWsSended = false;

/////////////////////////////////////////////////////////


if (!window.AudioContext) {
    if (!window.webkitAudioContext) {
        alert("Your browser sucks because it does NOT support any AudioContext!");
        return;
    }
    window.AudioContext = window.webkitAudioContext;
}

function playByteArray(byteArray) {


    console.log("playByteArray");
    console.log(byteArray);
    var fileReader = new FileReader();
    fileReader.onload = function() {
        console.log(this.result);
        var context = new window.AudioContext();
        context.decodeAudioData(this.result, function(buffer) {
            console.log("decodeAudioData");
            //buf = buffer;
            var source = context.createBufferSource();
            source.buffer = buffer;
            // Connect to the final output node (the speakers)
            source.connect(context.destination);
            // Play immediately
            source.start(0);
            },

            function(e){"Error with decoding audio data" + e.err});
        //);
    };
    fileReader.readAsArrayBuffer(byteArray);

    /*var context = new window.AudioContext();
    console.log(context);
    console.log(byteArray);

    var arrayBuffer = new ArrayBuffer(byteArray.length);
    var bufferView = new Uint8Array(arrayBuffer);
    for (i = 0; i < byteArray.length; i++) {
      bufferView[i] = byteArray[i];
    }

    context.decodeAudioData(arrayBuffer, function(buffer) {
        console.log("decodeAudioData");
        //buf = buffer;
        var source = context.createBufferSource();
        source.buffer = buffer;
        // Connect to the final output node (the speakers)
        source.connect(context.destination);
        // Play immediately
        source.start(0);
        },

        function(e){console.log("Error with decoding audio data" + e);}
    );*/
}

// Play the loaded file
function play(buf) {
    // Create a source node from the buffer
}

/////////////////////////////////////////////////////////

var kSampleRate = 44100; // Other sample rates might not work depending on the your browser's AudioContext
var kNumSamples = 16834;
var kAmplitute  = 440;
var kPI_2       = Math.PI * 2;

function play_buffersource() {
    console.log("play_buffersource");
    console.log("play");

    var ctx = new AudioContext();

    var buffer = ctx.createBuffer(1, kNumSamples, kSampleRate);
    var buf    = buffer.getChannelData(0);
    for (i = 0; i < kNumSamples; ++i) {
        buf[i] = Math.sin(kAmplitute * kPI_2 * i / kSampleRate);
    }

    var node = ctx.createBufferSource(0);
    node.buffer = buffer;
    node.connect(ctx.destination);
    node.noteOn(ctx.currentTime + 0.5);

    node = ctx.createBufferSource(0);
    node.buffer = buffer;
    node.connect(ctx.destination);
    node.noteOn(ctx.currentTime + 2.0);
}

/////////////////////////////////////////////////////////

function orientation(event){
    if(window.firsrWsSended == false && window.ws.readyState == 1)
    {
        //play_buffersource();
        window.ws.send("Test");
        window.firsrWsSended = true;
    }
    // window.ws.send("orientation: "
    // + event.alpha + ", "
    // + event.beta + ", "
    // + event.gamma);

    window.DeviceOrientationAngles = {alpha: event.alpha, beta: event.beta, gamma: event.gamma };
    if(window.calibrationState == "horisontal")
    {
        window.calibrationHorisontal = {alpha: event.alpha, beta: event.beta, gamma: event.gamma };
        window.calibrationState = "start";
        $('<div/>', {
            id: 'calibrationHorisontal',
            text: 'calibrationHorisontal: ' + window.calibrationHorisontal.beta + " " + window.calibrationHorisontal.alpha + " " + window.calibrationHorisontal.gamma,
        }).appendTo('body');
    }
    else if (window.calibrationState == "rotated")
    {
        window.calibrationRotated = {alpha: event.alpha, beta: event.beta, gamma: event.gamma };
        window.calibrationState = "start";
        $('<div/>', {
            id: 'calibrationRotated',
            text: 'calibrationRotated: ' + window.calibrationRotated.beta + " " + window.calibrationRotated.alpha + " " + window.calibrationRotated.gamma,
        }).appendTo('body');
    }
    else if (window.calibrationState == "sided")
    {
        window.calibrationSided = {alpha: event.alpha, beta: event.beta, gamma: event.gamma };
        window.calibrationState = "start";
        $('<div/>', {
            id: 'calibrationSided',
            text: 'calibrationSided: ' + window.calibrationSided.beta + " " + window.calibrationSided.alpha + " " + window.calibrationSided.gamma,
        }).appendTo('body');
    }
    $("#DeviceOrientationOutput").html("orientation: "
    + event.alpha + ", "
    + event.beta + ", "
    + event.gamma);
}
function motion(event){
    // window.ws.send("Test");
    if(event.acceleration)
    {
        $("#DeviceMotionEventStatus").html("Can remove gravity");
    }
    $("#DeviceMotionEventOutput").html("Accelerometer with grav: "
    + event.accelerationIncludingGravity.x + ", "
    + event.accelerationIncludingGravity.y + ", "
    + event.accelerationIncludingGravity.z);

    // if(event.acceleration)
    // {
    //     $("#DeviceMotionEventOutput").html($("#DeviceMotionEventOutput").html() + ", accelerometer: "
    //     + event.acceleration.x + ", "
    //     + event.acceleration.y + ", "
    //     + event.acceleration.z);
    // }
    /*else if(window.DeviceOrientationAngles)
    {*/




console.log(window.DeviceOrientationAngles);
console.log(window.DeviceOrientationAngles.alpha);
        $("#GravitySimulationAngles").html("base angles: alpha: "
        + window.DeviceOrientationAngles.alpha + ", beta: "
        + window.DeviceOrientationAngles.beta + ", gamma: "
        + window.DeviceOrientationAngles.gamma);
        var sa = Math.sin(window.DeviceOrientationAngles.alpha * Math.PI / 180);
        var sb = Math.sin(window.DeviceOrientationAngles.beta * Math.PI / 180);
        var sg = Math.sin(window.DeviceOrientationAngles.gamma * Math.PI / 180);
        var ca = Math.cos(window.DeviceOrientationAngles.alpha * Math.PI / 180);
        var cb = Math.cos(window.DeviceOrientationAngles.beta * Math.PI / 180);
        var cg = Math.cos(window.DeviceOrientationAngles.gamma * Math.PI / 180);
        $("#GravitySimulationSinCos").html("Sinuses and cosinuses sa: "
        + sa + ", sb: "
        + sb + ", sg: "
        + sg + ", ca: "
        + ca + ", cb: "
        + cb + ", cg: "
        + cg);
        // var g = 9.81;
        // var alphaG = (sa * sb * cg + ca * sg) * g;
        // var betaG = (sa * sg * (sb * sb - cb * cb) - ca * sb * cg) * g;
        // var gammaG = (cb * cg * (ca * ca - sa * sa) - (2 * sa * ca * sb * cb * sg)) * g;

        var grav = 9.81;
        // 2 vick
        // var a = (ca * sg + sa * sb * cg);
        // var b = (sa * sg - ca * sb * cg);
        // var g = (cb * cg);

        // 1
        // var a = (ca * cg - sa * cb * sg);
        // var b = (sa * cg + ca * cb * sg);
        // var g = (sb * sg);
        // 2
        // var a = -(ca * sg + sa * cb * cg);
        // var b = -(sa * sg - ca * cb * cg);
        // var g = (sb * cg);
        // 3
        // var a = (sa * sb);
        // var b = (-ca * sb);
        // var g = (cb);
        // custom from 3
        // var a = (sa * sb * cg + sg * cb );
        // var b = (-ca * sb * cg + sg * sb );
        // var g = (cb * cg); ////////////// this one is right

        // custom from mathcad 3
        // var a = (-ca * sg + sa * sb * cg);
        // var b = -(sa * sg - ca * sb * cg);
        // var g = (cb * cg);
        // custom from mathcad 1
        var a = (ca * cg + sa * sb * sg);
        var b = (sa * cg - ca * sb * sg);
        var g = (cb * sg);

        // 1 hor
        // var a = (ca * cg - sa * cb * sg);
        // var b = -(ca * sg + sa * cb * cg);
        // var g = (sa * sb);

        // 3 hor
        // var a = (sb * sg);
        // var b = (sb * cg);
        // var g = (cb);

        var alphaG = a * grav;
        var betaG = b * grav;
        var gammaG = g * grav;
        $("#GravitySimulationResult").html("Gravity projection alpha: "
        + alphaG + ", beta: "
        + betaG + ", gamma: "
        + gammaG);
        $("#DeviceMotionAcc").html("accelerometer: "
        + Math.round(event.accelerationIncludingGravity.x) + "/" + Math.round(alphaG) + ", "
        + Math.round(event.accelerationIncludingGravity.y) + "/" + Math.round(betaG) + ", "
        + Math.round(event.accelerationIncludingGravity.z) + "/" + Math.round(gammaG));
    /*}*/


$("#GravitySimulationAngles").remove();
$('<div/>', {
    id: 'GravitySimulationAngles',
    text: 'Orientation angles: '
}).appendTo('#GravitySimulation');

$('<div/>', {
    id: 'GravitySimulationAnglesAlpha',
    text: "alpha: " + window.DeviceOrientationAngles.alpha
}).appendTo('#GravitySimulationAngles');
$('<div/>', {
    id: 'GravitySimulationAnglesBeta',
    text: "beta: " + window.DeviceOrientationAngles.beta
}).appendTo('#GravitySimulationAngles');
$('<div/>', {
    id: 'GravitySimulationAnglesGamma',
    text: "gamma: " + window.DeviceOrientationAngles.gamma
}).appendTo('#GravitySimulationAngles');

$("#GravitySimulationSinCos").remove();
$('<div/>', {
    id: 'GravitySimulationSinCos',
    text: 'Orientation angles sinuses and cosinuses: '
}).appendTo('#GravitySimulation');

$('<div/>', {
    id: 'GravitySimulationAnglesSa',
    text: "sa: " + sa
}).appendTo('#GravitySimulationSinCos');
$('<div/>', {
    id: 'GravitySimulationAnglesSb',
    text: "sb: " + sb
}).appendTo('#GravitySimulationSinCos');
$('<div/>', {
    id: 'GravitySimulationAnglesSg',
    text: "sg: " + sg
}).appendTo('#GravitySimulationSinCos');

$('<div/>', {
    id: 'GravitySimulationAnglesCa',
    text: "ca: " + ca
}).appendTo('#GravitySimulationSinCos');
$('<div/>', {
    id: 'GravitySimulationAnglesCb',
    text: "cb: " + cb
}).appendTo('#GravitySimulationSinCos');
$('<div/>', {
    id: 'GravitySimulationAnglesCg',
    text: "cg: " + cg
}).appendTo('#GravitySimulationSinCos');

$("#GravitySimulationResult").remove();
$('<div/>', {
    id: 'GravitySimulationResult',
    text: 'Gravity projections: '
}).appendTo('#GravitySimulation');

$('<div/>', {
    id: 'GravitySimulationResultAlpha',
    text: "alpha: " + alphaG
}).appendTo('#GravitySimulationResult');
$('<div/>', {
    id: 'GravitySimulationResultBeta',
    text: "beta: " + betaG
}).appendTo('#GravitySimulationResult');
$('<div/>', {
    id: 'GravitySimulationResultGamma',
    text: "gamma: " + gammaG
}).appendTo('#GravitySimulationResult');
$('<div/>', {
    id: 'GravitySimulationResultModule',
    text: "module: " + Math.sqrt(alphaG * alphaG + betaG * betaG + gammaG * gammaG)
}).appendTo('#GravitySimulationResult');

$('<div/>', {
    id: 'GravitySimulationResultIdea',
    text: "reverse:"
}).appendTo('#GravitySimulationResult');

$('<div/>', {
    id: 'GravitySimulationResultX',
    text: "x: " + (event.accelerationIncludingGravity.x * a),
}).appendTo('#GravitySimulationResultIdea');
$('<div/>', {
    id: 'GravitySimulationResultY',
    text: "y: " + (event.accelerationIncludingGravity.y * b),
}).appendTo('#GravitySimulationResultIdea');
$('<div/>', {
    id: 'GravitySimulationResultZ',
    text: "z: " + (event.accelerationIncludingGravity.z * g),
}).appendTo('#GravitySimulationResultIdea');


    if(event.interval)
    {
        $("#DeviceMotionEventOutput").html($("#DeviceMotionEventOutput").html() +  ", interval: "
        + event.interval);
    }

  //   totalMoveX += event.acceleration.x * event.interval;
  //   totalMoveY += event.acceleration.y * event.interval;
  //   totalMoveZ += event.acceleration.z * event.interval;
  //   $("#DeviceMotionEventOutput").html("Accelerometer with grav: "
  //   + event.accelerationIncludingGravity.x + ", "
  //   + event.accelerationIncludingGravity.y + ", "
  //   + event.accelerationIncludingGravity.z + ", accelerometer: "
  //   + event.acceleration.x + ", "
  //   + event.acceleration.y + ", "
  //   + event.acceleration.z + ", total move: "
  //   + window.totalMoveX + ", "
  //   + window.totalMoveY + ", "
  //   + window.totalMoveZ + ", interval: "
  //   + window.interval
  // );
  // $("body").html("Accelerometer: "
  //   + event.accelerationIncludingGravity.x + ", "
  //   + event.accelerationIncludingGravity.y + ", "
  //   + event.accelerationIncludingGravity.z
  // );
  console.log("Accelerometer: "
    + event.accelerationIncludingGravity.x + ", "
    + event.accelerationIncludingGravity.y + ", "
    + event.accelerationIncludingGravity.z
  );
  console.log(event);
}

//var ws = $.websocket("ws://127.0.0.1:8080/");
 });