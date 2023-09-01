import ElementTreeStore from '../store/ElementTreeStore';
import ElementStore from '../store/ElementStore';

class Task {
    public index?: number;
    public name?: string;
    public guid: string;
    public method: string;
    public initiator: string;
    public created: Date;
    private readonly context?: any;

    private element?: ElementStore;

    constructor(guid: string, method: string, initiator: string, context?: any) {
        this.guid = guid;
        this.method = method;
        this.initiator = initiator;
        this.created = new Date();
        this.context = context;

        this.element = ElementTreeStore.getElement(this.guid);

        this.name = this.element?.title || 'Unknown node';
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
