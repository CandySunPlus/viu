
function update() {
    console.log('update.');
}


interface INodeAttrs {
    [name: string]: any;
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

class HyperParser {
    private state: ParseState;
    private parseStore: any[];
    constructor(private h: ( tagName: string, attrs: INodeAttrs, children: any[] ) => any) {
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
        this.parseNodesMeta(nodesMeta);
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
                for (; i < nodesMeta.length; i ++) {
                    _nodeMeta = nodesMeta[i];
                    if (_nodeMeta[0] === ParseState.ATTR_KEY) {
                        key.concat(key, _nodeMeta[1]);
                    } else if (_nodeMeta[0] === ParseState.DEFINE && _nodeMeta[1] === ParseState.ATTR_KEY) {
                        if (Object.prototype.toString.call(_nodeMeta[2]) === '[object Object]' && !key) {
                            for (let _key of Object.keys(_nodeMeta[2])) {
                                if (!current.attrs.hasOwnProperty(_key)) {
                                    current.attrs[_key] = _nodeMeta[2][_key];
                                }
                            }
                        } else {
                            key.concat(key, _nodeMeta[2]);
                        }
                    } else {
                        break;
                    }
                }
                if (_nodeMeta[0] === ParseState.ATTR_EQUAL) {
                    i ++;
                }
            }
        }
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

    private parseNode(str) {
        let p = [];

        for (let c of str) {
            if (this.state === ParseState.TEXT && c === '<') {
                // 找到节点起始标记
                let parseContent = this.flushParseStore();
                if (this.parseStore.length) {
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
            } else if ((this.state === ParseState.ATTR_KEY_END || this.state === ParseState.ATTR) && /[^\s]/.test(c)) {
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
            } else if (this.state === ParseState.ATTR_VALUE_START && /[^\s]/.test(c)) {
                this.state = ParseState.ATTR_VALUE;
            } else if (this.state === ParseState.ATTR_VALUE_START && /[\s]/.test(c)) {
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

const hp = new HyperParser(function(tagName, attrs, children) {
    console.log(tagName, attrs, children);
    return { tagName, attrs, children };
});

let newC = 'new-class';
let elem = 'elem';

hp.tpl`
<div class="panel ${newC}" opened onclick=${update}>
    <h1 class="panel-title">This is title</h1>
    <br />
    <${elem} />
    <div class="panel-content">
    <span> Next Content </span>
    </div>
</div>
`;

