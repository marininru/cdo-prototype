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
        this.addBalanceTask(Number(newVal));
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

        if (this.childStore.length === 1) this.addBalanceTask(this.value);
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

    @action balanceValue = ({ value, sum }: { value: number; sum: number }) => {
        this.value = value - sum + this.value;

        this.addBalanceTask(this.value);
    };

    @action calcStatus = () => {
        this.setStatus(this.getChildrenCompleted());
    };

    @action setColor = (color: string) => {
        this.color = color;
    };

    getGuid = () => this.guid;

    getChildrenExists = () => !!this.childStore.length;

    getChildrenSum = () =>
        this.childStore
            .map(guid => ElementTreeStore.getElement(guid)?.value || 0)
            .reduce((sum, value) => sum + value, 0) || 0;

    getChildrenCompleted = (): boolean => {
        if (!this.childStore.length) return this.completed;

        return this.childStore
            .map(guid => !!ElementTreeStore.getElement(guid)?.completed)
            .reduce((result, completed) => result && completed, true);
    };

    addParentTask = (method: string, context?: any) => {
        if (this.parentGuid) {
            TaskStore.addTask(this.parentGuid, method, this.title, context);
        }
    };

    addReCalcTask = () => {
        this.addParentTask('reCalcValue');
    };

    addCalcStatusTask = () => {
        this.addParentTask('calcStatus');
    };

    addNewChildTask = (title: string) => {
        this.addParentTask('addChild', title);
    };

    addRemoveTask = () => {
        this.addParentTask('removeChild', this.guid);
        this.addParentTask('reCalcValue');
    };

    addBalanceTask = (value: number) => {
        const sum = this.getChildrenSum();

        if (sum !== value) {
            const child = this.childStore[0];

            if (child) {
                TaskStore.addTask(this.childStore[0], 'balanceValue', this.title, {
                    value,
                    sum
                });
            }
        }
    };
}

export default ElementStore;
