import { action, makeAutoObservable, observable } from 'mobx';

import moment from 'moment';

import LogStore from './LogStore';

import Task from '../Task';

class TaskStore {
    private count = 0;

    @observable taskQueue: Task[] = [];

    constructor() {
        makeAutoObservable(this);

        setInterval(() => {
            const task = this.taskQueue.shift();

            if (task) {
                LogStore.addRecord(
                    `${moment().format('HH:mm:ss')}: Run task #${task.index}: method "${
                        task.method
                    }" for node ${task.name}`
                );
                task.runTask();
            }
        }, 2000);
    }

    @action addTask = (guid: string, method: string, initiator: string, context?: any) => {
        const task = new Task(guid, method, initiator, context);

        const tmpList = [...this.taskQueue];
        tmpList.push(task);

        task.setIndex(this.count);

        LogStore.addRecord(
            `${moment().format('HH:mm:ss')}: Add task #${task.index}: method "${
                task.method
            }" for node ${task.name}`
        );

        this.count = ++this.count;

        this.taskQueue = tmpList;
    };
}

const TaskStoreInstance = new TaskStore();
export default TaskStoreInstance;
