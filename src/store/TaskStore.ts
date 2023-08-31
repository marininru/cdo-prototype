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
                    `${moment().format('HH:mm:ss')}: Run task ${task.method} for node ${task.name}`
                );
                task.runTask();
            }
        }, 5000);
    }

    @action addTask = (task: Task) => {
        LogStore.addRecord(
            `${moment().format('HH:mm:ss')}: Add task ${task.method} for node ${task.name}`
        );
        const tmpList = [...this.taskQueue];
        tmpList.push(task);

        task.setIndex(this.count);
        this.count = ++this.count;

        this.taskQueue = tmpList;
    };
}

const TaskStoreInstance = new TaskStore();
export default TaskStoreInstance;
