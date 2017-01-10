import debug from 'debug';

const logger = debug('hyper-parser:debug');

export interface INodeAttrs {
    [name: string]: any;
}

export interface IHyperScript<T> {
    (tagName: string, attrs: INodeAttrs, children: T[]): T;
}

enum ParseState {
    OPEN,
    CLOSE,
    ATTR,
    TEXT,
    DEFINE,
    ATTR_KEY,
    ATTR_EQUAL,
    ATTR_VALUE,
    ATTR_BREAK,
    ATTR_KEY_END,
    ATTR_VALUE_START,
    ATTR_VALUE_SINGLE_QOUTE,
    ATTR_VALUE_DOUBLE_QOUTE
}

class HyperParser<T> {
    private static closeRE = RegExp('^(' + [
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

    private static attrToPropMap = {
        'class': 'className',
        'for': 'htmlFor',
        'http-equiv': 'httpEquiv'
    };

    private state: ParseState;
    private parseStore: any[];
    private h: IHyperScript<T>;
    public static isSelfCloseTag(tagName: string): boolean {
        return this.closeRE.test(tagName);
    }

    public static transformAttrToProp<U>(h: IHyperScript<U>): IHyperScript<U> {
        return function(tagName: string, attrs: INodeAttrs, children: U[] ): U {
            for (let attrName of Object.keys(attrs)) {
                if (HyperParser.attrToPropMap.hasOwnProperty(attrName)) {
                    attrs[HyperParser.attrToPropMap[attrName]] = attrs[attrName];
                    delete attrs[attrName];
                }
            }
            return h(tagName, attrs, children);
        };
    }

    constructor(h: IHyperScript<T>) {
        this.h = HyperParser.transformAttrToProp<T>(h);
    }

    public tpl(strings, ...values) {
        let nodesMeta = [];
        this.parseStore = [];
        this.state = ParseState.TEXT;

        for (let i = 0; i < strings.length; i++) {
            let p = this.parseNode(strings[i]);
            if (i < values.length) {
                let val = values[i];
                let defineState = this.state;
                defineState = [ParseState.ATTR_VALUE_DOUBLE_QOUTE, ParseState.ATTR_VALUE_SINGLE_QOUTE, ParseState.ATTR_VALUE_START]
                .indexOf(defineState) >= 0 ? ParseState.ATTR_VALUE : defineState;
                defineState = [ParseState.ATTR].indexOf(defineState) >= 0 ? ParseState.ATTR_KEY : defineState;
                p.push([ParseState.DEFINE, defineState, val]);
            }
            nodesMeta.push.apply(nodesMeta, p);
        }
        logger('parse nodes meta:', nodesMeta.map(nodeMeta => {
            let transformNodeMeta = [ParseState[nodeMeta[0]]];
            for (let i = 1; i < nodeMeta.length; i++) {
                transformNodeMeta[i] = nodeMeta[i];
                transformNodeMeta[i - 1] = ParseState[nodeMeta[i - 1]];
            }
            return transformNodeMeta;
        }));
        return this.parseNodesMeta(nodesMeta);
    }

    private parseNodesMeta(nodesMeta: any[]) {
        let node = { tagName: null, attrs: {}, children: [] },
            stack = [ { node, childrenCount: -1 } ];
        for (let i = 0; i < nodesMeta.length; i++) {
            let current = stack[stack.length - 1]['node'],
                nodeMeta = nodesMeta[i],
                state = nodeMeta[0];


            if (state === ParseState.OPEN && /^\//.test(nodeMeta[1])) {
                let childrenCount = stack[stack.length - 1]['childrenCount'];
            if (stack.length > 1) {
                stack.pop();
                stack[stack.length - 1]['node']['children'][childrenCount] = this.h(
                    current.tagName, current.attrs, current.children.length ? current.children : []
                );
            }
            } else if (state === ParseState.OPEN) {
                let _node = { tagName: nodeMeta[1], attrs: {}, children: [] };
                current.children.push(_node);
                stack.push({ node: _node, childrenCount: current.children.length - 1 });
            } else if (state === ParseState.ATTR_KEY || (state === ParseState.DEFINE && nodeMeta[1] === ParseState.ATTR_KEY)) {
                let key = '', _nodeMeta;
                for (; i < nodesMeta.length; i++) {
                    _nodeMeta = nodesMeta[i];
                    if (_nodeMeta[0] === ParseState.ATTR_KEY) {
                        key = key.concat(_nodeMeta[1]);
                    } else if (_nodeMeta[0] === ParseState.DEFINE && _nodeMeta[1] === ParseState.ATTR_KEY) {
                        if (Object.prototype.toString.call(_nodeMeta[2]) === '[object Object]' && !key) {
                            for (let _key of Object.keys(_nodeMeta[2])) {
                                if (!current.attrs.hasOwnProperty(_key)) {
                                    current.attrs[_key] = _nodeMeta[2][_key];
                                }
                            }
                        } else {
                            key = key.concat(_nodeMeta[2]);
                        }
                    } else {
                        break;
                    }
                }
                if (_nodeMeta[0] === ParseState.ATTR_EQUAL) {
                    i++;
                }

                let j = i;

                for (; i < nodesMeta.length; i++) {
                    _nodeMeta = nodesMeta[i];
                    if (_nodeMeta[0] === ParseState.ATTR_VALUE || _nodeMeta[0] === ParseState.ATTR_KEY) {
                        if (!current.attrs.hasOwnProperty(key)) {
                            current.attrs[key] = _nodeMeta[1];
                        } else {
                            current.attrs[key] = current.attrs[key].concat(_nodeMeta[1]);
                        }
                    } else if (_nodeMeta[0] === ParseState.DEFINE &&
                               [ParseState.ATTR_KEY, ParseState.ATTR_VALUE].indexOf(_nodeMeta[1]) >= 0) {
                        if (!current.attrs.hasOwnProperty(key)) {
                            current.attrs[key] = _nodeMeta[2];
                        } else {
                            current.attrs[key] = current.attrs[key].concat(_nodeMeta[2]);
                        }
                    } else {
                        if (key.length && !current.attrs.hasOwnProperty(key) && i === j &&
                            [ParseState.CLOSE, ParseState.ATTR_BREAK].indexOf(_nodeMeta[0]) >= 0) {
                            current.attrs[key] = key.toLowerCase();
                        }
                        break;
                    }
                }
            } else if (state === ParseState.CLOSE) {
                if (HyperParser.isSelfCloseTag(current.tagName) && stack.length) {
                    let childrenCount = stack[stack.length - 1]['childrenCount'];
                    stack.pop();
                    stack[stack.length - 1]['node']['children'][childrenCount] = this.h(
                        current.tagName, current.attrs, current.children.length ? current.children : []
                    );
                }
            } else if (state === ParseState.DEFINE && nodeMeta[1] === ParseState.TEXT) {
                if (nodeMeta[2] === undefined || nodeMeta[2] === null) {
                    nodeMeta[2] = '';
                } else if (!nodeMeta[2]) {
                    nodeMeta[2] = nodeMeta[2].toString();
                }

                if (Array.isArray(nodeMeta[2][0])) {
                    current.children.push.apply(current.children, nodeMeta[2]);
                } else {
                    current.children.push(nodeMeta[2]);
                }
            } else if (state === ParseState.TEXT) {
                current.children.push(nodeMeta[1]);
            } else if ([ParseState.ATTR_EQUAL, ParseState.ATTR_BREAK].indexOf(state) >= 0) {
                // 无操作, 空白符
            } else {
                throw new Error(`unhandled state: ${state}`);
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
    }

    private flushParseStore() {
        return this.parseStore.splice(0, this.parseStore.length).join('');
    }

    private isInValueStates() {
        return [ParseState.ATTR_VALUE_DOUBLE_QOUTE, ParseState.ATTR_VALUE_SINGLE_QOUTE, ParseState.ATTR_VALUE]
        .indexOf(this.state) >= 0;
    }

    /**
     * 是否为引号中
     *
     * @returns {boolean}
     */
    private isQouteState() {
        return this.state === ParseState.ATTR_VALUE_DOUBLE_QOUTE || this.state === ParseState.ATTR_VALUE_SINGLE_QOUTE;
    }

    /**
     * 是否为配对的引号
     *
     * @param c {string} 当前正在解析的字符
     * @returns {boolean}
     */
    private isPairQoute(c: string) {
        if (c === '"' && this.state === ParseState.ATTR_VALUE_DOUBLE_QOUTE) {
            return true;
        }
        if (c === '\'' && this.state === ParseState.ATTR_VALUE_SINGLE_QOUTE) {
            return true;
        }
        return false;
    }

    private parseNode(str: string) {
        let p = [];

        for (let i = 0; i < str.length; i++) {
            let c = str.charAt(i);
            if (this.state === ParseState.TEXT && c === '<') {
                // 找到节点起始标记
                let parseContent = this.flushParseStore();
                if (parseContent) {
                    p.push([this.state, parseContent]);
                }
                this.state = ParseState.OPEN;
            } else if (c === '>' && !this.isQouteState()) {
                // 找到节点结束标记
                let parseContent = this.flushParseStore();
                if ([ParseState.OPEN, ParseState.ATTR_KEY, ParseState.ATTR_VALUE].indexOf(this.state) >= 0) {
                    p.push([this.state, parseContent]);
                }
                p.push([ParseState.CLOSE]);
                this.state = ParseState.TEXT;
            } else if (this.state === ParseState.TEXT) {
                this.parseStore.push(c);
            } else if (this.state === ParseState.OPEN && /\s/.test(c)) {
                // 在节点未闭合前发现空格，标识为节点属性
                p.push([this.state, this.flushParseStore()]);
                this.state = ParseState.ATTR;
            } else if (this.state === ParseState.OPEN) {
                // 记录节点名称
                this.parseStore.push(c);
            } else if (this.state === ParseState.ATTR && /[\w-]/.test(c)) {
                // 记录节点属性名
                this.parseStore.push(c);
                this.state = ParseState.ATTR_KEY;
            } else if (this.state === ParseState.ATTR && /\s/.test(c)) {
                if (this.parseStore.length) {
                    p.push([ParseState.ATTR_KEY, this.flushParseStore()]);
                }
                p.push([ParseState.ATTR_BREAK]);
            } else if (this.state === ParseState.ATTR_KEY && /\s/.test(c)) {
                p.push([this.state, this.flushParseStore()]);
                this.state = ParseState.ATTR_KEY_END;
            } else if (this.state === ParseState.ATTR_KEY && c === '=') {
                p.push([this.state, this.flushParseStore()], [ParseState.ATTR_EQUAL]);
                this.state = ParseState.ATTR_VALUE_START;
            } else if (this.state === ParseState.ATTR_KEY) {
                this.parseStore.push(c);
            } else if ((this.state === ParseState.ATTR_KEY_END || this.state === ParseState.ATTR) && c === '=') {
                p.push([ParseState.ATTR_EQUAL]);
                this.state = ParseState.ATTR_VALUE_START;
            } else if ((this.state === ParseState.ATTR_KEY_END || this.state === ParseState.ATTR) && /\S/.test(c)) {
                p.push([ParseState.ATTR_BREAK]);
                if (/[\w-]/.test(c)) {
                    this.parseStore.push(c);
                    this.state = ParseState.ATTR_KEY;
                } else {
                    this.state = ParseState.ATTR;
                }
            } else if (this.state === ParseState.ATTR_VALUE_START && c === '"') {
                this.state = ParseState.ATTR_VALUE_DOUBLE_QOUTE;
            } else if (this.state === ParseState.ATTR_VALUE_START && c === '\'') {
                this.state = ParseState.ATTR_VALUE_SINGLE_QOUTE;
            } else if (this.isPairQoute(c)) {
                p.push([ParseState.ATTR_VALUE, this.flushParseStore()], [ParseState.ATTR_BREAK]);
                this.state = ParseState.ATTR;
            } else if (this.state === ParseState.ATTR_VALUE_START && /\S/.test(c)) {
                this.state = ParseState.ATTR_VALUE;
            } else if (this.state === ParseState.ATTR_VALUE_START && /\S/.test(c)) {
                p.push([ParseState.ATTR_VALUE, this.flushParseStore()], [ParseState.ATTR_BREAK]);
                this.state = ParseState.ATTR;
            } else if (this.isInValueStates()) {
                this.parseStore.push(c);
            }
        }
        if (this.state === ParseState.TEXT && this.parseStore.length) {
            p.push([this.state, this.flushParseStore()]);
        } else if (this.isInValueStates() && this.parseStore.length) {
            p.push([ParseState.ATTR_VALUE, this.flushParseStore()]);
        } else if (this.state === ParseState.ATTR_KEY && this.parseStore.length) {
            p.push([this.state, this.flushParseStore()]);
        }
        return p;
    }
}

export const hp = <T>(h: IHyperScript<T>): Function => {
    let hp = new HyperParser<T>(h);
    return hp.tpl.bind(hp);
};

