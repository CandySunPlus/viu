import './styles.css';
import * as createElement from '../src/create-element';
import { Container } from '../src/container';
import { Component } from '../src/component';
import { Query, EMPTY_QUERY, Database, DatabaseList } from './data';
import {startFPSMonitor, startMemMonitor, initProfiler, startProfile, endProfile} from 'perf-monitor';


class Popover extends Component {
    public render(query: string) {
        return <div className="popover left">
        <div className="popover-content">{query}</div>
        <div className="arrow"></div>
        </div>;
    }
}

class QueryCmp extends Component {
    private popoverCmp: Popover = this.createComponent(Popover);
    public render(query: Query) {
        return  <td className={this.queryClasses(query.elapsed)}>
        {this.formatElapsed(query.elapsed)}
        {this.popoverCmp.render(query.query)}
        </td>;
    }

    private formatElapsed(v: number) {
        if (!v) {
            return '';
        }

        let str = v.toFixed(2);

        if (v > 60) {
            let minutes = Math.floor(v / 60);
            let comps = (v % 60).toFixed(2).split('.');
            let seconds = comps[0];
            let ms = comps[1];
            str = minutes + ':' + seconds + '.' + ms;
        }
        return str;
    }

    private queryClasses(elapsed: number) {
        if (elapsed >= 10.0) {
            return 'Query elapsed warn_long';
        } else if (elapsed >= 1.0) {
            return 'Query elapsed warn';
        }
        return 'Query elapsed short';
    }
}

class DatabaseCmp extends Component {
    private queryCmp: QueryCmp = this.createComponent(QueryCmp);
    public render(db: Database) {
        let topFiveQueries = db.getTopFiveQueries();
        let count = db.queries.length;

        return <tr>
        <td className="dbname">{db.name}</td>
        <td className="query-count"><span className={this.counterClasses(count)}>{count}</span></td>
        {this.buildQueryRow(topFiveQueries)}
        </tr>;
    }

    private buildQueryRow(queries: Query[]) {
        return queries.map(query => {
            if (query !== EMPTY_QUERY) {
                return this.queryCmp.render(query);
            } else {
                return this.queryCmp.render(EMPTY_QUERY);
            }
        });
    }

    private counterClasses(count: number) {
        if (count >= 20) {
            return 'label label-important';
        } else if (count >= 10) {
            return 'label label-warning';
        }
        return 'label label-success';
    }
}

interface IAppData {
    dbs: Database[];
}

class App extends Container<IAppData> {
    protected reducers = {
        UPDATE: (action) => {
            this.setData('dbs', action.dbs);
        }
    };
    private databaseCmp: DatabaseCmp = this.createComponent(DatabaseCmp);
    private databaseList = new DatabaseList(50);
    public render() {
        return <div>
                <table className="table table-striped latest-data">
                <tbody>{this.data.dbs.map(db => this.databaseCmp.render(db))}</tbody>
                </table>
                </div>;
    }
    public didMounted() {
        startFPSMonitor();
        startMemMonitor();
        initProfiler('data update');
        initProfiler('view update');
        initProfiler('parse and render');
        initProfiler('diff node');
        this.update();
    }

    private update = () => {
        startProfile('data update');
        this.databaseList.randomUpdate(0.5);
        endProfile('data update');
        startProfile('view update');
        this.send('UPDATE', { dbs: this.databaseList.dbs });
        endProfile('view update');
        requestAnimationFrame(this.update);
    }
}

let app = new App({ dbs: [] });
app.mountTo(document.getElementById('dbmon'));
