import { ISend } from './container';
export abstract class Component {
    constructor(protected send: ISend) { }
    public abstract render(...data): void;
    public createComponent<T>(component: { new(send: ISend): T }): T {
        return new component(this.send);
    }
}
