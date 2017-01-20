/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(13);
	__webpack_require__(15);
	var container_1 = __webpack_require__(8);
	var list_1 = __webpack_require__(17);
	var v_1 = __webpack_require__(19);
	var FilterType;
	(function (FilterType) {
	    FilterType[FilterType["ALL"] = 0] = "ALL";
	    FilterType[FilterType["COMPLETED"] = 1] = "COMPLETED";
	    FilterType[FilterType["ACTIVE"] = 2] = "ACTIVE";
	})(FilterType || (FilterType = {}));
	;
	var App = (function (_super) {
	    __extends(App, _super);
	    function App(initData) {
	        var _this = _super.call(this, initData) || this;
	        _this.reducers = {
	            TOGGLE: function (action) {
	                var list = _this.data.list;
	                list[action.index].checked = !list[action.index].checked;
	                _this.setData('list', list);
	            },
	            TOGGLE_ALL: function (action) {
	                var list = _this.data.list.map(function (item) {
	                    item.checked = action.checked;
	                    return item;
	                });
	                _this.setData('list', list);
	            },
	            INPUTNEW: function (action) {
	                _this.setData('name', action.name);
	            },
	            DESTORY: function (action) {
	                var list = _this.data.list;
	                list.splice(action.index, 1);
	                _this.setData('list', list);
	            },
	            INSERT: function (action) {
	                var list = _this.data.list;
	                list.push(action.item);
	                _this.setData('list', list);
	                _this.setData('name', '');
	            },
	            EDIT: function (action) {
	                var list = _this.data.list;
	                list[action.index].editing = true;
	                _this.setData('list', list);
	            },
	            CANCEL_EDIT: function (action) {
	                var list = _this.data.list;
	                list[action.index].editing = false;
	                _this.setData('list', list);
	            },
	            UPDATE: function (action) {
	                var list = _this.data.list;
	                list[action.index].editing = false;
	                list[action.index].title = action.title;
	                _this.setData('list', list);
	            },
	            FILTER: function (action) {
	                _this.setData('filter', action.filter);
	            },
	            CLEAR_COMPLETED: function () {
	                var list = _this.data.list.filter(function (item) { return !item.checked; });
	                _this.setData('list', list);
	            }
	        };
	        _this.clearCompleted = function () {
	            _this.send('CLEAR_COMPLETED');
	        };
	        _this.toggleAll = function (evt) {
	            var el = evt.currentTarget;
	            _this.send('TOGGLE_ALL', { checked: el.checked });
	        };
	        _this.insert = function (evt) {
	            if (_this.data.name && evt.keyCode === 13) {
	                _this.send('INSERT', {
	                    item: {
	                        title: _this.data.name,
	                        editing: false,
	                        checked: false
	                    }
	                });
	            }
	        };
	        _this.oninput = function (evt) {
	            _this.send('INPUTNEW', { name: evt.currentTarget.value });
	        };
	        _this.filter = function (filter) {
	            return function () {
	                _this.send('FILTER', { filter: filter });
	            };
	        };
	        _this.listCmp = _this.createComponent(list_1.TodoList);
	        return _this;
	    }
	    App.prototype.render = function () {
	        return (_a = ["\n        <section class=\"todoapp\">\n        <header class=\"header\">\n        <h1>todos</h1>\n        <input class=\"new-todo\" autofocus\n        placeholder=\"What needs to be done\"\n        value=\"", "\" type=\"text\" oninput=", " onkeydown=", " />\n        </header>\n        <section class=\"main\">\n        <input class=\"toggle-all\" ", "\n            onchange=", " type=\"checkbox\" />\n        <label for=\"toggle-all\">Mark all as complete</label>\n        ", "\n        </section>\n        <footer class=\"footer\">\n        <span class=\"todo-count\"><strong>", "</strong> item left</span>\n        <ul class=\"filters\">\n            <li><a class=\"", "\"\n                onclick=", " href=\"#\">All</a></li>\n            <li><a class=\"", "\"\n                onclick=", " href=\"#\">Active</a></li>\n            <li><a class=\"", "\"\n                onclick=", " href=\"#\">Completed</a></li>\n        </ul>\n        <button class=\"clear-completed\" onclick=", ">Clear completed</button>\n        </footer>\n        </section>\n        "], _a.raw = ["\n        <section class=\"todoapp\">\n        <header class=\"header\">\n        <h1>todos</h1>\n        <input class=\"new-todo\" autofocus\n        placeholder=\"What needs to be done\"\n        value=\"", "\" type=\"text\" oninput=", " onkeydown=", " />\n        </header>\n        <section class=\"main\">\n        <input class=\"toggle-all\" ", "\n            onchange=", " type=\"checkbox\" />\n        <label for=\"toggle-all\">Mark all as complete</label>\n        ", "\n        </section>\n        <footer class=\"footer\">\n        <span class=\"todo-count\"><strong>", "</strong> item left</span>\n        <ul class=\"filters\">\n            <li><a class=\"", "\"\n                onclick=", " href=\"#\">All</a></li>\n            <li><a class=\"", "\"\n                onclick=", " href=\"#\">Active</a></li>\n            <li><a class=\"", "\"\n                onclick=", " href=\"#\">Completed</a></li>\n        </ul>\n        <button class=\"clear-completed\" onclick=", ">Clear completed</button>\n        </footer>\n        </section>\n        "], v_1.default(_a, this.data.name, this.oninput, this.insert, this.filtedTodos(FilterType.ACTIVE).length === 0 ? 'checked' : '', this.toggleAll, this.listCmp.render(this.filtedTodos()), this.filtedTodos(FilterType.ACTIVE).length, this.isFilter(FilterType.ALL) ? 'selected' : '', this.filter(FilterType.ALL), this.isFilter(FilterType.ACTIVE) ? 'selected' : '', this.filter(FilterType.ACTIVE), this.isFilter(FilterType.COMPLETED) ? 'selected' : '', this.filter(FilterType.COMPLETED), this.clearCompleted));
	        var _a;
	    };
	    App.prototype.isFilter = function (filter) {
	        return this.data.filter === filter;
	    };
	    App.prototype.filtedTodos = function (filter) {
	        filter = filter ? filter : this.data.filter;
	        return this.data.list.filter(function (item) {
	            if (filter === FilterType.ALL) {
	                return true;
	            }
	            else if (filter === FilterType.ACTIVE) {
	                return !item.checked;
	            }
	            else if (filter === FilterType.COMPLETED) {
	                return item.checked;
	            }
	        });
	    };
	    return App;
	}(container_1.Container));
	var initData = {
	    list: [{
	            title: '这是一条已完成的',
	            editing: false,
	            checked: true
	        }],
	    name: '',
	    filter: FilterType.ALL
	};
	var app = new App(initData);
	app.mountTo(document.querySelector('.app-container'));


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var svg_tags_1 = __webpack_require__(6);
	var events_1 = __webpack_require__(7);
	var SVG_NS = 'http://www.w3.org/2000/svg';
	var XLINK_NS = 'http://www.w3.org/1999/xlink';
	function isNSAttr(attrName) {
	    return /^xmlns($|:)/i.test(attrName);
	}
	function appendChild(element, children) {
	    if (!Array.isArray(children)) {
	        return;
	    }
	    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
	        var node = children_1[_i];
	        if (Array.isArray(node)) {
	            appendChild(element, node);
	            continue;
	        }
	        if (Object.prototype.toString.call(node) === '[object String]') {
	            if (!element.lastChild || element.lastChild.nodeName !== '#text') {
	                element.appendChild(document.createTextNode(''));
	            }
	            element.lastChild.nodeValue += node;
	        }
	        else if (node && node.nodeType) {
	            element.appendChild(node);
	        }
	    }
	}
	function createElement(tagName, attrs, children) {
	    var element, namespace = null;
	    if (svg_tags_1.default.indexOf(tagName) >= 0) {
	        attrs['namespace'] = SVG_NS;
	    }
	    if (attrs.hasOwnProperty('namespace')) {
	        namespace = attrs['namespace'];
	        delete attrs['namespace'];
	    }
	    if (namespace) {
	        element = document.createElementNS(namespace, tagName);
	    }
	    else {
	        element = document.createElement(tagName);
	    }
	    for (var _i = 0, _a = Object.keys(attrs); _i < _a.length; _i++) {
	        var attrName = _a[_i];
	        var attrValue = attrs[attrName];
	        if (namespace) {
	            if (!isNSAttr(attrName)) {
	                if (attrName === 'xlink:href') {
	                    element.setAttributeNS(XLINK_NS, attrName, attrValue);
	                }
	                else {
	                    element.setAttributeNS(SVG_NS, attrName, attrValue);
	                }
	            }
	        }
	        else {
	            if (events_1.default.indexOf(attrName) >= 0 || attrName === 'ref') {
	                element[attrName] = attrValue;
	            }
	            else {
	                element.setAttribute(attrName, attrValue);
	            }
	        }
	    }
	    appendChild(element, children);
	    return element;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = createElement;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = [
	    'altGlyph',
	    'altGlyphDef',
	    'altGlyphItem',
	    'animate',
	    'animateColor',
	    'animateMotion',
	    'animateTransform',
	    'circle',
	    'clipPath',
	    'color-profile',
	    'cursor',
	    'defs',
	    'desc',
	    'ellipse',
	    'feBlend',
	    'feColorMatrix',
	    'feComponentTransfer',
	    'feComposite',
	    'feConvolveMatrix',
	    'feDiffuseLighting',
	    'feDisplacementMap',
	    'feDistantLight',
	    'feFlood',
	    'feFuncA',
	    'feFuncB',
	    'feFuncG',
	    'feFuncR',
	    'feGaussianBlur',
	    'feImage',
	    'feMerge',
	    'feMergeNode',
	    'feMorphology',
	    'feOffset',
	    'fePointLight',
	    'feSpecularLighting',
	    'feSpotLight',
	    'feTile',
	    'feTurbulence',
	    'filter',
	    'font',
	    'font-face',
	    'font-face-format',
	    'font-face-name',
	    'font-face-src',
	    'font-face-uri',
	    'foreignObject',
	    'g',
	    'glyph',
	    'glyphRef',
	    'hkern',
	    'image',
	    'line',
	    'linearGradient',
	    'marker',
	    'mask',
	    'metadata',
	    'missing-glyph',
	    'mpath',
	    'path',
	    'pattern',
	    'polygon',
	    'polyline',
	    'radialGradient',
	    'rect',
	    'script',
	    'set',
	    'stop',
	    'style',
	    'svg',
	    'switch',
	    'symbol',
	    'text',
	    'textPath',
	    'title',
	    'tref',
	    'tspan',
	    'use',
	    'view',
	    'vkern'
	];


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = [
	    'onclick',
	    'ondblclick',
	    'onmousedown',
	    'onmouseup',
	    'onmouseover',
	    'onmousemove',
	    'onmouseout',
	    'ondragstart',
	    'ondrag',
	    'ondragenter',
	    'ondragleave',
	    'ondragover',
	    'ondrop',
	    'ondragend',
	    'onkeydown',
	    'onkeypress',
	    'onkeyup',
	    'onunload',
	    'onabort',
	    'onerror',
	    'onresize',
	    'onscroll',
	    'onselect',
	    'onchange',
	    'onsubmit',
	    'onreset',
	    'onfocus',
	    'onblur',
	    'oninput'
	];


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var diff_element_1 = __webpack_require__(9);
	var perf_monitor_1 = __webpack_require__(10);
	var Container = (function () {
	    function Container(initData) {
	        if (initData) {
	            this._data = initData;
	        }
	    }
	    Container.prototype.didMounted = function () { };
	    Container.prototype.send = function (actionType, action) {
	        if (this.reducers[actionType]) {
	            // console.log('action dispatched: ', actionType, action ? action : null);
	            this.reducers[actionType].call(this, action);
	        }
	        else {
	            throw new Error("cannot find reducer for action: " + actionType);
	        }
	    };
	    Container.prototype.createComponent = function (component) {
	        return new component(this.send.bind(this));
	    };
	    Container.prototype.mountTo = function (el) {
	        this.el = this.render();
	        el.appendChild(this.el);
	        this.didMounted();
	    };
	    Container.prototype.setData = function (key, value) {
	        this._data[key] = value;
	        perf_monitor_1.startProfile('parse and render');
	        var newEl = this.render();
	        perf_monitor_1.endProfile('parse and render');
	        perf_monitor_1.startProfile('diff node');
	        diff_element_1.default(this.el, newEl);
	        perf_monitor_1.endProfile('diff node');
	    };
	    Object.defineProperty(Container.prototype, "data", {
	        get: function () {
	            return this._data;
	            // return JSON.parse(JSON.stringify(this._data));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Container;
	}());
	exports.Container = Container;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var events_1 = __webpack_require__(7);
	var NodeType;
	(function (NodeType) {
	    NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
	    NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
	    NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
	})(NodeType || (NodeType = {}));
	var XHTML_NS = 'http://www.w3.org/1999/xhtml';
	var SPECIAL_NODE_NAME = ['OPTION', 'INPUT', 'TEXTAREA', 'SELECT'];
	function diffNode(oldNode, newNode, childrenOnly) {
	    if (childrenOnly === void 0) { childrenOnly = true; }
	    var modifiedNode = oldNode;
	    if (!childrenOnly) {
	        if (modifiedNode.nodeType === NodeType.ELEMENT_NODE) {
	            if (newNode.nodeType === NodeType.ELEMENT_NODE) {
	                if (oldNode.nodeName !== newNode.nodeName) {
	                    modifiedNode = moveChildren(oldNode, createElementNS(newNode.nodeName, newNode.namespaceURI));
	                }
	            }
	            else {
	                modifiedNode = newNode;
	            }
	        }
	        else if ([NodeType.TEXT_NODE, NodeType.COMMENT_NODE].indexOf(modifiedNode.nodeType) >= 0) {
	            if (newNode.nodeType === modifiedNode.nodeType) {
	                modifiedNode.nodeValue = newNode.nodeValue;
	                return modifiedNode;
	            }
	            else {
	                modifiedNode = newNode;
	            }
	        }
	    }
	    if (modifiedNode !== newNode) {
	        modifyNode(modifiedNode, newNode, childrenOnly);
	    }
	    if (!childrenOnly && modifiedNode !== oldNode && oldNode.parentNode) {
	        oldNode.parentNode.replaceChild(modifiedNode, oldNode);
	    }
	    if (modifiedNode['ref'] && typeof modifiedNode['ref'] === 'function') {
	        modifiedNode['ref'](modifiedNode);
	    }
	    return modifiedNode;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = diffNode;
	function modifyNode(fromNode, toNode, childrenOnly) {
	    if (childrenOnly === void 0) { childrenOnly = false; }
	    if (toNode === fromNode) {
	        return;
	    }
	    if (!childrenOnly) {
	        modifyElAttrs(fromNode, toNode);
	    }
	    if (fromNode.nodeName !== 'TEXTAREA') {
	        var currentToNodeChild = toNode.firstChild, currentFromNodeChild = fromNode.firstChild, nextToNodeChild = void 0, nextFromNodeChild = void 0;
	        outerLoop: while (currentToNodeChild) {
	            nextToNodeChild = currentToNodeChild.nextSibling;
	            while (currentFromNodeChild) {
	                nextFromNodeChild = currentFromNodeChild.nextSibling;
	                if (currentToNodeChild === currentFromNodeChild) {
	                    currentToNodeChild = nextToNodeChild;
	                    currentFromNodeChild = nextFromNodeChild;
	                    continue outerLoop;
	                }
	                if (currentFromNodeChild.nodeType === currentToNodeChild.nodeType) {
	                    if (currentFromNodeChild.nodeType === NodeType.ELEMENT_NODE) {
	                        if (currentFromNodeChild.nodeName === currentToNodeChild.nodeName) {
	                            if (currentFromNodeChild['ref'] && typeof currentFromNodeChild['ref'] === 'function') {
	                                currentFromNodeChild['ref'](currentFromNodeChild);
	                            }
	                            modifyNode(currentFromNodeChild, currentToNodeChild);
	                            currentToNodeChild = nextToNodeChild;
	                            currentFromNodeChild = nextFromNodeChild;
	                            continue outerLoop;
	                        }
	                    }
	                    else if ([NodeType.TEXT_NODE, NodeType.COMMENT_NODE].indexOf(currentFromNodeChild.nodeType) >= 0) {
	                        if (currentFromNodeChild.nodeValue !== currentToNodeChild.nodeValue) {
	                            currentFromNodeChild.nodeValue = currentToNodeChild.nodeValue;
	                        }
	                        currentToNodeChild = nextToNodeChild;
	                        currentFromNodeChild = nextFromNodeChild;
	                        continue outerLoop;
	                    }
	                }
	                fromNode.removeChild(currentFromNodeChild);
	                currentFromNodeChild = nextFromNodeChild;
	            }
	            fromNode.appendChild(currentToNodeChild);
	            if (currentToNodeChild['ref'] && typeof currentToNodeChild['ref'] === 'function') {
	                currentToNodeChild['ref'](currentToNodeChild);
	            }
	            currentToNodeChild = nextToNodeChild;
	        }
	        while (currentFromNodeChild) {
	            nextFromNodeChild = currentFromNodeChild.nextSibling;
	            fromNode.removeChild(currentFromNodeChild);
	            currentFromNodeChild = nextFromNodeChild;
	        }
	        if (SPECIAL_NODE_NAME.indexOf(fromNode.nodeName) >= 0) {
	            specialNodeModifier(fromNode, toNode);
	        }
	    }
	}
	function specialNodeModifier(fromNode, toNode) {
	    function syncBooleanAttrProp(fromEl, toEl, propName) {
	        if (fromEl[propName] !== toEl[propName]) {
	            fromEl[propName] = toEl[propName];
	        }
	    }
	    var modifier = {
	        OPTION: function (fromNode, toNode) {
	            var fromEl = fromNode, toEl = toNode;
	            syncBooleanAttrProp(fromEl, toEl, 'selected');
	        },
	        INPUT: function (fromNode, toNode) {
	            var fromEl = fromNode, toEl = toNode;
	            syncBooleanAttrProp(fromEl, toEl, 'checked');
	            syncBooleanAttrProp(fromEl, toEl, 'disabled');
	            if (!toEl.hasAttribute('value')) {
	                fromEl.removeAttribute('value');
	            }
	            else {
	                if (fromEl.value !== toEl.value) {
	                    fromEl.value = toEl.value;
	                }
	            }
	        },
	        TEXTAREA: function (fromNode, toNode) {
	            var fromEl = fromNode, toEl = toNode;
	            if (fromEl.value !== toEl.value) {
	                fromEl.value = toEl.value;
	            }
	        },
	        SELECT: function (fromNode, toNode) {
	            var fromEl = fromNode, toEl = toNode;
	            if (!toEl.hasAttribute('multiple')) {
	                var currentChild = toEl.firstChild, i = 0, selectedIndex = -1;
	                while (currentChild) {
	                    if (currentChild.nodeName && currentChild.nodeName.toUpperCase() === 'OPTION') {
	                        if (currentChild.hasAttribute('selected')) {
	                            selectedIndex = i;
	                            break;
	                        }
	                        i++;
	                    }
	                    currentChild = currentChild.nextSibling;
	                }
	                fromEl.selectedIndex = selectedIndex;
	            }
	        }
	    };
	    modifier[fromNode.nodeName](fromNode, toNode);
	}
	function modifyElAttrs(fromEl, toEl) {
	    var fromAttrs = fromEl.attributes;
	    var toAttrs = toEl.attributes;
	    for (var i = fromAttrs.length - 1; i >= 0; i--) {
	        var attr = fromAttrs[i];
	        if (attr.specified) {
	            if (!hasAttribute(toEl, attr)) {
	                removeAttribute(fromEl, attr);
	            }
	        }
	    }
	    for (var i = toAttrs.length - 1; i >= 0; i--) {
	        var attr = toAttrs[i], attrValue = attr.value, fromAttrValue = getAttribute(fromEl, attr);
	        if (fromAttrValue !== attrValue) {
	            setAttribute(fromEl, attr, attrValue);
	        }
	    }
	    for (var _i = 0, events_2 = events_1.default; _i < events_2.length; _i++) {
	        var eventName = events_2[_i];
	        if (toEl[eventName]) {
	            fromEl[eventName] = toEl[eventName];
	        }
	        else if (fromEl[eventName]) {
	            fromEl[eventName] = undefined; // unbind event
	        }
	    }
	}
	function moveChildren(sourceEl, targetEl) {
	    while (sourceEl.firstChild) {
	        targetEl.appendChild(sourceEl.firstChild);
	    }
	    return targetEl;
	}
	function createElementNS(name, namespaceURI) {
	    return (!namespaceURI || namespaceURI === XHTML_NS) ?
	        document.createElement(name) : document.createElementNS(namespaceURI, name);
	}
	function walkNodeTree(node) {
	    if (node.nodeType === NodeType.ELEMENT_NODE) {
	        var currentNode = node.firstChild;
	        while (currentNode) {
	            var key = node.id;
	            console.log(key);
	            walkNodeTree(currentNode);
	            currentNode = currentNode.nextSibling;
	        }
	    }
	}
	function hasAttribute(el, attr) {
	    var namespaceURI = attr.namespaceURI, attrName = attr.name;
	    return namespaceURI ?
	        el.hasAttributeNS(namespaceURI, attr.localName || attrName) :
	        el.hasAttribute(attrName);
	}
	function removeAttribute(el, attr) {
	    var namespaceURI = attr.namespaceURI, attrName = attr.name;
	    return namespaceURI ?
	        el.removeAttributeNS(namespaceURI, attr.localName || attrName) :
	        el.removeAttribute(attrName);
	}
	function setAttribute(el, attr, value) {
	    var namespaceURI = attr.namespaceURI, attrName = attr.name;
	    return namespaceURI ?
	        el.setAttributeNS(namespaceURI, attr.localName || attrName, value) :
	        el.setAttribute(attrName, value);
	}
	function getAttribute(el, attr) {
	    var namespaceURI = attr.namespaceURI, attrName = attr.name;
	    return namespaceURI ?
	        el.getAttributeNS(namespaceURI, attr.localName || attrName) :
	        el.getAttribute(attrName);
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	     true ? factory(exports) :
	    typeof define === 'function' && define.amd ? define(['exports'], factory) :
	    (factory((global.perfMonitor = global.perfMonitor || {})));
	}(this, function (exports) { 'use strict';

	    var MonitorMaxSamples = 100;
	    var MonitorSamplesResult = (function () {
	        function MonitorSamplesResult(min, max, mean, last) {
	            this.min = min;
	            this.max = max;
	            this.mean = mean;
	            this.last = last;
	        }
	        return MonitorSamplesResult;
	    }());
	    /**
	     * Profile Samples.
	     */
	    var MonitorSamples = (function () {
	        function MonitorSamples(maxSamples) {
	            this.samples = [];
	            this.maxSamples = maxSamples;
	            this._i = -1;
	        }
	        MonitorSamples.prototype.addSample = function (v) {
	            this._i = (this._i + 1) % this.maxSamples;
	            this.samples[this._i] = v;
	        };
	        MonitorSamples.prototype.each = function (fn) {
	            var samples = this.samples;
	            for (var i = 0; i < samples.length; i++) {
	                fn(samples[(this._i + 1 + i) % samples.length], i);
	            }
	        };
	        MonitorSamples.prototype.calc = function () {
	            var samples = this.samples;
	            if (samples.length === 0) {
	                return new MonitorSamplesResult(0, 0, 0, 0);
	            }
	            var min = samples[(this._i + 1) % samples.length];
	            var max = min;
	            var sum = 0;
	            for (var i = 0; i < samples.length; i++) {
	                var k = samples[(this._i + 1 + i) % samples.length];
	                if (k < min) {
	                    min = k;
	                }
	                if (k > max) {
	                    max = k;
	                }
	                sum += k;
	            }
	            var last = samples[this._i];
	            var mean = sum / samples.length;
	            return new MonitorSamplesResult(min, max, mean, last);
	        };
	        return MonitorSamples;
	    }());

	    /**
	     * Basic Counter.
	     */
	    var BasicCounter = (function () {
	        function BasicCounter() {
	            this.value = 0;
	            this.onChange = null;
	        }
	        BasicCounter.prototype.inc = function (value) {
	            if (value > 0) {
	                this.value += value;
	                this.onChange();
	            }
	        };
	        return BasicCounter;
	    }());
	    var TimestampedValue = (function () {
	        function TimestampedValue(timestamp, value) {
	            this.value = value;
	            this.next = null;
	        }
	        return TimestampedValue;
	    }());
	    /**
	     * Sliding Counter counts how many times `inc` method were called during `interval` period.
	     */
	    var SlidingCounter = (function () {
	        function SlidingCounter(interval) {
	            var _this = this;
	            this._dec = function () {
	                var now = performance.now();
	                while (_this._firstTimestamp !== null) {
	                    var nextTimestamp = _this._firstTimestamp;
	                    if (now >= nextTimestamp.value) {
	                        _this.value -= nextTimestamp.value;
	                        _this._firstTimestamp = _this._firstTimestamp.next;
	                    }
	                    else {
	                        setTimeout(_this._dec, Math.ceil(nextTimestamp.value - now));
	                        break;
	                    }
	                }
	                if (_this._firstTimestamp === null) {
	                    _this._lastTimestamp = null;
	                }
	                _this.onChange();
	            };
	            this.interval = interval;
	            this.value = 0;
	            this.onChange = null;
	            this._firstTimestamp = null;
	            this._lastTimestamp = null;
	        }
	        SlidingCounter.prototype.inc = function (value) {
	            if (value > 0) {
	                var timestamp = new TimestampedValue(performance.now() + this.interval, value);
	                if (this._firstTimestamp === null) {
	                    this._firstTimestamp = timestamp;
	                    setTimeout(this._dec, this.interval);
	                }
	                else {
	                    this._lastTimestamp.next = timestamp;
	                }
	                this._lastTimestamp = timestamp;
	                this.value += value;
	                this.onChange();
	            }
	        };
	        return SlidingCounter;
	    }());

	    var frameTasks = [];
	    var rafId = -1;
	    /**
	     * Schedule new task that will be executed on the next frame.
	     */
	    function scheduleNextFrameTask(task) {
	        frameTasks.push(task);
	        if (rafId === -1) {
	            requestAnimationFrame(function (t) {
	                rafId = -1;
	                var tasks = frameTasks;
	                frameTasks = [];
	                for (var i = 0; i < tasks.length; i++) {
	                    tasks[i]();
	                }
	            });
	        }
	    }

	    var __extends = (undefined && undefined.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var MonitorGraphHeight = 30;
	    var MonitorGraphWidth = MonitorMaxSamples;
	    var Widget = (function () {
	        function Widget(name) {
	            var _this = this;
	            this._sync = function () {
	                _this.sync();
	                _this._dirty = false;
	            };
	            this.name = name;
	            this.element = document.createElement("div");
	            this.element.style.cssText = "padding: 2px;" +
	                "background-color: #020;" +
	                "font-family: monospace;" +
	                "font-size: 12px;" +
	                "color: #0f0";
	            this._dirty = false;
	            this.invalidate();
	        }
	        Widget.prototype.invalidate = function () {
	            if (!this._dirty) {
	                this._dirty = true;
	                scheduleNextFrameTask(this._sync);
	            }
	        };
	        Widget.prototype.sync = function () {
	            throw new Error("sync method not implemented");
	        };
	        return Widget;
	    }());
	    (function (MonitorWidgetFlags) {
	        MonitorWidgetFlags[MonitorWidgetFlags["HideMin"] = 1] = "HideMin";
	        MonitorWidgetFlags[MonitorWidgetFlags["HideMax"] = 2] = "HideMax";
	        MonitorWidgetFlags[MonitorWidgetFlags["HideMean"] = 4] = "HideMean";
	        MonitorWidgetFlags[MonitorWidgetFlags["HideLast"] = 8] = "HideLast";
	        MonitorWidgetFlags[MonitorWidgetFlags["HideGraph"] = 16] = "HideGraph";
	        MonitorWidgetFlags[MonitorWidgetFlags["RoundValues"] = 32] = "RoundValues";
	    })(exports.MonitorWidgetFlags || (exports.MonitorWidgetFlags = {}));
	    var MonitorWidget = (function (_super) {
	        __extends(MonitorWidget, _super);
	        function MonitorWidget(name, flags, unitName, samples) {
	            _super.call(this, name);
	            this.flags = flags;
	            this.unitName = unitName;
	            this.samples = samples;
	            var label = document.createElement("div");
	            label.style.cssText = "text-align: center";
	            label.textContent = this.name;
	            var text = document.createElement("div");
	            if ((flags & exports.MonitorWidgetFlags.HideMin) === 0) {
	                this.minText = document.createElement("div");
	                text.appendChild(this.minText);
	            }
	            else {
	                this.minText = null;
	            }
	            if ((flags & exports.MonitorWidgetFlags.HideMax) === 0) {
	                this.maxText = document.createElement("div");
	                text.appendChild(this.maxText);
	            }
	            else {
	                this.maxText = null;
	            }
	            if ((flags & exports.MonitorWidgetFlags.HideMean) === 0) {
	                this.meanText = document.createElement("div");
	                text.appendChild(this.meanText);
	            }
	            else {
	                this.meanText = null;
	            }
	            if ((flags & exports.MonitorWidgetFlags.HideLast) === 0) {
	                this.lastText = document.createElement("div");
	                text.appendChild(this.lastText);
	            }
	            else {
	                this.lastText = null;
	            }
	            this.element.appendChild(label);
	            this.element.appendChild(text);
	            if ((flags & exports.MonitorWidgetFlags.HideGraph) === 0) {
	                this.canvas = document.createElement("canvas");
	                this.canvas.style.cssText = "display: block; padding: 0; margin: 0";
	                this.canvas.width = MonitorGraphWidth;
	                this.canvas.height = MonitorGraphHeight;
	                this.ctx = this.canvas.getContext("2d");
	                this.element.appendChild(this.canvas);
	            }
	            else {
	                this.canvas = null;
	                this.ctx = null;
	            }
	        }
	        MonitorWidget.prototype.sync = function () {
	            var _this = this;
	            var result = this.samples.calc();
	            var scale = MonitorGraphHeight / (result.max * 1.2);
	            var min;
	            var max;
	            var mean;
	            var last;
	            if ((this.flags & exports.MonitorWidgetFlags.RoundValues) === 0) {
	                min = result.min.toFixed(2);
	                max = result.max.toFixed(2);
	                mean = result.mean.toFixed(2);
	                last = result.last.toFixed(2);
	            }
	            else {
	                min = Math.round(result.min).toString();
	                max = Math.round(result.max).toString();
	                mean = Math.round(result.mean).toString();
	                last = Math.round(result.last).toString();
	            }
	            if (this.minText !== null) {
	                this.minText.textContent = "min: \u00A0" + min + this.unitName;
	            }
	            if (this.maxText !== null) {
	                this.maxText.textContent = "max: \u00A0" + max + this.unitName;
	            }
	            if (this.meanText !== null) {
	                this.meanText.textContent = "mean: " + mean + this.unitName;
	            }
	            if (this.lastText !== null) {
	                this.lastText.textContent = "last: " + last + this.unitName;
	            }
	            if (this.ctx !== null) {
	                this.ctx.fillStyle = "#010";
	                this.ctx.fillRect(0, 0, MonitorGraphWidth, MonitorGraphHeight);
	                this.ctx.fillStyle = "#0f0";
	                this.samples.each(function (v, i) {
	                    _this.ctx.fillRect(i, MonitorGraphHeight, 1, -(v * scale));
	                });
	            }
	        };
	        return MonitorWidget;
	    }(Widget));
	    var CounterWidget = (function (_super) {
	        __extends(CounterWidget, _super);
	        function CounterWidget(name, counter) {
	            _super.call(this, name);
	            this.counter = counter;
	            this.text = document.createElement("div");
	            this.element.appendChild(this.text);
	        }
	        CounterWidget.prototype.sync = function () {
	            this.text.textContent = this.name + ": " + this.counter.value;
	        };
	        return CounterWidget;
	    }(Widget));

	    var container = null;
	    var initialized = false;
	    /**
	     * Initialize Performance Monitor.
	     */
	    function initPerfMonitor(options) {
	        if (!initialized) {
	            if (options.container) {
	                container = options.container;
	            }
	            initialized = true;
	        }
	    }
	    /**
	     * Check that everything is properly initialized.
	     */
	    function checkInit() {
	        if (!container) {
	            container = document.createElement("div");
	            container.style.cssText = "position: fixed;" +
	                "opacity: 0.9;" +
	                "right: 0;" +
	                "bottom: 0";
	            document.body.appendChild(container);
	        }
	        initialized = true;
	    }
	    /**
	     * Start FPS monitor
	     */
	    function startFPSMonitor(flags) {
	        if (flags === void 0) { flags = exports.MonitorWidgetFlags.HideMin | exports.MonitorWidgetFlags.HideMax |
	            exports.MonitorWidgetFlags.HideMean | exports.MonitorWidgetFlags.RoundValues; }
	        checkInit();
	        var data = new MonitorSamples(MonitorMaxSamples);
	        var w = new MonitorWidget("FPS", flags, "", data);
	        container.appendChild(w.element);
	        var alpha = 2 / 121;
	        var last = 0;
	        var fps = 60;
	        function update(now) {
	            if (last > 0) {
	                fps += alpha * ((1000 / (now - last)) - fps);
	            }
	            last = now;
	            data.addSample(fps);
	            w.invalidate();
	            requestAnimationFrame(update);
	        }
	        requestAnimationFrame(update);
	    }
	    /**
	     * Start Memory Monitor
	     */
	    function startMemMonitor(flags) {
	        if (flags === void 0) { flags = exports.MonitorWidgetFlags.HideMin | exports.MonitorWidgetFlags.HideMean; }
	        checkInit();
	        if (performance.memory === undefined) {
	            return;
	        }
	        var data = new MonitorSamples(MonitorMaxSamples);
	        var w = new MonitorWidget("Memory", flags, "MB", data);
	        container.appendChild(w.element);
	        function update() {
	            data.addSample(Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)));
	            w.invalidate();
	            setTimeout(update, 30);
	        }
	        update();
	    }
	    var ProfilerDetails = (function () {
	        function ProfilerDetails(name, unitName, flags) {
	            this.data = new MonitorSamples(MonitorMaxSamples);
	            this.widget = new MonitorWidget(name, flags, unitName, this.data);
	            this.startTime = -1;
	        }
	        return ProfilerDetails;
	    }());
	    var profilerInstances = {};
	    var CounterDetails = (function () {
	        function CounterDetails(name, interval) {
	            var _this = this;
	            this.data = interval === undefined ? new BasicCounter() : new SlidingCounter(interval);
	            this.widget = new CounterWidget(name, this.data);
	            this.data.onChange = function () {
	                _this.widget.invalidate();
	            };
	        }
	        return CounterDetails;
	    }());
	    var counterInstances = {};
	    /**
	     * Initialize profiler and insert into container.
	     */
	    function initProfiler(name, flags) {
	        if (flags === void 0) { flags = 0; }
	        checkInit();
	        var profiler = profilerInstances[name];
	        if (profiler === void 0) {
	            profilerInstances[name] = profiler = new ProfilerDetails(name, "ms", flags);
	            container.appendChild(profiler.widget.element);
	        }
	    }
	    /**
	     * Initialize counter and insert into container.
	     */
	    function initCounter(name, interval) {
	        checkInit();
	        var counter = counterInstances[name];
	        if (counter === void 0) {
	            counterInstances[name] = counter = new CounterDetails(name, interval);
	            container.appendChild(counter.widget.element);
	        }
	    }
	    function startProfile(name) {
	        var profiler = profilerInstances[name];
	        if (profiler !== void 0) {
	            profiler.startTime = performance.now();
	        }
	    }
	    function endProfile(name) {
	        var now = performance.now();
	        var profiler = profilerInstances[name];
	        if (profiler !== void 0 && profiler.startTime !== -1) {
	            profiler.data.addSample(now - profiler.startTime);
	            profiler.widget.invalidate();
	        }
	    }
	    function count(name, value) {
	        if (value === void 0) { value = 1; }
	        var counter = counterInstances[name];
	        if (counter !== void 0) {
	            counter.data.inc(value);
	        }
	    }

	    exports.initPerfMonitor = initPerfMonitor;
	    exports.startFPSMonitor = startFPSMonitor;
	    exports.startMemMonitor = startMemMonitor;
	    exports.initProfiler = initProfiler;
	    exports.initCounter = initCounter;
	    exports.startProfile = startProfile;
	    exports.endProfile = endProfile;
	    exports.count = count;

	    Object.defineProperty(exports, '__esModule', { value: true });

	}));

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var Component = (function () {
	    function Component(send) {
	        this.send = send;
	    }
	    Component.prototype.createComponent = function (component) {
	        return new component(this.send);
	    };
	    return Component;
	}());
	exports.Component = Component;


/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./base.css", function() {
				var newContent = require("!!./../css-loader/index.js!./base.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "hr {\n\tmargin: 20px 0;\n\tborder: 0;\n\tborder-top: 1px dashed #c5c5c5;\n\tborder-bottom: 1px dashed #f7f7f7;\n}\n\n.learn a {\n\tfont-weight: normal;\n\ttext-decoration: none;\n\tcolor: #b83f45;\n}\n\n.learn a:hover {\n\ttext-decoration: underline;\n\tcolor: #787e7e;\n}\n\n.learn h3,\n.learn h4,\n.learn h5 {\n\tmargin: 10px 0;\n\tfont-weight: 500;\n\tline-height: 1.2;\n\tcolor: #000;\n}\n\n.learn h3 {\n\tfont-size: 24px;\n}\n\n.learn h4 {\n\tfont-size: 18px;\n}\n\n.learn h5 {\n\tmargin-bottom: 0;\n\tfont-size: 14px;\n}\n\n.learn ul {\n\tpadding: 0;\n\tmargin: 0 0 30px 25px;\n}\n\n.learn li {\n\tline-height: 20px;\n}\n\n.learn p {\n\tfont-size: 15px;\n\tfont-weight: 300;\n\tline-height: 1.3;\n\tmargin-top: 0;\n\tmargin-bottom: 0;\n}\n\n#issue-count {\n\tdisplay: none;\n}\n\n.quote {\n\tborder: none;\n\tmargin: 20px 0 60px 0;\n}\n\n.quote p {\n\tfont-style: italic;\n}\n\n.quote p:before {\n\tcontent: '\\201C';\n\tfont-size: 50px;\n\topacity: .15;\n\tposition: absolute;\n\ttop: -20px;\n\tleft: 3px;\n}\n\n.quote p:after {\n\tcontent: '\\201D';\n\tfont-size: 50px;\n\topacity: .15;\n\tposition: absolute;\n\tbottom: -42px;\n\tright: 3px;\n}\n\n.quote footer {\n\tposition: absolute;\n\tbottom: -40px;\n\tright: 0;\n}\n\n.quote footer img {\n\tborder-radius: 3px;\n}\n\n.quote footer a {\n\tmargin-left: 5px;\n\tvertical-align: middle;\n}\n\n.speech-bubble {\n\tposition: relative;\n\tpadding: 10px;\n\tbackground: rgba(0, 0, 0, .04);\n\tborder-radius: 5px;\n}\n\n.speech-bubble:after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 100%;\n\tright: 30px;\n\tborder: 13px solid transparent;\n\tborder-top-color: rgba(0, 0, 0, .04);\n}\n\n.learn-bar > .learn {\n\tposition: absolute;\n\twidth: 272px;\n\ttop: 8px;\n\tleft: -300px;\n\tpadding: 10px;\n\tborder-radius: 5px;\n\tbackground-color: rgba(255, 255, 255, .6);\n\ttransition-property: left;\n\ttransition-duration: 500ms;\n}\n\n@media (min-width: 899px) {\n\t.learn-bar {\n\t\twidth: auto;\n\t\tpadding-left: 300px;\n\t}\n\n\t.learn-bar > .learn {\n\t\tleft: 8px;\n\t}\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "html,\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbutton {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tbackground: none;\n\tfont-size: 100%;\n\tvertical-align: baseline;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\t-webkit-appearance: none;\n\tappearance: none;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n\tfont: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n\tline-height: 1.4em;\n\tbackground: #f5f5f5;\n\tcolor: #4d4d4d;\n\tmin-width: 230px;\n\tmax-width: 550px;\n\tmargin: 0 auto;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\tfont-weight: 300;\n}\n\n:focus {\n\toutline: 0;\n}\n\n.hidden {\n\tdisplay: none;\n}\n\n.todoapp {\n\tbackground: #fff;\n\tmargin: 130px 0 40px 0;\n\tposition: relative;\n\tbox-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n\t            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n}\n\n.todoapp input::-webkit-input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::-moz-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp input::input-placeholder {\n\tfont-style: italic;\n\tfont-weight: 300;\n\tcolor: #e6e6e6;\n}\n\n.todoapp h1 {\n\tposition: absolute;\n\ttop: -155px;\n\twidth: 100%;\n\tfont-size: 100px;\n\tfont-weight: 100;\n\ttext-align: center;\n\tcolor: rgba(175, 47, 47, 0.15);\n\t-webkit-text-rendering: optimizeLegibility;\n\t-moz-text-rendering: optimizeLegibility;\n\ttext-rendering: optimizeLegibility;\n}\n\n.new-todo,\n.edit {\n\tposition: relative;\n\tmargin: 0;\n\twidth: 100%;\n\tfont-size: 24px;\n\tfont-family: inherit;\n\tfont-weight: inherit;\n\tline-height: 1.4em;\n\tborder: 0;\n\tcolor: inherit;\n\tpadding: 6px;\n\tborder: 1px solid #999;\n\tbox-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n\tbox-sizing: border-box;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n}\n\n.new-todo {\n\tpadding: 16px 16px 16px 60px;\n\tborder: none;\n\tbackground: rgba(0, 0, 0, 0.003);\n\tbox-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n}\n\n.main {\n\tposition: relative;\n\tz-index: 2;\n\tborder-top: 1px solid #e6e6e6;\n}\n\nlabel[for='toggle-all'] {\n\tdisplay: none;\n}\n\n.toggle-all {\n\tposition: absolute;\n\ttop: -55px;\n\tleft: -12px;\n\twidth: 60px;\n\theight: 34px;\n\ttext-align: center;\n\tborder: none; /* Mobile Safari */\n}\n\n.toggle-all:before {\n\tcontent: '\\276F';\n\tfont-size: 22px;\n\tcolor: #e6e6e6;\n\tpadding: 10px 27px 10px 27px;\n}\n\n.toggle-all:checked:before {\n\tcolor: #737373;\n}\n\n.todo-list {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n}\n\n.todo-list li {\n\tposition: relative;\n\tfont-size: 24px;\n\tborder-bottom: 1px solid #ededed;\n}\n\n.todo-list li:last-child {\n\tborder-bottom: none;\n}\n\n.todo-list li.editing {\n\tborder-bottom: none;\n\tpadding: 0;\n}\n\n.todo-list li.editing .edit {\n\tdisplay: block;\n\twidth: 506px;\n\tpadding: 12px 16px;\n\tmargin: 0 0 0 43px;\n}\n\n.todo-list li.editing .view {\n\tdisplay: none;\n}\n\n.todo-list li .toggle {\n\ttext-align: center;\n\twidth: 40px;\n\t/* auto, since non-WebKit browsers doesn't support input styling */\n\theight: auto;\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tmargin: auto 0;\n\tborder: none; /* Mobile Safari */\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n\n.todo-list li .toggle:after {\n\tcontent: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#ededed\" stroke-width=\"3\"/></svg>');\n}\n\n.todo-list li .toggle:checked:after {\n\tcontent: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#bddad5\" stroke-width=\"3\"/><path fill=\"#5dc2af\" d=\"M72 25L42 71 27 56l-4 4 20 20 34-52z\"/></svg>');\n}\n\n.todo-list li label {\n\tword-break: break-all;\n\tpadding: 15px 60px 15px 15px;\n\tmargin-left: 45px;\n\tdisplay: block;\n\tline-height: 1.2;\n\ttransition: color 0.4s;\n}\n\n.todo-list li.completed label {\n\tcolor: #d9d9d9;\n\ttext-decoration: line-through;\n}\n\n.todo-list li .destroy {\n\tdisplay: none;\n\tposition: absolute;\n\ttop: 0;\n\tright: 10px;\n\tbottom: 0;\n\twidth: 40px;\n\theight: 40px;\n\tmargin: auto 0;\n\tfont-size: 30px;\n\tcolor: #cc9a9a;\n\tmargin-bottom: 11px;\n\ttransition: color 0.2s ease-out;\n}\n\n.todo-list li .destroy:hover {\n\tcolor: #af5b5e;\n}\n\n.todo-list li .destroy:after {\n\tcontent: '\\D7';\n}\n\n.todo-list li:hover .destroy {\n\tdisplay: block;\n}\n\n.todo-list li .edit {\n\tdisplay: none;\n}\n\n.todo-list li.editing:last-child {\n\tmargin-bottom: -1px;\n}\n\n.footer {\n\tcolor: #777;\n\tpadding: 10px 15px;\n\theight: 20px;\n\ttext-align: center;\n\tborder-top: 1px solid #e6e6e6;\n}\n\n.footer:before {\n\tcontent: '';\n\tposition: absolute;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\theight: 50px;\n\toverflow: hidden;\n\tbox-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n\t            0 8px 0 -3px #f6f6f6,\n\t            0 9px 1px -3px rgba(0, 0, 0, 0.2),\n\t            0 16px 0 -6px #f6f6f6,\n\t            0 17px 2px -6px rgba(0, 0, 0, 0.2);\n}\n\n.todo-count {\n\tfloat: left;\n\ttext-align: left;\n}\n\n.todo-count strong {\n\tfont-weight: 300;\n}\n\n.filters {\n\tmargin: 0;\n\tpadding: 0;\n\tlist-style: none;\n\tposition: absolute;\n\tright: 0;\n\tleft: 0;\n}\n\n.filters li {\n\tdisplay: inline;\n}\n\n.filters li a {\n\tcolor: inherit;\n\tmargin: 3px;\n\tpadding: 3px 7px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tborder-radius: 3px;\n}\n\n.filters li a:hover {\n\tborder-color: rgba(175, 47, 47, 0.1);\n}\n\n.filters li a.selected {\n\tborder-color: rgba(175, 47, 47, 0.2);\n}\n\n.clear-completed,\nhtml .clear-completed:active {\n\tfloat: right;\n\tposition: relative;\n\tline-height: 20px;\n\ttext-decoration: none;\n\tcursor: pointer;\n}\n\n.clear-completed:hover {\n\ttext-decoration: underline;\n}\n\n.info {\n\tmargin: 65px auto 0;\n\tcolor: #bfbfbf;\n\tfont-size: 10px;\n\ttext-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n\ttext-align: center;\n}\n\n.info p {\n\tline-height: 1;\n}\n\n.info a {\n\tcolor: inherit;\n\ttext-decoration: none;\n\tfont-weight: 400;\n}\n\n.info a:hover {\n\ttext-decoration: underline;\n}\n\n/*\n\tHack to remove background from Mobile Safari.\n\tCan't use it globally since it destroys checkboxes in Firefox\n*/\n@media screen and (-webkit-min-device-pixel-ratio:0) {\n\t.toggle-all,\n\t.todo-list li .toggle {\n\t\tbackground: none;\n\t}\n\n\t.todo-list li .toggle {\n\t\theight: 40px;\n\t}\n\n\t.toggle-all {\n\t\t-webkit-transform: rotate(90deg);\n\t\ttransform: rotate(90deg);\n\t\t-webkit-appearance: none;\n\t\tappearance: none;\n\t}\n}\n\n@media (max-width: 430px) {\n\t.footer {\n\t\theight: 50px;\n\t}\n\n\t.filters {\n\t\tbottom: 10px;\n\t}\n}\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var component_1 = __webpack_require__(11);
	var utils_1 = __webpack_require__(18);
	var v_1 = __webpack_require__(19);
	var TodoList = (function (_super) {
	    __extends(TodoList, _super);
	    function TodoList() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.editInputs = [];
	        _this.destory = function (index) {
	            return function () {
	                _this.send('DESTORY', { index: index });
	            };
	        };
	        _this.toggleItem = function (index) {
	            return function () {
	                _this.send('TOGGLE', { index: index });
	            };
	        };
	        return _this;
	    }
	    TodoList.prototype.render = function (list) {
	        var _this = this;
	        return (_a = ["\n        <ul class=\"todo-list\">\n            ", "\n        </ul>\n        "], _a.raw = ["\n        <ul class=\"todo-list\">\n            ",
	            "\n        </ul>\n        "], v_1.default(_a, list.map(function (item, index) {
	            return (_a = ["<li class=\"", "\">\n            <div class=\"view\">\n            <input type=\"checkbox\" class=\"toggle\" ", " onchange=", " />\n            <label ondblclick=", ">", "</label>\n            <button class=\"destroy\" onclick=", "></button>\n            </div>\n            <input class=\"edit\"\n                ref=", "\n                type=\"text\" value=\"", "\"\n                onkeydown=", " onblur=", " />\n        </li>"], _a.raw = ["<li class=\"", "\">\n            <div class=\"view\">\n            <input type=\"checkbox\" class=\"toggle\" ", " onchange=", " />\n            <label ondblclick=", ">", "</label>\n            <button class=\"destroy\" onclick=", "></button>\n            </div>\n            <input class=\"edit\"\n                ref=", "\n                type=\"text\" value=\"", "\"\n                onkeydown=", " onblur=", " />\n        </li>"], v_1.default(_a, utils_1.classList({ completed: item.checked, editing: item.editing }), item.checked ? 'checked' : '', _this.toggleItem(index), _this.toggleEditState(index), item.title, _this.destory(index), function (input) { return _this.editInputs[index] = input; }, item.title, _this.update(index), _this.update(index)));
	            var _a;
	        })));
	        var _a;
	    };
	    TodoList.prototype.toggleEditState = function (index) {
	        var _this = this;
	        return function (e) {
	            _this.send('EDIT', { index: index });
	            _this.editInputs[index].focus();
	            var valLen = _this.editInputs[index].value.length;
	            _this.editInputs[index].setSelectionRange(valLen, valLen);
	        };
	    };
	    TodoList.prototype.update = function (index) {
	        var _this = this;
	        return function (evt) {
	            var target = evt.currentTarget;
	            if (evt.type === 'keydown') {
	                var keyBoardEvt = evt;
	                if (keyBoardEvt.keyCode === 13 && target.value) {
	                    _this.send('UPDATE', { index: index, title: target.value });
	                }
	                else if (keyBoardEvt.keyCode === 27) {
	                    _this.send('CANCEL_EDIT', { index: index });
	                }
	            }
	            else if (evt.type === 'blur') {
	                _this.send('UPDATE', { index: index, title: target.value });
	            }
	        };
	    };
	    return TodoList;
	}(component_1.Component));
	exports.TodoList = TodoList;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	function classList(clist) {
	    var cl = [];
	    for (var _i = 0, _a = Object.keys(clist); _i < _a.length; _i++) {
	        var className = _a[_i];
	        if (clist[className] === true) {
	            cl.push(className);
	        }
	    }
	    return cl.join(' ');
	}
	exports.classList = classList;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyper_parser_1 = __webpack_require__(20);
	var create_element_1 = __webpack_require__(5);
	var hp = new hyper_parser_1.HyperParser(create_element_1.default);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = hp.tpl.bind(hp);


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	var ParseState;
	(function (ParseState) {
	    ParseState[ParseState["OPEN"] = 0] = "OPEN";
	    ParseState[ParseState["CLOSE"] = 1] = "CLOSE";
	    ParseState[ParseState["ATTR"] = 2] = "ATTR";
	    ParseState[ParseState["TEXT"] = 3] = "TEXT";
	    ParseState[ParseState["DEFINE"] = 4] = "DEFINE";
	    ParseState[ParseState["ATTR_KEY"] = 5] = "ATTR_KEY";
	    ParseState[ParseState["ATTR_EQUAL"] = 6] = "ATTR_EQUAL";
	    ParseState[ParseState["ATTR_VALUE"] = 7] = "ATTR_VALUE";
	    ParseState[ParseState["ATTR_BREAK"] = 8] = "ATTR_BREAK";
	    ParseState[ParseState["ATTR_KEY_END"] = 9] = "ATTR_KEY_END";
	    ParseState[ParseState["ATTR_VALUE_START"] = 10] = "ATTR_VALUE_START";
	    ParseState[ParseState["ATTR_VALUE_SINGLE_QOUTE"] = 11] = "ATTR_VALUE_SINGLE_QOUTE";
	    ParseState[ParseState["ATTR_VALUE_DOUBLE_QOUTE"] = 12] = "ATTR_VALUE_DOUBLE_QOUTE";
	})(ParseState || (ParseState = {}));
	var HyperParser = (function () {
	    function HyperParser(h) {
	        this.h = h;
	    }
	    HyperParser.isSelfCloseTag = function (tagName) {
	        return this.closeRE.test(tagName);
	    };
	    HyperParser.prototype.tpl = function (strings) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        var nodesMeta = [];
	        this.parseStore = [];
	        this.state = ParseState.TEXT;
	        for (var i = 0; i < strings.length; i++) {
	            var p = this.parseNode(strings[i]);
	            if (i < values.length) {
	                var val = values[i];
	                var defineState = this.state;
	                defineState = [ParseState.ATTR_VALUE_DOUBLE_QOUTE, ParseState.ATTR_VALUE_SINGLE_QOUTE, ParseState.ATTR_VALUE_START]
	                    .indexOf(defineState) >= 0 ? ParseState.ATTR_VALUE : defineState;
	                defineState = [ParseState.ATTR].indexOf(defineState) >= 0 ? ParseState.ATTR_KEY : defineState;
	                p.push([ParseState.DEFINE, defineState, val]);
	            }
	            nodesMeta.push.apply(nodesMeta, p);
	        }
	        // console.log('parse nodes meta:', nodesMeta.map(nodeMeta => {
	        //     let transformNodeMeta = [ParseState[nodeMeta[0]]];
	        //     for (let i = 1; i < nodeMeta.length; i++) {
	        //         transformNodeMeta[i] = nodeMeta[i];
	        //         transformNodeMeta[i - 1] = ParseState[nodeMeta[i - 1]];
	        //     }
	        //     return transformNodeMeta;
	        // }));
	        return this.parseNodesMeta(nodesMeta);
	    };
	    HyperParser.prototype.parseNodesMeta = function (nodesMeta) {
	        var node = { tagName: null, attrs: {}, children: [] }, stack = [{ node: node, childrenCount: -1 }];
	        for (var i = 0; i < nodesMeta.length; i++) {
	            var current = stack[stack.length - 1]['node'], nodeMeta = nodesMeta[i], state = nodeMeta[0];
	            if (state === ParseState.OPEN && /^\//.test(nodeMeta[1])) {
	                var childrenCount = stack[stack.length - 1]['childrenCount'];
	                if (stack.length > 1) {
	                    stack.pop();
	                    stack[stack.length - 1]['node']['children'][childrenCount] = this.h(current.tagName, current.attrs, current.children.length ? current.children : []);
	                }
	            }
	            else if (state === ParseState.OPEN) {
	                var _node = { tagName: nodeMeta[1], attrs: {}, children: [] };
	                current.children.push(_node);
	                stack.push({ node: _node, childrenCount: current.children.length - 1 });
	            }
	            else if (state === ParseState.ATTR_KEY || (state === ParseState.DEFINE && nodeMeta[1] === ParseState.ATTR_KEY)) {
	                var key = '', _nodeMeta = void 0;
	                for (; i < nodesMeta.length; i++) {
	                    _nodeMeta = nodesMeta[i];
	                    if (_nodeMeta[0] === ParseState.ATTR_KEY) {
	                        key = key.concat(_nodeMeta[1]);
	                    }
	                    else if (_nodeMeta[0] === ParseState.DEFINE && _nodeMeta[1] === ParseState.ATTR_KEY) {
	                        if (Object.prototype.toString.call(_nodeMeta[2]) === '[object Object]' && !key) {
	                            for (var _i = 0, _a = Object.keys(_nodeMeta[2]); _i < _a.length; _i++) {
	                                var _key = _a[_i];
	                                if (!current.attrs.hasOwnProperty(_key)) {
	                                    current.attrs[_key] = _nodeMeta[2][_key];
	                                }
	                            }
	                        }
	                        else {
	                            key = key.concat(_nodeMeta[2]);
	                        }
	                    }
	                    else {
	                        break;
	                    }
	                }
	                if (_nodeMeta[0] === ParseState.ATTR_EQUAL) {
	                    i++;
	                }
	                var j = i;
	                for (; i < nodesMeta.length; i++) {
	                    _nodeMeta = nodesMeta[i];
	                    if (_nodeMeta[0] === ParseState.ATTR_VALUE || _nodeMeta[0] === ParseState.ATTR_KEY) {
	                        if (!current.attrs.hasOwnProperty(key)) {
	                            current.attrs[key] = _nodeMeta[1];
	                        }
	                        else {
	                            if (Object.prototype.toString.call(current.attrs[key]) === '[object String]') {
	                                current.attrs[key] = current.attrs[key].concat(_nodeMeta[1]);
	                            }
	                        }
	                    }
	                    else if (_nodeMeta[0] === ParseState.DEFINE &&
	                        [ParseState.ATTR_KEY, ParseState.ATTR_VALUE].indexOf(_nodeMeta[1]) >= 0) {
	                        if (!current.attrs.hasOwnProperty(key)) {
	                            current.attrs[key] = _nodeMeta[2];
	                        }
	                        else {
	                            current.attrs[key] = current.attrs[key].concat(_nodeMeta[2]);
	                        }
	                    }
	                    else {
	                        if (key.length && !current.attrs.hasOwnProperty(key) && i === j &&
	                            [ParseState.CLOSE, ParseState.ATTR_BREAK].indexOf(_nodeMeta[0]) >= 0) {
	                            current.attrs[key] = key.toLowerCase();
	                        }
	                        break;
	                    }
	                }
	            }
	            else if (state === ParseState.CLOSE) {
	                if (HyperParser.isSelfCloseTag(current.tagName) && stack.length) {
	                    var childrenCount = stack[stack.length - 1]['childrenCount'];
	                    stack.pop();
	                    stack[stack.length - 1]['node']['children'][childrenCount] = this.h(current.tagName, current.attrs, current.children.length ? current.children : []);
	                }
	            }
	            else if (state === ParseState.DEFINE && nodeMeta[1] === ParseState.TEXT) {
	                if (nodeMeta[2] === undefined || nodeMeta[2] === null) {
	                    nodeMeta[2] = '';
	                }
	                else if (!nodeMeta[2]) {
	                    nodeMeta[2] = nodeMeta[2].toString();
	                }
	                if (Array.isArray(nodeMeta[2][0])) {
	                    current.children.push.apply(current.children, nodeMeta[2]);
	                }
	                else if (nodeMeta[2] instanceof Element || Array.isArray(nodeMeta[2])) {
	                    current.children.push(nodeMeta[2]);
	                }
	                else {
	                    current.children.push(nodeMeta[2].toString());
	                }
	            }
	            else if (state === ParseState.TEXT) {
	                current.children.push(nodeMeta[1]);
	            }
	            else if ([ParseState.ATTR_EQUAL, ParseState.ATTR_BREAK].indexOf(state) >= 0) {
	            }
	            else {
	                throw new Error("unhandled state: " + state);
	            }
	        }
	        if (node.children.length > 1 && /^\s*$/.test(node.children[0])) {
	            node.children.shift();
	        }
	        if (node.children.length > 2 || (node.children.length === 2 && /\S/.test(node.children[1]))) {
	            throw new Error('can only have one root element');
	        }
	        if (Array.isArray(node.children[0]) && Object.prototype.toString.call(node.children[0][0]) &&
	            Array.isArray(node.children[0][2])) {
	            node.children[0] = this.h(node.children[0][0], node.children[0][1], node.children[0][2]);
	        }
	        return node.children[0];
	    };
	    HyperParser.prototype.flushParseStore = function () {
	        return this.parseStore.splice(0, this.parseStore.length).join('');
	    };
	    HyperParser.prototype.isInValueStates = function () {
	        return [ParseState.ATTR_VALUE_DOUBLE_QOUTE, ParseState.ATTR_VALUE_SINGLE_QOUTE, ParseState.ATTR_VALUE]
	            .indexOf(this.state) >= 0;
	    };
	    /**
	     * 是否为引号中
	     *
	     * @returns {boolean}
	     */
	    HyperParser.prototype.isQouteState = function () {
	        return this.state === ParseState.ATTR_VALUE_DOUBLE_QOUTE || this.state === ParseState.ATTR_VALUE_SINGLE_QOUTE;
	    };
	    /**
	     * 是否为配对的引号
	     *
	     * @param c {string} 当前正在解析的字符
	     * @returns {boolean}
	     */
	    HyperParser.prototype.isPairQoute = function (c) {
	        if (c === '"' && this.state === ParseState.ATTR_VALUE_DOUBLE_QOUTE) {
	            return true;
	        }
	        if (c === '\'' && this.state === ParseState.ATTR_VALUE_SINGLE_QOUTE) {
	            return true;
	        }
	        return false;
	    };
	    HyperParser.prototype.parseNode = function (str) {
	        var p = [];
	        for (var i = 0; i < str.length; i++) {
	            var c = str.charAt(i);
	            if (this.state === ParseState.TEXT && c === '<') {
	                // 找到节点起始标记
	                var parseContent = this.flushParseStore();
	                if (parseContent) {
	                    p.push([this.state, parseContent]);
	                }
	                this.state = ParseState.OPEN;
	            }
	            else if (c === '>' && !this.isQouteState()) {
	                // 找到节点结束标记
	                var parseContent = this.flushParseStore();
	                if ([ParseState.OPEN, ParseState.ATTR_KEY, ParseState.ATTR_VALUE].indexOf(this.state) >= 0) {
	                    p.push([this.state, parseContent]);
	                }
	                p.push([ParseState.CLOSE]);
	                this.state = ParseState.TEXT;
	            }
	            else if (this.state === ParseState.TEXT) {
	                this.parseStore.push(c);
	            }
	            else if (this.state === ParseState.OPEN && /\s/.test(c)) {
	                // 在节点未闭合前发现空格，标识为节点属性
	                p.push([this.state, this.flushParseStore()]);
	                this.state = ParseState.ATTR;
	            }
	            else if (this.state === ParseState.OPEN) {
	                // 记录节点名称
	                this.parseStore.push(c);
	            }
	            else if (this.state === ParseState.ATTR && /[\w-]/.test(c)) {
	                // 记录节点属性名
	                this.parseStore.push(c);
	                this.state = ParseState.ATTR_KEY;
	            }
	            else if (this.state === ParseState.ATTR && /\s/.test(c)) {
	                if (this.parseStore.length) {
	                    p.push([ParseState.ATTR_KEY, this.flushParseStore()]);
	                }
	                p.push([ParseState.ATTR_BREAK]);
	            }
	            else if (this.state === ParseState.ATTR_KEY && /\s/.test(c)) {
	                p.push([this.state, this.flushParseStore()]);
	                this.state = ParseState.ATTR_KEY_END;
	            }
	            else if (this.state === ParseState.ATTR_KEY && c === '=') {
	                p.push([this.state, this.flushParseStore()], [ParseState.ATTR_EQUAL]);
	                this.state = ParseState.ATTR_VALUE_START;
	            }
	            else if (this.state === ParseState.ATTR_KEY) {
	                this.parseStore.push(c);
	            }
	            else if ((this.state === ParseState.ATTR_KEY_END || this.state === ParseState.ATTR) && c === '=') {
	                p.push([ParseState.ATTR_EQUAL]);
	                this.state = ParseState.ATTR_VALUE_START;
	            }
	            else if ((this.state === ParseState.ATTR_KEY_END || this.state === ParseState.ATTR) && /\S/.test(c)) {
	                p.push([ParseState.ATTR_BREAK]);
	                if (/[\w-]/.test(c)) {
	                    this.parseStore.push(c);
	                    this.state = ParseState.ATTR_KEY;
	                }
	                else {
	                    this.state = ParseState.ATTR;
	                }
	            }
	            else if (this.state === ParseState.ATTR_VALUE_START && c === '"') {
	                this.state = ParseState.ATTR_VALUE_DOUBLE_QOUTE;
	            }
	            else if (this.state === ParseState.ATTR_VALUE_START && c === '\'') {
	                this.state = ParseState.ATTR_VALUE_SINGLE_QOUTE;
	            }
	            else if (this.isPairQoute(c)) {
	                p.push([ParseState.ATTR_VALUE, this.flushParseStore()], [ParseState.ATTR_BREAK]);
	                this.state = ParseState.ATTR;
	            }
	            else if (this.state === ParseState.ATTR_VALUE_START && /\S/.test(c)) {
	                this.state = ParseState.ATTR_VALUE;
	            }
	            else if (this.state === ParseState.ATTR_VALUE_START && /\s/.test(c)) {
	                p.push([ParseState.ATTR_VALUE, this.flushParseStore()], [ParseState.ATTR_BREAK]);
	                this.state = ParseState.ATTR;
	            }
	            else if (this.isInValueStates()) {
	                this.parseStore.push(c);
	            }
	        }
	        if (this.state === ParseState.TEXT && this.parseStore.length) {
	            p.push([this.state, this.flushParseStore()]);
	        }
	        else if (this.isInValueStates() && this.parseStore.length) {
	            p.push([ParseState.ATTR_VALUE, this.flushParseStore()]);
	        }
	        else if (this.state === ParseState.ATTR_KEY && this.parseStore.length) {
	            p.push([this.state, this.flushParseStore()]);
	        }
	        return p;
	    };
	    return HyperParser;
	}());
	HyperParser.closeRE = RegExp('^(' + [
	    'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
	    'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
	    'source', 'track', 'wbr',
	    // SVG TAGS
	    'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
	    'feBlend', 'feColorMatrix', 'feComposite',
	    'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
	    'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
	    'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
	    'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
	    'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
	    'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
	    'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
	    'vkern'
	].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$');
	exports.HyperParser = HyperParser;


/***/ }
/******/ ]);