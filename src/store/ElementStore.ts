import { action, observable, makeAutoObservable } from 'mobx';

import { v4 as uuidv4 } from 'uuid';
import { TaskExecMode, TaskStatus, TaskStatusDescr } from 'common/TaskInterfaces';

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
    @observable execMode: TaskExecMode;
    @observable status: TaskStatus;
    @observable color: string;

    constructor(title: string, index: number, parentGuid?: string) {
        this.index = index;
        this.title = title;
        this.execMode = 'C';
        this.status = 'W';
        this.color = TaskStatusDescr[this.status].color;
        this.completed = false;
        this.parentGuid = parentGuid;

        makeAutoObservable(this);

        // if (parentGuid) this.addCalcStatusTask();
    }

    @action setValue = (newVal: string) => {
        this.value = Number(newVal);

        this.addReCalcTask();
        this.addBalanceTask(Number(newVal));
    };

    @action setStatus = (newStatus: TaskStatus, auto?: boolean) => {
        const oldStatus = this.status;
        let allowed: boolean = false;

        const parent: ElementStore | undefined = ElementTreeStore.getElement(this.parentGuid || '');

        const children: ElementStore[] = [];
        this.childStore?.forEach((guid: string) => {
            const el = ElementTreeStore.getElement(guid);
            el && children.push(el);
        });

        const sisters: ElementStore[] = [];
        parent?.childStore.forEach((guid: string) => {
            const el = ElementTreeStore.getElement(guid);
            el && sisters.push(el);
        });

        if (auto) {
            allowed = true;
        } else {
            switch (oldStatus) {
                case 'W':
                    if (newStatus === 'R' && !parent) {
                        allowed = true;
                    }
                    if (newStatus === 'C') {
                        allowed = true;
                    }
                    break;
                case 'R':
                    if (newStatus === 'S') {
                        allowed = true;
                    }
                    if (newStatus === 'C') {
                        allowed = true;
                    }
                    break;
                case 'S':
                    if (newStatus === 'F') {
                        let isChildrenFinished = true;
                        children.forEach(child => {
                            if (!['F', 'C'].includes(child.status)) isChildrenFinished = false;
                        });
                        allowed = isChildrenFinished;
                    }
                    if (newStatus === 'C' || newStatus === 'I') {
                        allowed = true;
                    }
                    break;
                case 'I':
                    if (newStatus === 'S') {
                        allowed = true;
                    }
                    if (newStatus === 'C') {
                        allowed = true;
                    }
                    break;
            }
        }

        if (allowed) {
            this.status = newStatus;
            this.color = TaskStatusDescr[newStatus].color;

            if (newStatus === 'S') {
                for (let i = 0; i < children.length; i++) {
                    if (children[i].status === 'W') {
                        children[i].setStatus('R', true);
                        break;
                    }
                }
            }

            if (newStatus === 'F' || newStatus === 'C') {
                parent?.setStatus('F', false);
                for (let i = 0; i < sisters.length; i++) {
                    if (sisters[i].status === 'W') {
                        sisters[i].setStatus('R', true);
                        break;
                    }
                }
            }
        }

        // this.addCalcStatusTask();
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

        // this.setStatus(this.getChildrenCompleted());
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
        // this.setStatus(this.getChildrenCompleted());
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
