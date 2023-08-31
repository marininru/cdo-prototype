import { makeAutoObservable, observable, action } from 'mobx';

class Log {
    @observable log: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action addRecord = (record: string) => {
        const tmpList = [...this.log];
        tmpList.push(record);

        this.log = tmpList;
    };

    @action clear = () => {
        this.log = [];
    };
}

const LogStore = new Log();
export default LogStore;
