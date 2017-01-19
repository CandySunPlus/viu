export class Query {
    public static rand() {
        let elapsed = Math.random() * 15;
        let query = 'SELECT * FROM table';

        if (Math.random() < 0.2) {
            query = '<IDLE> in transaction';
        }

        if (Math.random() < 0.1) {
            query = 'vacuum';
        }

        return new Query(elapsed, query);
    }
    constructor(public elapsed: number, public query: string) { }
}

export const EMPTY_QUERY = new Query(0.0, '');

export class Database {
    public queries: Query[];
    constructor(public name: string) { 
        this.update();
    }
    public update() {
        this.queries = [];
        let r = Math.floor(Math.random() * 10 + 1);
        for (let j = 0; j < r; j++) {
            this.queries.push(Query.rand());
        }
    }

    public getTopFiveQueries() {
        let qs = this.queries.slice();
        qs.sort((a, b) => a.elapsed - b.elapsed);
        qs = qs.slice(0, 5);
        while (qs.length < 5) {
            qs.push(EMPTY_QUERY);
        }
        return qs;
    }
}

export class DatabaseList {
    public dbs: Database[] = [];
    constructor(n: number) {
        for (let i = 0; i < n; i++) {
            this.dbs.push(new Database(`cluster ${i}`));
            this.dbs.push(new Database(`cluster ${i} slave`));
        }
    }

    public update() {
        for (let i = 0; i < this.dbs.length; i++) {
            this.dbs[i] = new Database(this.dbs[i].name);
        }
    }

    public randomUpdate(r: number) {
        for (let i = 0; i < this.dbs.length; i++) {
            if (Math.random() < r) {
                this.dbs[i] = new Database(this.dbs[i].name);
            }
        }
    }
}
