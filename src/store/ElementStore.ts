import { action, observable, makeAutoObservable } from 'mobx';

import { v4 as uuidv4 } from 'uuid';

import ElementTreeStore from './ElementTreeStore';
import TaskStore from './TaskStore';
import Task from '../Task';

class ElementStore {
    private guid = uuidv4();

    public index: number;
    public title: string;

    @observable parentStore?: ElementStore;
    @observable childStore: ElementStore[] = [];
    @observable value?: number;
    @observable sum = 0;
    @observable color = 'grey';

    constructor(title: string, index: number, parentStore?: ElementStore) {
        this.index = index;
        this.title = title;
        this.parentStore = parentStore;

        makeAutoObservable(this);
    }

    @action setValue = (newVal: string) => {
        this.value = Number(newVal);

        this.addReCalcTask();
    };

    @action addChild = (title?: string) => {
        const index = ElementTreeStore.getIndex();
        const child = new ElementStore(title || `item-${index}`, index, this);

        const tmpChildList = [...this.childStore];
        tmpChildList.push(child);

        ElementTreeStore.addElement(child);

        this.childStore = tmpChildList;
    };

    @action removeCurrent = () => {
        this.addRemoveTask();
    };

    @action removeChild = (rmGuid: string) => {
        const tmpChildList = [...this.childStore];

        this.childStore = tmpChildList.filter(store => store.getGuid() !== rmGuid);
    };

    @action addElement = (title: string) => {
        this.addNewChildTask(title);
    };

    @action reCalcValue = () => {
        this.sum =
            this.childStore
                .map(store => (store.value || 0) + store.sum)
                .reduce((sum, value) => (sum || 0) + (value || 0)) || 0;
        this.addReCalcTask();
    };

    @action setColor = (color: string) => {
        this.color = color;
    };

    getGuid = () => this.guid;

    addTask = (method: string, context?: any) => {
        if (this.parentStore) {
            const task = new Task(
                this.parentStore.title,
                this.parentStore.getGuid(),
                method,
                this.title,
                context
            );
            TaskStore.addTask(task);
        }
    };

    addReCalcTask = () => {
        this.addTask('reCalcValue');
    };

    addNewChildTask = (title: string) => {
        this.addTask('addChild', title);
    };

    addRemoveTask = () => {
        this.addTask('removeChild', this.guid);
        this.addTask('reCalcValue');
    };
}

export default ElementStore;
