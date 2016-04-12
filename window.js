var config;
var G;

window.addEventListener(
    'load',
    (function(){
        let script_type = document.currentScript.type;

        function range(start,stop){
            if (stop === undefined){
                stop = start;
                start = 0;
            }

            for(;start<stop;++start)
                yield start;
        }

        function Grid(options){
            let log_elem = document.getElementById("log");

            function log(s){
                log_elem.appendChild(document.createTextNode(s));
                let br = document.createElement("br");
                log_elem.appendChild(br);
                br.scrollIntoView();
            }

            let width = options.width;
            let height = options.height;
            let on_click = options.on_click;
            let text_of_value = options.text_of_value;

            let table = document.getElementById("table");

            let elems =
                [ for (y of range(height))
                    [ for (x of range(width))
                        document.createElement("button")]];

            for (let y of range(height)){
                let tr = document.createElement("tr");

                for (let x of range(width)) {
                    let button = elems[y][x];
                    let td = document.createElement("td");
                    button.appendChild(document.createTextNode(""));
                    button.disabled = "disabled";

                    if (on_click)
                        button.addEventListener(
                            "click",
                            (function(x,y){
                                return function(){on_click(x,y);}
                            })(x,y)
                        );

                    td.appendChild(button);
                    tr.appendChild(td);
                }

                table.appendChild(tr);
            }

            let values =
                [ for (y of range(height))
                    [ for (x of range(width))
                        null]];

            let value_update_hooks = [];

            if (text_of_value){
                value_update_hooks.push(
                    function(button,value){
                        button.replaceChild(document.createTextNode(text_of_value(value)), button.firstChild);
                    }
                );
            }

            function get(x,y) {
                return values[y][x];
            }

            function set(x,y,value) {
                if (values[y][x] === value)
                    return;

                values[y][x] = value;

                for (let hook of value_update_hooks){
                    hook(elems[y][x],value);
                }
            }

            function enable(x,y) {
                elems[y][x].disabled = "";
            }

            function disable(x,y){
                elems[y][x].disabled = "disabled";
            }

            return {
                "log": log,
                "get": get,
                "set": set,
                "enable": enable,
                "disable": disable,
            };
        }

        return function(){
            let script = document.createElement("script");
            script.type = script_type;
            script.onload =
                function(){
                    document.getElementById("restart").addEventListener(
                        "click",
                        function(){
                            document.location.reload();
                        });

                    G = Grid(config);
                    config.init();
                };

            document.head.appendChild(script);
            script.src =
                URL.createObjectURL(
                    new Blob(
                        [window.opener.document.getElementById("editor").value],
                        {"type": script_type})
                );

        }
    })()
);
