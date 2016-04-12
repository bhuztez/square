config = (function(){
    function init(){
        G.set(0,0,1);
    }

    function text_of_value(v){
        return (v)?"X":"";
    }

    return {
        "width": 1,
        "height": 1,
        "init": init,
        "text_of_value": text_of_value,
    };
})();
