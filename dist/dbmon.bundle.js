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
	__webpack_require__(1);
	var create_element_1 = __webpack_require__(5);
	var container_1 = __webpack_require__(8);
	var component_1 = __webpack_require__(11);
	var data_1 = __webpack_require__(12);
	var perf_monitor_1 = __webpack_require__(10);
	var Popover = (function (_super) {
	    __extends(Popover, _super);
	    function Popover() {
	        return _super.apply(this, arguments) || this;
	    }
	    Popover.prototype.render = function (query) {
	        return create_element_1.default.createElement("div", { className: "popover left" },
	            create_element_1.default.createElement("div", { className: "popover-content" }, query),
	            create_element_1.default.createElement("div", { className: "arrow" }));
	    };
	    return Popover;
	}(component_1.Component));
	var QueryCmp = (function (_super) {
	    __extends(QueryCmp, _super);
	    function QueryCmp() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.popoverCmp = _this.createComponent(Popover);
	        return _this;
	    }
	    QueryCmp.prototype.render = function (query) {
	        return create_element_1.default.createElement("td", { className: this.queryClasses(query.elapsed) },
	            this.formatElapsed(query.elapsed),
	            this.popoverCmp.render(query.query));
	    };
	    QueryCmp.prototype.formatElapsed = function (v) {
	        if (!v) {
	            return '';
	        }
	        var str = v.toFixed(2);
	        if (v > 60) {
	            var minutes = Math.floor(v / 60);
	            var comps = (v % 60).toFixed(2).split('.');
	            var seconds = comps[0];
	            var ms = comps[1];
	            str = minutes + ':' + seconds + '.' + ms;
	        }
	        return str;
	    };
	    QueryCmp.prototype.queryClasses = function (elapsed) {
	        if (elapsed >= 10.0) {
	            return 'Query elapsed warn_long';
	        }
	        else if (elapsed >= 1.0) {
	            return 'Query elapsed warn';
	        }
	        return 'Query elapsed short';
	    };
	    return QueryCmp;
	}(component_1.Component));
	var DatabaseCmp = (function (_super) {
	    __extends(DatabaseCmp, _super);
	    function DatabaseCmp() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.queryCmp = _this.createComponent(QueryCmp);
	        return _this;
	    }
	    DatabaseCmp.prototype.render = function (db) {
	        var topFiveQueries = db.getTopFiveQueries();
	        var count = db.queries.length;
	        return create_element_1.default.createElement("tr", null,
	            create_element_1.default.createElement("td", { className: "dbname" }, db.name),
	            create_element_1.default.createElement("td", { className: "query-count" },
	                create_element_1.default.createElement("span", { className: this.counterClasses(count) }, count)),
	            this.buildQueryRow(topFiveQueries));
	    };
	    DatabaseCmp.prototype.buildQueryRow = function (queries) {
	        var _this = this;
	        return queries.map(function (query) {
	            if (query !== data_1.EMPTY_QUERY) {
	                return _this.queryCmp.render(query);
	            }
	            else {
	                return _this.queryCmp.render(data_1.EMPTY_QUERY);
	            }
	        });
	    };
	    DatabaseCmp.prototype.counterClasses = function (count) {
	        if (count >= 20) {
	            return 'label label-important';
	        }
	        else if (count >= 10) {
	            return 'label label-warning';
	        }
	        return 'label label-success';
	    };
	    return DatabaseCmp;
	}(component_1.Component));
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        var _this = _super.apply(this, arguments) || this;
	        _this.reducers = {
	            UPDATE: function (action) {
	                _this.setData('dbs', action.dbs);
	            }
	        };
	        _this.databaseCmp = _this.createComponent(DatabaseCmp);
	        _this.databaseList = new data_1.DatabaseList(50);
	        _this.update = function () {
	            perf_monitor_1.startProfile('data update');
	            _this.databaseList.randomUpdate(0.5);
	            perf_monitor_1.endProfile('data update');
	            perf_monitor_1.startProfile('view update');
	            _this.send('UPDATE', { dbs: _this.databaseList.dbs });
	            perf_monitor_1.endProfile('view update');
	            requestAnimationFrame(_this.update);
	        };
	        return _this;
	    }
	    App.prototype.render = function () {
	        // ${this.data.dbs.map(db => this.databaseCmp.render(db))}
	        return create_element_1.default.createElement("div", null,
	            create_element_1.default.createElement("table", { className: "table table-striped latest-data" },
	                create_element_1.default.createElement("tbody", null)));
	    };
	    App.prototype.didMounted = function () {
	        perf_monitor_1.startFPSMonitor();
	        perf_monitor_1.startMemMonitor();
	        perf_monitor_1.initProfiler('data update');
	        perf_monitor_1.initProfiler('view update');
	        perf_monitor_1.initProfiler('parse and render');
	        perf_monitor_1.initProfiler('diff node');
	        this.update();
	    };
	    return App;
	}(container_1.Container));
	var app = new App({ dbs: [] });
	app.mountTo(document.getElementById('dbmon'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./styles.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "table {\n  font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #333;\n  background-color: #fff;\n}\n\n#link {\n  position: fixed;\n  top: 0; right: 0;\n  font-size: 12px;\n  padding: 5px 10px;\n  background: rgba(255,255,255,0.85);\n  z-index: 5;\n  box-shadow: 0 0 8px rgba(0,0,0,0.6);\n}\n\n#link .center {\n  display: block;\n  text-align: center;\n}\n\n.Query {\n  position: relative;\n}\n\n.Query:hover .popover {\n  left: -100%;\n  width: 100%;\n  display: block;\n}\n", ""]);

	// exports


/***/ },
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
/* 12 */
/***/ function(module, exports) {

	"use strict";
	var Query = (function () {
	    function Query(elapsed, query) {
	        this.elapsed = elapsed;
	        this.query = query;
	    }
	    Query.rand = function () {
	        var elapsed = Math.random() * 15;
	        var query = 'SELECT * FROM table';
	        if (Math.random() < 0.2) {
	            query = '<IDLE> in transaction';
	        }
	        if (Math.random() < 0.1) {
	            query = 'vacuum';
	        }
	        return new Query(elapsed, query);
	    };
	    return Query;
	}());
	exports.Query = Query;
	exports.EMPTY_QUERY = new Query(0.0, '');
	var Database = (function () {
	    function Database(name) {
	        this.name = name;
	        this.update();
	    }
	    Database.prototype.update = function () {
	        this.queries = [];
	        var r = Math.floor(Math.random() * 10 + 1);
	        for (var j = 0; j < r; j++) {
	            this.queries.push(Query.rand());
	        }
	    };
	    Database.prototype.getTopFiveQueries = function () {
	        var qs = this.queries.slice();
	        qs.sort(function (a, b) { return a.elapsed - b.elapsed; });
	        qs = qs.slice(0, 5);
	        while (qs.length < 5) {
	            qs.push(exports.EMPTY_QUERY);
	        }
	        return qs;
	    };
	    return Database;
	}());
	exports.Database = Database;
	var DatabaseList = (function () {
	    function DatabaseList(n) {
	        this.dbs = [];
	        for (var i = 0; i < n; i++) {
	            this.dbs.push(new Database("cluster " + i));
	            this.dbs.push(new Database("cluster " + i + " slave"));
	        }
	    }
	    DatabaseList.prototype.update = function () {
	        for (var i = 0; i < this.dbs.length; i++) {
	            this.dbs[i] = new Database(this.dbs[i].name);
	        }
	    };
	    DatabaseList.prototype.randomUpdate = function (r) {
	        for (var i = 0; i < this.dbs.length; i++) {
	            if (Math.random() < r) {
	                this.dbs[i] = new Database(this.dbs[i].name);
	            }
	        }
	    };
	    return DatabaseList;
	}());
	exports.DatabaseList = DatabaseList;


/***/ }
/******/ ]);