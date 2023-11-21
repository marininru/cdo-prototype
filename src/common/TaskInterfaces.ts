export type TaskStatus = 'W' | 'R' | 'S' | 'I' | 'F' | 'C';

export type StatusProps = {
    letter: TaskStatus;
    name: string;
    color: string;
    allowed: TaskStatus[];
};

type TaskStatusObj = Record<TaskStatus, StatusProps>;

export type TaskExecMode = 'P' | 'C';

export const TaskStatusDescr: TaskStatusObj = {
    W: { letter: 'W', name: 'В ожидании', color: 'gray', allowed: ['R', 'C'] },
    R: { letter: 'R', name: 'Можно приступать', color: 'yellow', allowed: ['S', 'C'] },
    S: { letter: 'S', name: 'Начата', color: 'green', allowed: ['F', 'I', 'C'] },
    I: { letter: 'I', name: 'Прервана', color: 'orange', allowed: ['S', 'C'] },
    F: { letter: 'F', name: 'Завершена', color: 'blue', allowed: [] },
    C: { letter: 'C', name: 'Отменена', color: 'red', allowed: [] }
};
