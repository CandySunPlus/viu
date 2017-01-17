import { Component } from '../src/component';
import { classList } from '../src/utils';
import v from '../src/v';

export interface ITodoItem {
    title: string;
    editing: boolean;
    checked: boolean;
}

export class TodoList extends Component {
    public render(list: ITodoItem[]) {
        return v`
        <ul class="todo-list">
            ${list.map((item, index) => v`<li class="${classList({ completed: item.checked, editing: item.editing })}">
            <div class="view">
            <input type="checkbox" class="toggle" ${item.checked ? 'checked' : ''} onchange=${this.toggleItem(index)} />
            <label ondblclick=${() => this.send('EDIT', { index })}>${item.title}</label>
            <button class="destroy" onclick=${this.destory(index)}></button>
            </div>
            <input class="edit"
                type="text" value="${item.title}"
                onkeydown=${this.update(index)} onblur=${this.update(index)} />
        </li>`)}
        </ul>
        `;
    }

    private update(index) {
        return (evt: Event) => {
            let target = <HTMLInputElement>evt.currentTarget;
            if (evt.type === 'keydown') {
                let keyBoardEvt = <KeyboardEvent> evt;
                if (keyBoardEvt.keyCode === 13 && target.value) {
                    this.send('UPDATE', { index,  title: target.value});
                } else if (keyBoardEvt.keyCode === 27) {
                    this.send('CANCEL_EDIT', { index });
                }
            } else if (evt.type === 'blur') {
                this.send('UPDATE', { index,  title: target.value});
            }
        };
    }

    private destory = (index) => {
        return () => {
            this.send('DESTORY', { index });
        };
    }

    private toggleItem = (index) => {
        return () => {
            this.send('TOGGLE', { index });
        };
    }
}

