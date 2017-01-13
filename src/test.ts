import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css';
import v from './v';
import diffNode from './diff-element';

interface IAPP {
    send: (actionType: string, action: any) => void;
}

class List {
    constructor(private app: IAPP) { }
    public render(list: any[]) {
        return v`
        <ul class="todo-list">
            ${list.map((item, index) => v`<li class="${item.checked ? 'completed' : ''}">
            <div class="view">
            <input type="checkbox" class="toggle" ${item.checked ? 'checked' : ''} onchange=${this.toggleItem(index)} />
            <label>${item.title}</label>
            <button class="destroy" onclick=${this.destory(index)}></button>
            </div>
            <input class="edit" type="text" value="what">
        </li>`)}
        </ul>
        `;
    }

    private destory = (index) => {
        return () => {
            this.app.send('DESTORY', { index });
        };
    }

    private toggleItem = (index) => {
        return () => {
            this.app.send('TOGGLE', { index });
        };
    }
}

class App implements IAPP {
    private data = {
        list: [{
            title: '这是一条已完成的',
            checked: true
        }],
        name: '',
        filter: 'ALL'
    };
    private el: Element;
    private listCmp: List;

    private reducers = {
        TOGGLE: (action) => {
            let list = this.data.list;
            list[action.index].checked = !list[action.index].checked;
            this.setData('list', list);
        },
        TOGGLE_ALL: (action) => {
            let list = this.data.list.map(item => {
                item.checked = action.checked;
                return item;
            });
            this.setData('list', list);
        },
        INPUTNEW: (action) => {
            this.setData('name', action.name);
        },
        DESTORY: (action) => {
            let list = this.data.list;
            list.splice(action.index, 1);
            this.setData('list', list);
        },
        INSERT: (action) => {
            let list = this.data.list;
            list.push(action.item);
            this.setData('list', list);
            this.setData('name', '');
        },
        FILTER: (action) => {
            this.setData('filter', action.filter);
        },
        CLEAR_COMPLETED: () => {
            let list = this.data.list.filter(item => !item.checked);
            this.setData('list', list);
        }
    };

    constructor() {
        this.listCmp = new List(this);
    }

    public send(actionType: string, action?: any) {
        this.reducers[actionType].call(this, action);
    }

    public render() {
        return v`
        <section class="todoapp">
        <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus
        placeholder="What needs to be done"
        value="${this.data.name}" type="text" oninput=${this.oninput} onkeydown=${this.insert} />
        </header>
        <section class="main">
        <input class="toggle-all" ${this.filtedTodos('ACTIVE').length === 0 ? 'checked' : ''}  onchange=${this.toggleAll} type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        ${this.listCmp.render(this.filtedTodos())}
        </section>
        <footer class="footer">
        <span class="todo-count"><strong>${this.filtedTodos('ACTIVE').length}</strong> item left</span>
        <ul class="filters">
            <li><a class="${this.isFilter('ALL') ? 'selected' : ''}" onclick=${this.filter('ALL')} href="#">All</a></li>
            <li><a class="${this.isFilter('ACTIVE') ? 'selected' : ''}" onclick=${this.filter('ACTIVE')} href="#">Active</a></li>
            <li><a class="${this.isFilter('COMPLETED') ? 'selected' : ''}" onclick=${this.filter('COMPLETED')} href="#">Completed</a></li>
        </ul>
        <button class="clear-completed" onclick=${this.clearCompleted}>Clear completed</button>
        </footer>
        </section>
        `;
    }

    public mount(container: Element) {
        this.el = this.render();
        container.appendChild(this.el);
    }

    private clearCompleted = () => {
        this.send('CLEAR_COMPLETED');
    }

    private isFilter(filter: string): boolean {
        return this.data.filter === filter;
    }

    private toggleAll = (evt: Event) => {
        let el = <HTMLInputElement>evt.currentTarget;
        this.send('TOGGLE_ALL', { checked: el.checked });
    }

    private filtedTodos(filter?: string): any[] {
        filter = filter ? filter : this.data.filter;
        return this.data.list.filter(item => {
            if (filter === 'ALL') {
                return true;
            } else if (filter === 'ACTIVE') {
                return !item.checked;
            } else if (filter === 'COMPLETED') {
                return item.checked;
            }
        });
    }

    private insert = (evt: KeyboardEvent) => {
        if (this.data.name && evt.keyCode === 13) {
            this.send('INSERT', {
                item: {
                    title: this.data.name,
                    checked: false
                }
            });
        }
    }

    private oninput = (evt) => {
        this.send('INPUTNEW', { name: evt.currentTarget.value });
    }


    private filter = (filter: string) => {
        return () => {
            this.send('FILTER', { filter });
        };
    }

    private setData(key: string, value: any) {
        this.data[key] = value;
        let newEl = this.render();
        diffNode(this.el, newEl);
    }
}

const app = new App();
app.mount(document.querySelector('.app-container'));
