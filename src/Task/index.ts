import ElementTreeStore from '../store/ElementTreeStore';

class Task {
    public index?: number;
    public name: string;
    public guid: string;
    public method: string;
    public initiator: string;
    public created: Date;
    private readonly context?: any;

    constructor(name: string, guid: string, method: string, initiator: string, context?: any) {
        this.name = name;
        this.guid = guid;
        this.method = method;
        this.initiator = initiator;
        this.created = new Date();
        this.context = context;
    }

    setIndex = (index: number) => {
        this.index = index;
    };

    runTask = () => {
        const element = ElementTreeStore.getElement(this.guid);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element && element[this.method] && element[this.method](this.context);
    };
}

export default Task;
