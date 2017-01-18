import { Component } from '../src/component';
import { classList } from '../src/utils';
import v from '../src/v';

export interface ITodoItem {
    title: string;
    editing: boolean;
    checked: boolean;
}

export class TodoList extends Component {
    private editInputs: HTMLInputElement[] = [];
    public render(list: ITodoItem[]) {
        return v`
        <ul class="todo-list">
            ${list.map((item, index) => v`<li class="${classList({ completed: item.checked, editing: item.editing })}">
            <div class="view">
            <input type="checkbox" class="toggle" ${item.checked ? 'checked' : ''} onchange=${this.toggleItem(index)} />
            <label ondblclick=${this.toggleEditState(index)}>${item.title}</label>
            <button class="destroy" onclick=${this.destory(index)}></button>
            </div>
            <input class="edit"
                ref=${input => this.editInputs[index] = input}
                type="text" value="${item.title}"
                onkeydown=${this.update(index)} onblur=${this.update(index)} />
        </li>`)}
        </ul>
        `;
    }

    private toggleEditState(index) {
        return (e: Event) => {
            this.send('EDIT', { index });
            this.editInputs[index].focus();
            let valLen = this.editInputs[index].value.length;
            this.editInputs[index].setSelectionRange(valLen, valLen);
        };
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

