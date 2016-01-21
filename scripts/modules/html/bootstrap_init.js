define(["modules/html/dom"],
    function(dom){
        return{
            init:function(){
                
                // +function(){
                //     if(!window.bootstrapInitDone)
                //     {
                //         console.log(jQuery);
                //         console.log(dom);
                //         window.bootstrapInitDone = true;

                //         var xmlHttp = new XMLHttpRequest();
                //         xmlHttp.open( "GET", "scripts/libs/jquery-2.1.4.js", false ); // false for synchronous request
                //         xmlHttp.send( null );
                //         eval(xmlHttp.responseText);
                //         console.log($);
                //         console.log(jQuery);

                //         if (typeof jQuery === 'undefined') {
                //           throw new Error('Bootstrap\'s JavaScript requires jQuery')
                //         }

                //         xmlHttp = new XMLHttpRequest();
                //         xmlHttp.open( "GET", "js/bootstrap.js", false ); // false for synchronous request
                //         xmlHttp.send( null );
                //         // return xmlHttp.responseText;

                //         eval(xmlHttp.responseText);
                //     }
                // }();
                // alert(0);
            }
        };
    }
)