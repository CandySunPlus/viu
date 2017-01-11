import v from './v';
import diffNode from './diff-element';

function diff(newEl: Element, oldEl: Element) {
    diffNode(oldEl, newEl);
}

class List {
    constructor(private list: any[]) {}
    public render() {
        return v`
        <ul>
            ${this.list.map(item => v`<li>
            <input type="checkbox" ${item.checked ? 'checked' : ''} name="">
            <span style="${item.checked ? 'text-decoration: line-through; color: #ccc' : ''}">${item.title}</span>
        </li>`)}
        </ul>
        `;
    }

    public update(list: any[]) {
        this.list = list;
    }
}

class App {
    private list = [ {
        title: '这是一条已完成的',
        checked: true
    }];
    private newC = 'new-class';
    private inputTxt = '';
    private el: Element;
    private listCmp: List;

    constructor() {
        this.listCmp = new List(this.list);
    }

    public insert = () => {
        if (this.inputTxt) {
            this.list.push({
                title: this.inputTxt,
                checked: false
            });
            this.inputTxt = '';
            this.listCmp.update(this.list);
            this.newC = 'other-class';
            let newEl = this.render();
            // @todo: use dom diff
            diff(newEl, this.el);
        }
    }

    public oninput = (evt) => {
        this.inputTxt = evt.currentTarget.value;
        let newEl = this.render();
        // @todo: use dom diff
        diff(newEl, this.el);
    }

    public render() {
        return v`
        <div class="panel">
        <h1 class="panel-title ${this.newC}">TodoList</h1>
        <div class="panel-content">
        ${this.listCmp.render()}
        </div>
        <input value="${this.inputTxt}" type="text" oninput=${this.oninput} />
        <button onclick=${this.insert}>添加</button>
        <br />
        ${this.inputTxt}
        </div>
        `;
    }

    public mount(container: Element) {
        this.el = this.render();
        container.appendChild(this.el);
    }
}

const app = new App();
app.mount(document.querySelector('.app'));
