import { action, observable, makeAutoObservable } from 'mobx';

import { v4 as uuidv4 } from 'uuid';

import ElementTreeStore from './ElementTreeStore';
import TaskStore from './TaskStore';

class ElementStore {
    private guid = uuidv4();

    public index: number;
    public title: string;

    @observable parentGuid?: string;
    @observable childStore: string[] = [];
    @observable value = 0;
    @observable completed = false;
    @observable color = '#119507';

    constructor(title: string, index: number, parentGuid?: string) {
        this.index = index;
        this.title = title;
        this.parentGuid = parentGuid;

        makeAutoObservable(this);

        if (parentGuid) this.addCalcStatusTask();
    }

    @action setValue = (newVal: string) => {
        this.value = Number(newVal);

        this.addReCalcTask();
    };

    @action setStatus = (completed: boolean) => {
        this.completed = completed;
        this.color = completed ? '#1f52c1' : '#119507';
        this.addCalcStatusTask();
    };

    @action addChild = (title?: string) => {
        const childGuid = ElementTreeStore.addElement(this.guid, title);

        const tmpChildList = [...this.childStore];
        tmpChildList.push(childGuid);

        this.childStore = tmpChildList;
    };

    @action removeCurrent = () => {
        this.addRemoveTask();
    };

    @action removeChild = (rmGuid: string) => {
        const tmpChildList = [...this.childStore];

        this.childStore = tmpChildList.filter(guid => guid !== rmGuid);

        this.setStatus(this.getChildrenCompleted());
    };

    @action addElement = (title: string) => {
        this.addNewChildTask(title);
    };

    @action reCalcValue = () => {
        this.value =
            this.childStore
                .map(guid => ElementTreeStore.getElement(guid)?.value || 0)
                .reduce((sum, value) => sum + value, 0) || 0;
        this.addReCalcTask();
    };

    @action calcStatus = () => {
        this.setStatus(this.getChildrenCompleted());
    };

    @action setColor = (color: string) => {
        this.color = color;
    };

    getGuid = () => this.guid;

    getChildrenExists = () => !!this.childStore.length;

    getChildrenCompleted = (): boolean => {
        if (!this.childStore.length) return this.completed;

        return this.childStore
            .map(guid => !!ElementTreeStore.getElement(guid)?.completed)
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

    addCalcStatusTask = () => {
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
