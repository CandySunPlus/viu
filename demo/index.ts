import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css';
import { classList } from '../src/utils';
import { Container } from '../src/container';
import { ITodoItem, TodoList } from './list';
import v from '../src/v';

enum FilterType {
    ALL,
    COMPLETED,
    ACTIVE
};

interface ITodoData {
    list: ITodoItem[];
    name: string;
    filter: FilterType;
}

class App extends Container<ITodoData> {
    protected reducers = {
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
        EDIT: (action) => {
            let list = this.data.list;
            list[action.index].editing = true;
            this.setData('list', list);
        },
        CANCEL_EDIT: (action) => {
            let list = this.data.list;
            list[action.index].editing = false;
            this.setData('list', list);
        },
        UPDATE: (action) => {
            let list = this.data.list;
            list[action.index].editing = false;
            list[action.index].title = action.title;
            this.setData('list', list);
        },
        FILTER: (action) => {
            this.setData('filter', action.filter);
        },
        CLEAR_COMPLETED: () => {
            let list = this.data.list.filter(item => !item.checked);
            this.setData('list', list);
        }
    };

    private listCmp: TodoList;
    public constructor(initData: ITodoData) {
        super(initData);
        this.listCmp = this.createComponent(TodoList);
    }

    public render()  {
        return v `
        <section class="todoapp">
        <header class="header">
        <h1>todos</h1>
        <input class="new-todo" autofocus
        placeholder="What needs to be done"
        value="${this.data.name}" type="text" oninput=${this.oninput} onkeydown=${this.insert} />
        </header>
        <section class="main">
        <input class="toggle-all" ${this.filtedTodos(FilterType.ACTIVE).length === 0 ? 'checked' : ''}
            onchange=${this.toggleAll} type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        ${this.listCmp.render(this.data.list)}
        </section>
        <footer class="footer">
        <span class="todo-count"><strong>${this.filtedTodos(FilterType.ACTIVE).length}</strong> item left</span>
        <ul class="filters">
            <li><a class="${this.isFilter(FilterType.ALL) ? 'selected' : ''}"
                onclick=${this.filter(FilterType.ALL)} href="#">All</a></li>
            <li><a class="${this.isFilter(FilterType.ACTIVE) ? 'selected' : ''}"
                onclick=${this.filter(FilterType.ACTIVE)} href="#">Active</a></li>
            <li><a class="${this.isFilter(FilterType.COMPLETED) ? 'selected' : ''}"
                onclick=${this.filter(FilterType.COMPLETED)} href="#">Completed</a></li>
        </ul>
        <button class="clear-completed" onclick=${this.clearCompleted}>Clear completed</button>
        </footer>
        </section>
        `;
    }

    private clearCompleted = () => {
        this.send('CLEAR_COMPLETED');
    }

    private isFilter(filter: FilterType): boolean {
        return this.data.filter === filter;
    }

    private toggleAll = (evt: Event) => {
        let el = <HTMLInputElement>evt.currentTarget;
        this.send('TOGGLE_ALL', { checked: el.checked });
    }

    private filtedTodos(filter?: FilterType): any[] {
        filter = filter ? filter : this.data.filter;
        return this.data.list.filter(item => {
            if (filter === FilterType.ALL) {
                return true;
            } else if (filter === FilterType.ACTIVE) {
                return !item.checked;
            } else if (filter === FilterType.COMPLETED) {
                return item.checked;
            }
        });
    }

    private insert = (evt: KeyboardEvent) => {
        if (this.data.name && evt.keyCode === 13) {
            this.send('INSERT', {
                item: {
                    title: this.data.name,
                    editing: false,
                    checked: false
                }
            });
        }
    }

    private oninput = (evt) => {
        this.send('INPUTNEW', { name: evt.currentTarget.value });
    }


    private filter = (filter: FilterType) => {
        return () => {
            this.send('FILTER', { filter });
        };
    }
}


const initData = {
    list: [{
        title: '这是一条已完成的',
        editing: false,
        checked: true
    }],
    name: '',
    filter: FilterType.ALL
};

const app = new App(initData);
app.mountTo(document.querySelector('.app-container'));
