var CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS = {
  "DEVTOOLCONSOLEINPUTS": [],
  "DEVTOOLCONSOLEINPUT": 0,
  "DEVTOOLSTATE": null
};

var CONTENT_INJECT_CONSOLE = {
    'log': console.log,
    'error': console.error,
    'warn': console.warn,
    'clear': console.clear,
    'logs': []
};

console.log = function(message, ...args) {
    var console_log = {
        'message': message,
        'args': [...args],
        'level': "log",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
    CONTENT_INJECT_CONSOLE.log(message, ...args);
};
    
console.input = function(message, ...args) {
    var console_log = {
        'message': message,
        'args': [...args],
        'level': "input",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
    CONTENT_INJECT_CONSOLE.log(message, ...args);
};
    
console.output = function(message, ...args) {
    var console_log = {
        'message': message,
        'args': [...args],
        'level': "output",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
    CONTENT_INJECT_CONSOLE.log(message, ...args);
};

console.clear = function() {
    CONTENT_INJECT_CONSOLE.logs = [];
    CONTENT_INJECT_CONSOLE.clear();
    CONTENT_INJECT_UPDATE();
};

console.warn = function(message, ...args) {
    var console_log = {
        'message': message,
        'args': [...args],
        'level': "warn",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
    CONTENT_INJECT_CONSOLE.warn(message, ...args);
};

console.error = function(message, ...args) {
    var console_log = {
        'message': message,
        'args': [...args],
        'level': "error",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
    CONTENT_INJECT_CONSOLE.error(message, ...args);
};

window.addEventListener("error", function(message, source, line, col, error) {
    var console_log = {
        'message': 'NotApplicable',
        'args': [message, source, line, col, error],
        'level': "windowerror",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
});
window.addEventListener("securitypolicyviolation", (e) => {
    var console_log = {
        'message': 'Policy Violated',
        'args': [e.blockedURI, e.violatedDirective, e.originalPolicy],
        'level': "violation",
        'time': new Date()
    };

    CONTENT_INJECT_CONSOLE.logs.push(console_log);
    CONTENT_INJECT_UPDATE(console_log);
});

//function CONTENT_INJECT_VIEW_CONSOLE() {
//    var stuff = '<button id="CONTENT_INJECT_DISPLAY_SOURCE" style="width: 50%; background-color: #333; color: white; border: none; outline: none;">Source</button><button id="CONTENT_INJECT_DISPLAY_CONSOLE" style="width: 50%; background-color: #555; color: white; border: none; outline: none;">Console</button><br/>';
//    stuff += '<div id="CONTENT_INJECT_CONSOLE_CONSOLE" style="height: 100%;">';
//    stuff += CONTENT_INJECT_CONSOLE_WARNING("This is test!");
//    return stuff;
//}

function CONTENT_INJECT_CONSOLE_WINDOWERROR(time, message, source, line, col, error) {
    var response = '<div style="padding: 2px 6px; box-sizing: border-box; outline: none; text-align: left; min-height: 0px; word-wrap: break-word; border: none; border-bottom: 0.5px solid #5C0000; white-space: normal; width: 100%; color: #FF8080; background-color: #290000"><table><tr><td style="width: 2.5%"></td><td style="width: 99%;">';
    response += message + "<br/>    at " + source + ":" + line + ":" + col;
    response += "<br/>  " + error + '</td><td style="text-align: right; color: #aaa">' + CONTENT_INJECT_UTILS_TIME(time) + '</td></tr></table></div>';
    return response;
}

function CONTENT_INJECT_UTILS_TIME(date) {
    "use strict";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;
    if (hours < 10) hours = "0" + hours;
    
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

function CONTENT_INJECT_CONSOLE_LOG(next_level, message, time, ...args) {
    for (var i = 0; i < args.length; i++) {
        message = message.replace("%c", (i == 0 ? '' : '</span>') + '<span style="' + args[i].replace('"', '\"') + '">');
    }
    if (args.length > 0) message = message + "</span>";
    message = '<div style="padding: 2px 6px; box-sizing: border-box; outline: none; text-align: left; min-height: 0px; word-wrap: break-word; border: none; border-bottom: 0.5px solid ' + (next_level == "log" || next_level == "input" || next_level == "output" ? '#707070' : (next_level == "warn"/* || next_level == "violation"*/ ? '#665500' : '#5C0000')) + '; white-space: normal; width: 100%; color: white;  background: none;"><table><tr><td style="width: 2.5%; user-select: none; color: rgba(0, 0, 0, 0)">#</td><td style="width: 99%;">' + message;
    message = message + '</td><td style="text-align: right; color: #aaa">' + CONTENT_INJECT_UTILS_TIME(time) + '</td></tr></table></div>';
    return message;
}
    
function CONTENT_INJECT_CONSOLE_INPUT(next_level, message, time, ...args) {
    
    CONTENT_INJECT_CONSOLE.log(message);
    message = (message && window.Prism ? Prism.highlight(message.toString(), Prism.languages.javascript, "javascript") : message);
    for (var i = 0; i < args.length; i++) {
        message = message.replace("%c", (i == 0 ? '' : '</span>') + '<span style="' + args[i].replace('"', '\"') + '">');
    }
    if (args.length > 0) message = message + "</span>";
    message = '<div style="padding: 2px 6px; box-sizing: border-box; outline: none; text-align: left; min-height: 0px; word-wrap: break-word; border: none; border-bottom: 0.5px solid ' + (next_level == "log" || next_level == "input" || next_level == "output" ? '#707070' : (next_level == "warn"/* || next_level == "violation"*/ ? '#665500' : '#5C0000')) + '; white-space: normal; width: 100%; background: none;"><table><tr><td style="width: 2.5%; color: cyan; user-select: none;">&gt;</td><td style="width: 99%; color: white; white-space: pre-wrap; word-wrap: break-word;">' + message;
    message = message + '</td><td style="text-align: right; color: #aaa">' + CONTENT_INJECT_UTILS_TIME(time) + '</td></tr></table></div>';
    return message;
}
    
function CONTENT_INJECT_CONSOLE_OUTPUT(next_level, message, time, ...args) {
    for (var i = 0; i < args.length; i++) {
        message = message.replace("%c", (i == 0 ? '' : '</span>') + '<span style="' + args[i].replace('"', '\"') + '">');
    }
    if (args.length > 0) message = message + "</span>";
    message = '<div style="padding: 2px 6px; box-sizing: border-box; outline: none; text-align: left; min-height: 0px; word-wrap: break-word; border: none; border-bottom: 0.5px solid ' + (next_level == "log" || next_level == "input" || next_level == "output" ? '#707070' : (next_level == "warn"/* || next_level == "violation"*/ ? '#665500' : '#5C0000')) + '; white-space: pre-wrap; width: 100%; background: none;"><table><tr><td style="width: 2.5%; color: orange; user-select: none;">&gt;</td><td style="width: 99%; color: white">' + message
    ;
    message = message + '</td><td style="text-align: right; color: #aaa">' + CONTENT_INJECT_UTILS_TIME(time) + '</td></tr></table></div>';
    return message;
}

function CONTENT_INJECT_CONSOLE_WARNING(next_level, message, time, ...args) {
    for (var i = 0; i < args.length; i++) {
        message = message.replace("%c", (i == 0 ? '' : '</span>') + '<span style="' + args[i].replace('"', '\"') + '">');
    }
    if (args.length > 0) message = message + "</span>";
    message = '<div style="padding: 2px 6px; box-sizing: border-box; outline: none; text-align: left; min-height: 0px; word-wrap: break-word; border: none; border-bottom: 0.5px solid ' + (next_level == "warn" || next_level == "log" || next_level == "input" || next_level == "output"/* || next_level == "violation"*/ ? '#665500' : '#5C0000') + '; white-space: normal; width: 100%; color: #FFDD9E; background-color: #332B00;"><table><tr><td style="width: 2.5%; user-select: none; color: rgba(0, 0, 0, 0); vertical-align: center;"><img src="https://www.materialui.co/materialIcons/alert/warning_amber_18x18.png" width="14" height="14"></img></td><td style="width: 99%;">' + message;
    message = message + '</td><td style="text-align: right; color: #aaa">' + CONTENT_INJECT_UTILS_TIME(time) + '</td></tr></table></div>';
    return message;
}

function CONTENT_INJECT_CONSOLE_ERROR(message, time, ...args) {
    for (var i = 0; i < args.length; i++) {
        message = message.replace("%c", (i == 0 ? '' : '</span>') + '<span style="' + args[i].replace('"', '\"') + '">');
    }
    if (args.length > 0) message = message + "</span>";
    message = '<div style="padding: 2px 6px; box-sizing: border-box; outline: none; text-align: left; min-height: 0px; word-wrap: break-word; border: none; border-bottom: 0.5px solid #5C0000; white-space: normal; width: 100%; color: #FF8080; background-color: #290000"><table><tr><td style="width: 2.5%; user-select: none; color: rgba(0, 0, 0, 0)">#</td><td style="width: 99%;">' + message;
    message = message + '</td><td style="text-align: right; color: #aaa">' + CONTENT_INJECT_UTILS_TIME(time) + '</td></tr></table></div>';
    return message;
}

function CONTENT_INJECT_GET_LOGS() {
    var console_stuffs = "";
    var console_log_length = CONTENT_INJECT_CONSOLE.logs.length;
    for (var i = 0; i < console_log_length; i++) {
        var console_log = CONTENT_INJECT_CONSOLE.logs[i];
        console_stuffs += console_log.level == "log" ? CONTENT_INJECT_CONSOLE_LOG(CONTENT_INJECT_CONSOLE.logs[i + 1] ? CONTENT_INJECT_CONSOLE.logs[i + 1].level : "log", console_log.message, console_log.time, ...console_log.args).replace(/\n/g, "<br/>") : "";
        console_stuffs += console_log.level == "input" ? CONTENT_INJECT_CONSOLE_INPUT(CONTENT_INJECT_CONSOLE.logs[i + 1] ? CONTENT_INJECT_CONSOLE.logs[i + 1].level : "input", console_log.message, console_log.time, ...console_log.args).replace(/\n/g, "<br/>") : "";
        console_stuffs += console_log.level == "output" ? CONTENT_INJECT_CONSOLE_OUTPUT(CONTENT_INJECT_CONSOLE.logs[i + 1] ? CONTENT_INJECT_CONSOLE.logs[i + 1].level : "output", console_log.message.toString().replace(/ /g, "&nbsp;"), console_log.time, ...console_log.args).replace(/\n/g, "<br/>") : "";
        console_stuffs += console_log.level == "warn" ? CONTENT_INJECT_CONSOLE_WARNING(CONTENT_INJECT_CONSOLE.logs[i + 1] ? CONTENT_INJECT_CONSOLE.logs[i + 1].level : "warn", console_log.message.replace(/ /g, "&nbsp;"), console_log.time, ...console_log.args).replace(/\n/g, "<br/>") : "";
        console_stuffs += console_log.level == "error" ? CONTENT_INJECT_CONSOLE_ERROR(console_log.message.replace(/ /g, "&nbsp;"), console_log.time, ...console_log.args).replace(/\n/g, "<br/>") : "";
        console_stuffs += console_log.level == "windowerror" ? CONTENT_INJECT_CONSOLE_WINDOWERROR(console_log.time, ...console_log.args).replace(/\n/g, "<br/>") : "";
    }
    return console_stuffs;
}

function CONTENT_INJECT_UPDATE() {
    var console_stuffs = "";
    CONTENT_INJECT_CONSOLE.log("Updating...");
    if (CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLSTATE == true) {
        if (CONTENT_INJECT_CONSOLE.logs.length > 0) {
            document.getElementById("CONTENT_INJECT_CONSOLE_CONTENT").innerHTML = CONTENT_INJECT_GET_LOGS();
        }
        else {
            document.getElementById("CONTENT_INJECT_CONSOLE_CONTENT").innerHTML = "";
        }
    }
}

function CONTENT_INJECT_DEV_TOOLS() {
	var el = document.createElement("div");
	el.setAttribute("style", "font-family: Roboto Mono, monospace; border: 1px solid black; height: 500px; position: fixed; z-index: 99999999; width: 99%; background-color: #222; bottom: 0px;");
	el.id = "CONTENT_INJECT_DEV_CONSOLE";
	el.innerHTML = CONTENT_INJECT_VIEW_SOURCE();
	document.documentElement.appendChild(el);
	
	CONTENT_INJECT_DEV_TOOLS_ADDEVENTLISTENERS();
    CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLSTATE = false;
}

function CONTENT_INJECT_DEV_TOOLS_ADDEVENTLISTENERS() {
    document.getElementById("CONTENT_INJECT_CLOSE_BUTTON").addEventListener("click", function() {
	    var element = document.getElementById("CONTENT_INJECT_DEV_CONSOLE");
        element.parentNode.removeChild(element);
        CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLSTATE = null;
	});
	
	document.getElementById("CONTENT_INJECT_CONSOLE_BUTTON").addEventListener("click", function() {
        document.getElementById("CONTENT_INJECT_DEV_CONSOLE").innerHTML =  CONTENT_INJECT_VIEW_CONSOLE();
        document.getElementById("CONTENT_INJECT_CONSOLE_INPUT_TEXT").addEventListener("keydown", function(ev) {
            if (!ev.shiftKey && ev.ctrlKey && ev.key != "Shift") {
                if (ev.key == "ArrowUp") {
                    var temp_var_a = CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT;
                    if (temp_var_a - 1 >= 0 && CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS.length > 0) {
                        CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT--;
                        var temp_input = CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS[CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT]
                        document.getElementById("CONTENT_INJECT_CONSOLE_INPUT_TEXT").value = temp_input ? temp_input : "";
                    }
                }
                else if (ev.key == "ArrowDown") {
                    var temp_var_a = CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT;
                    if (temp_var_a + 1 <= CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS.length && CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS.length > 0) {
                        CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT++;
                        var temp_input = CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS[CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT]
                        document.getElementById("CONTENT_INJECT_CONSOLE_INPUT_TEXT").value = temp_input ? temp_input : "";
                    }
                }
            }
            if (!ev.shiftKey && ev.key == "Enter") {
                ev.preventDefault();
                if ( document.getElementById("CONTENT_INJECT_CONSOLE_INPUT_TEXT").value.trim().length > 0) {
                    var element_value = 
                    document.getElementById("CONTENT_INJECT_CONSOLE_INPUT_TEXT").value;
                    document.getElementById("CONTENT_INJECT_CONSOLE_INPUT_TEXT").value = "";
                    try {
                        if (CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS[CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS.length - 1] != element_value)
                            CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS.push(element_value);
                        CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUT = CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLCONSOLEINPUTS.length;
                        console.input(element_value);
                        var content_inject_console_output = eval(element_value);
                        console.output("%c" + content_inject_console_output, "color: gray");
                    }
                    catch(err) {
                        //var console_log = {
                        //    'message': `${err.stack}`,
                        //    'args': [],
                        //    'level': "error",
                        //    'time': new Date()
                        //};
                
                        console.error(err.stack);

                    //CONTENT_INJECT_CONSOLE.logs.push(console_log);
                    //CONTENT_INJECT_UPDATE(console_log);
                    }
                }
            }
        });
        CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLSTATE = true;
	    CONTENT_INJECT_DEV_TOOLS_ADDEVENTLISTENERS();
	});
	
	document.getElementById("CONTENT_INJECT_SOURCE_BUTTON").addEventListener("click", function() {
	    document.getElementById("CONTENT_INJECT_DEV_CONSOLE").innerHTML =  CONTENT_INJECT_VIEW_SOURCE();
        CODE_RUNNER_0_0_0_0_0_0_0_OPTIONS.DEVTOOLSTATE = false;
	    CONTENT_INJECT_DEV_TOOLS_ADDEVENTLISTENERS();
	});
}

function CONTENT_INJECT_VIEW_SOURCE() {
	var buttons = '<button id="CONTENT_INJECT_SOURCE_BUTTON" style="width: 33.3%; background-color: #111; color: white; border: none; outline: none; border-bottom: 1px solid #707070;">Source</button>';
	buttons += '<button id="CONTENT_INJECT_CONSOLE_BUTTON" style="width: 33.3%; background-color: #333; color: #aaa; border: none; outline: none; border-bottom: 1px solid #707070;">Console</button>';
	buttons += '<button id="CONTENT_INJECT_CLOSE_BUTTON" style="width: 33.3%; background-color: #333; color: #aaa; border: none; outline: none; border-bottom: 1px solid #707070;">Close</button><br/>';
	var source = document.documentElement.outerHTML;
	return buttons + '<textarea id="CONTENT_INJECT_SOURCE" spellcheck="false" style="width:99%; height: 90%; resize: none; border: none; background-color: #222; color: white; outline: none; border-bottom: 1px solid #707070;">' + source.replace("'", "\'").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</textarea>';
}

function CONTENT_INJECT_VIEW_CONSOLE() {
    var buttons = '<button id="CONTENT_INJECT_SOURCE_BUTTON" style="width: 33.3%; background-color: #333; color: #aaa; border: none; outline: none; border-bottom: 1px solid #707070;">Source</button>';
	buttons += '<button id="CONTENT_INJECT_CONSOLE_BUTTON" style="width: 33.3%; background-color: #111; color: white; border: none; outline: none; border-bottom: 1px solid #707070;">Console</button>';
	buttons += '<button id="CONTENT_INJECT_CLOSE_BUTTON" style="width: 33.3%; background-color: #333; color: #aaa; border: none; outline: none; border-bottom: 1px solid #707070;">Close</button><br/>';
    var elementConsole = '<div id="CONTENT_INJECT_CONSOLE_CONSOLE" style="height: 95%; overflow-y: scroll;"><div id="CONTENT_INJECT_CONSOLE_CONTENT" style="width: 100%">';
    elementConsole += CONTENT_INJECT_GET_LOGS();
    elementConsole += '</div><textarea id="CONTENT_INJECT_CONSOLE_INPUT_TEXT" style="background: none; outline: none; color: #aaa; width: 99%; border: none; resize: none; height: 50%;"></textarea>';
	elementConsole += "</div>";
	return buttons + elementConsole;
}
CONTENT_INJECT_DEV_TOOLS()

function AddScript(link) {
    var el = document.createElement("script");
    el.setAttribute("src", link);
    el.setAttribute("async", false);
    document.head.appendChild(el);
}
/*function AddPrism() {
    return new Promise(function(resolve, reject) {
        AddScript('').then(() => {
            var timeOut = setInterval(function() {
                if (window.Prism != undefined) {
                    clearInterval(timeOut);
                    resolve();
                }
            }, 10)
        });
    });
}*/
    
function AddMainStyle() {
    var el = document.createElement("style");
    el.innerHTML = "\n/* PrismJS 1.17.1\nhttps://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript */\n/**\n * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/chriskempson/tomorrow-theme\n * @author Rose Pritchard\n * Modified slightly by Fluffy Doggo\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n	color: #ccc;\n	background: none;\n	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n	font-size: 1em;\n	text-align: left;\n	white-space: pre;\n	word-spacing: normal;\n	word-break: normal;\n	word-wrap: normal;\n	line-height: 1.5;\n\n	-moz-tab-size: 4;\n	-o-tab-size: 4;\n	tab-size: 4;\n\n	-webkit-hyphens: none;\n	-moz-hyphens: none;\n	-ms-hyphens: none;\n	hyphens: none;\n\n    max-height: 400px;\n    overflow-wrap: break-word;\n    overflow-y: scroll;}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n	padding: 1em;\n	margin: .5em 0;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n	background: #2d2d2d;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n	padding: .1em;\n	border-radius: .3em;\n	white-space: normal;\n}\n\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n	color: #999;\n}\n\n.token.punctuation {\n	color: #ccc;\n}\n\n.token.tag,\n.token.attr-name,\n.token.namespace,\n.token.deleted {\n	color: #e2777a;\n}\n\n.token.function-name {\n	color: #6196cc;\n}\n\n.token.boolean,\n.token.number,\n.token.function {\n	color: #f08d49;\n}\n\n.token.property,\n.token.class-name,\n.token.constant,\n.token.symbol {\n	color: #f8c555;\n}\n\n.token.selector,\n.token.important,\n.token.atrule,\n.token.keyword,\n.token.builtin {\n	color: #cc99cd;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.regex,\n.token.variable {\n	color: #7ec699;\n}\n\n.token.operator,\n.token.entity,\n.token.url {\n	color: #67cdcc;\n}\n\n.token.important,\n.token.bold {\n	font-weight: bold;\n}\n.token.italic {\n	font-style: italic;\n}\n\n.token.entity {\n	cursor: help;\n}\n\n.token.inserted {\n	color: green;\n}\n";
    document.head.appendChild(el);
}
AddMainStyle();
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js');
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/autoloader/prism-autoloader.min.js');
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-javascript.min.js');
