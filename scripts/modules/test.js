define(
    function(){
        if (typeof(Storage) == "undefined") {
            return "Sorry, your browser does not support Web Storage";
        }
        return true;
    }
)