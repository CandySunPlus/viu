function update() {
    console.log('update.');
}
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
        this.parseNodesMeta(nodesMeta);
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
                var key = '';
                for (; i < nodesMeta.length; i++) {
                    var _nodeMeta = nodesMeta[i];
                    if (_nodeMeta[0] === ParseState.ATTR_KEY) {
                        key.concat(key, _nodeMeta[1]);
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
                            key.concat(key, _nodeMeta[2]);
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
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
        for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
            var c = str_1[_i];
            if (this.state === ParseState.TEXT && c === '<') {
                // 找到节点起始标记
                var parseContent = this.flushParseStore();
                if (this.parseStore.length) {
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
            else if ((this.state === ParseState.ATTR_KEY_END || this.state === ParseState.ATTR) && /[^\s]/.test(c)) {
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
            else if (this.state === ParseState.ATTR_VALUE_START && /[^\s]/.test(c)) {
                this.state = ParseState.ATTR_VALUE;
            }
            else if (this.state === ParseState.ATTR_VALUE_START && /[\s]/.test(c)) {
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
var hp = new HyperParser(function (tagName, attrs, children) {
    console.log(tagName, attrs, children);
    return { tagName: tagName, attrs: attrs, children: children };
});
var newC = 'new-class';
var elem = 'elem';
(_a = ["\n<div class=\"panel ", "\" opened onclick=", ">\n    <h1 class=\"panel-title\">This is title</h1>\n    <br />\n    <", " />\n    <div class=\"panel-content\">\n    <span> Next Content </span>\n    </div>\n</div>\n"], _a.raw = ["\n<div class=\"panel ", "\" opened onclick=", ">\n    <h1 class=\"panel-title\">This is title</h1>\n    <br />\n    <", " />\n    <div class=\"panel-content\">\n    <span> Next Content </span>\n    </div>\n</div>\n"], hp.tpl(_a, newC, update, elem));
var _a;
