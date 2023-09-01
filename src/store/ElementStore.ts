import { action, observable, makeAutoObservable } from 'mobx';

import { v4 as uuidv4 } from 'uuid';

import ElementTreeStore from './ElementTreeStore';
import TaskStore from './TaskStore';

class ElementStore {
    private guid = uuidv4();

    public index: number;
    public title: string;

    @observable parentGuid?: string;
    @observable childStore: ElementStore[] = [];
    @observable value = 0;
    @observable completed = false;
    @observable color = '#119507';

    constructor(title: string, index: number, parentGuid?: string) {
        this.index = index;
        this.title = title;
        this.parentGuid = parentGuid;

        makeAutoObservable(this);
    }

    @action setValue = (newVal: string) => {
        this.value = Number(newVal);

        this.addReCalcTask();
    };

    @action setStatus = (completed: boolean) => {
        this.completed = completed;
        this.color = completed ? '#1f52c1' : '#119507';
        this.addCalcStatus();
    };

    @action addChild = (title?: string) => {
        const index = ElementTreeStore.getIndex();
        const child = new ElementStore(title || `item-${index}`, index, this.guid);

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
        this.value =
            this.childStore.map(store => store.value).reduce((sum, value) => sum + value, 0) || 0;
        this.addReCalcTask();
    };

    @action calcStatus = () => {
        this.setStatus(this.getChildrenCompleted());
        this.addReCalcTask();
    };

    @action setColor = (color: string) => {
        this.color = color;
    };

    getGuid = () => this.guid;

    getChildrenExists = () => !!this.childStore.length;

    getChildrenCompleted = (): boolean => {
        if (!this.childStore.length) return this.completed;

        return this.childStore
            .map(child => child.getChildrenCompleted())
            .reduce((result, completed) => result && completed, true);
    };

    addTask = (method: string, context?: any) => {
        if (this.parentGuid) {
            TaskStore.addTask(this.parentGuid, method, this.title, context);
        }
    };

    addReCalcTask = () => {
        this.addTask('reCalcValue');
    };

    addCalcStatus = () => {
        this.addTask('calcStatus');
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
