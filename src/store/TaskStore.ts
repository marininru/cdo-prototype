import { action, makeAutoObservable, observable } from 'mobx';

import moment from 'moment';

import LogStore from './LogStore';

import Task from '../Task';

class TaskStore {
    private count = 0;

    @observable pause = 1000;
    @observable timerID?: any;
    @observable taskQueue: Task[] = [];

    constructor() {
        makeAutoObservable(this);

        this.runTask(this.pause);
    }

    @action shiftTask = () => {
        const taskQueue = [...this.taskQueue];
        const task = taskQueue.shift();

        this.taskQueue = taskQueue;

        return task;
    };

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

    @action setPause = (pause: number) => {
        this.pause = pause;
        clearInterval(this.timerID);
        this.runTask(pause);
    };

    @action runTask = (pause: number) => {
        this.timerID = setInterval(() => {
            const task = this.shiftTask();

            if (task) {
                LogStore.addRecord(
                    `${moment().format('HH:mm:ss')}: Run task #${task.index}: method "${
                        task.method
                    }" for node ${task.name}`
                );
                task.run();
            }
        }, pause);
    };
}

const TaskStoreInstance = new TaskStore();
export default TaskStoreInstance;
