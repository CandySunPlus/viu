interface ISend {
    (actionType: string, action: any): void;
}

export abstract class Component {
    constructor(protected send: ISend) { }
    public abstract render(...data): void;
}
