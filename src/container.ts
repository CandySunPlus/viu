import diffNode from './diff-element';
import { Component } from './component';

export interface IContainer {
    send: (actionType: string, action: any) => void;
}

export abstract class Container<T> {
    protected reducers: { [actionType: string]: Function };
    private _data: T;
    private el: Element;

    public constructor(initData?: T) {
        if (initData) {
            this._data = initData;
        }
    }

    public abstract render(): Element;

    public send(actionType: string, action?: any) {
        if (this.reducers[actionType]) {
            console.log('action dispatched: ', actionType, action ? action : null);
            this.reducers[actionType].call(this, action);
        } else {
            throw new Error(`cannot find reducer for action: ${actionType}`);
        }
    }

    public createComponent(component: any) {
        return new component(this.send.bind(this));
    }

    public mountTo(el: Element) {
        this.el = this.render();
        el.appendChild(this.el);
    }

    protected setData(key: string, value: any) {
        this._data[key] = value;
        let newEl = this.render();
        diffNode(this.el, newEl);
    }

    get data(): T {
        return JSON.parse(JSON.stringify(this._data));
    }
}
