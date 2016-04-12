window.addEventListener(
    'load',
    function(){
        let buttons = document.getElementById("filelist").getElementsByTagName("button");

        let editor = CodeMirror.fromTextArea(
            document.getElementById("editor"),
            { lineNumbers: true,
              indentUnit: 4
            }
        );

        editor.on(
            "changes",
            function(){
                editor.save();
            }
        );

        let current = null;

        for (let button of buttons){
            button.addEventListener(
                "click",
                function(){
                    let button = this;
                    fetch(button.textContent).then(
                        function(response){
                            response.text().then(
                                function(text){
                                    editor.setValue(text);
                                    current.disabled = "";
                                    current = button;
                                    current.disabled = "disabled";
                                }
                            );
                        }
                    );
                }
            );
        }

        fetch(buttons[0].textContent).then(
            function(response){
                response.text().then(
                    function(text){
                        editor.setValue(text);
                        current = buttons[0];
                        current.disabled = "disabled";
                    }
                );
            }
        );

        document.getElementById("run").addEventListener(
            "click",
            function(){
                window.open("window.html",null,"chrome=yes");
            }
        );
    }
);
