function AddStyle(link) {
    var el = document.createElement("link");
    el.setAttribute("rel", "stylesheet");
    el.setAttribute("href", link);
    document.head.appendChild(el);
}
function AddScript(link) {
    var el = document.createElement("script");
    el.setAttribute("src", link);
    document.body.appendChild(el);
}
function AddMainStyle() {
    var el = document.createElement("style");
    el.innerHTML = "\n/* PrismJS 1.17.1\nhttps://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript */\n/**\n * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/chriskempson/tomorrow-theme\n * @author Rose Pritchard\n * Modified slightly by Fluffy Doggo\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n	color: #ccc;\n	background: none;\n	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n	font-size: 1em;\n	text-align: left;\n	white-space: pre;\n	word-spacing: normal;\n	word-break: normal;\n	word-wrap: normal;\n	line-height: 1.5;\n\n	-moz-tab-size: 4;\n	-o-tab-size: 4;\n	tab-size: 4;\n\n	-webkit-hyphens: none;\n	-moz-hyphens: none;\n	-ms-hyphens: none;\n	hyphens: none;\n\n    max-height: 400px;\n    overflow-y: scroll;\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n	padding: 1em;\n	margin: .5em 0;\n	overflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n	background: #2d2d2d;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n	padding: .1em;\n	border-radius: .3em;\n	white-space: normal;\n}\n\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n	color: #999;\n}\n\n.token.punctuation {\n	color: #ccc;\n}\n\n.token.tag,\n.token.attr-name,\n.token.namespace,\n.token.deleted {\n	color: #e2777a;\n}\n\n.token.function-name {\n	color: #6196cc;\n}\n\n.token.boolean,\n.token.number,\n.token.function {\n	color: #f08d49;\n}\n\n.token.property,\n.token.class-name,\n.token.constant,\n.token.symbol {\n	color: #f8c555;\n}\n\n.token.selector,\n.token.important,\n.token.atrule,\n.token.keyword,\n.token.builtin {\n	color: #cc99cd;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.regex,\n.token.variable {\n	color: #7ec699;\n}\n\n.token.operator,\n.token.entity,\n.token.url {\n	color: #67cdcc;\n}\n\n.token.important,\n.token.bold {\n	font-weight: bold;\n}\n.token.italic {\n	font-style: italic;\n}\n\n.token.entity {\n	cursor: help;\n}\n\n.token.inserted {\n	color: green;\n}\n";
    document.head.appendChild(el);
    
}
AddMainStyle();
AddStyle('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/line-numbers/prism-line-numbers.min.css');
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js');
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/autoloader/prism-autoloader.min.js');
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-javascript.min.js');
AddScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/line-numbers/prism-line-numbers.min.js')
