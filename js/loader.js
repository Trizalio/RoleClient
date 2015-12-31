
var scriptsToLoad = ["jquery-2.1.4.js"];

function addScript(url) { 
    var newScript = document.createElement("script"); 
    newScript.src = url; 
    document.body.appendChild( newScript );
}

scriptsToLoad.forEach(function(entry){
    console.log("Dounloading " + entry);
    addScript(entry);
});

//addScript("http://109.173.98.148/jquery-2.1.4.js");