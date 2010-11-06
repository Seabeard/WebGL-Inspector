(function () {
    var host = glinamespace("gli.host");
    
    function requestCapture(context) {
        context.requestCapture(function (context, frame) {
        });
    };
    
    function requestFullUI(context) {
        alert("would show full ui");
    };

    function injectUI(ui) {
        var context = ui.context;
        
        var button1 = document.createElement("div");
        button1.style.zIndex = "99999";
        button1.style.position = "absolute";
        button1.style.right = "38px";
        button1.style.top = "5px";
        button1.style.cursor = "pointer";
        button1.style.backgroundColor = "rgba(50,10,10,0.8)";
        button1.style.color = "red";
        button1.style.font = "8pt Monaco";
        button1.style.fontWeight = "bold";
        button1.style.padding = "5px";
        button1.style.border = "1px solid red";
        button1.style.webkitUserSelect = "none";
        button1.style.mozUserSelect = "none";
        button1.title = "Capture frame (F12)";
        button1.innerHTML = "Capture";
        document.body.appendChild(button1);
        
        button1.addEventListener("click", function() {
            requestCapture(context);
        }, false);
        
        var button2 = document.createElement("div");
        button2.style.zIndex = "99999";
        button2.style.position = "absolute";
        button2.style.right = "5px";
        button2.style.top = "5px";
        button2.style.cursor = "pointer";
        button2.style.backgroundColor = "rgba(10,50,10,0.8)";
        button2.style.color = "rgb(0,255,0)";
        button2.style.font = "8pt Monaco";
        button2.style.fontWeight = "bold";
        button2.style.padding = "5px";
        button2.style.border = "1px solid rgb(0,255,0)";
        button2.style.webkitUserSelect = "none";
        button2.style.mozUserSelect = "none";
        button2.title = "Show full inspector (F11)";
        button2.innerHTML = "UI";
        document.body.appendChild(button2);
        
        button2.addEventListener("click", function() {
            requestFullUI(context);
        }, false);
    };
    
    function injectHandlers(ui) {
        var context = ui.context;
        
        // Key handler to listen for capture requests
        document.addEventListener("keydown", function(event) {
            var handled = false;
            switch (event.keyCode) {
                case 122: // F11
                    requestFullUI(context);
                    handled = true;
                    break;
                case 123: // F12
                    requestCapture(context);
                    handled = true;
                    break;
            };
            
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        }, false);
    };

    var HostUI = function (context) {
        this.context = context;
        
        injectUI(this);
        injectHandlers(this);
    };

    host.HostUI = HostUI;
})();