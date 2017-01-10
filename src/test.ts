import v from './v';

function diff(newEl: Element, oldEl: Element) {
    while (oldEl.firstChild) {
        oldEl.removeChild(oldEl.firstChild);
    }

    while (newEl.firstChild) {
        oldEl.appendChild(newEl.firstChild);
    }
}

class List {
    constructor(private list: string[]) {}
    public render() {
        return v`
        <ul>
            ${this.list.map(item => v`<li>${item}</li>`)}
        </ul>
        `;
    }

    public update(list: string[]) {
        this.list = list;
    }
}

class App {
    private list = [
        'aaaaaaaa',
        'bbbbbbbb',
        'cccccccc'
    ];
    private inputTxt = '';
    private el: Element;
    private listCmp: List;

    constructor() {
        this.listCmp = new List(this.list);
    }

    public insert = () => {
        this.list.push((+new Date()).toString());
        this.listCmp.update(this.list);
        let newEl = this.render();
        // @todo: use dom diff
        diff(newEl, this.el);
    }

    public oninput = (evt) => {
        this.inputTxt = evt.currentTarget.value;
        let newEl = this.render();
        // @todo: use dom diff
        diff(newEl, this.el);
    }

    public render() {
        let newC = 'new-class';
        return v`
        <div class= "panel ${newC}">
        <h1 class="panel-title">This is title</h1>
        <div class="panel-content">
        ${this.listCmp.render()}
        </div>
        ${this.inputTxt}
        <br />
        <input value="${this.inputTxt}" type="text" oninput=${this.oninput} />
        <button onclick=${this.insert} >添加</button>
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
