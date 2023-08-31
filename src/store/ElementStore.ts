import { action, observable, makeAutoObservable } from 'mobx';

import { v4 as uuidv4 } from 'uuid';

class ElementStore {
    private guid = uuidv4();

    public index: number;
    public title: string;

    @observable parentStore?: ElementStore;
    @observable childStore: ElementStore[] = [];
    @observable value?: number;
    @observable sum = 0;
    @observable color = 'grey';

    constructor(title: string, index: number, parentStore?: ElementStore) {
        this.index = index;
        this.title = title;
        this.parentStore = parentStore;

        makeAutoObservable(this);
    }

    @action setValue = (newVal: string) => {
        this.value = Number(newVal);
        this.parentStore?.reCalcValue();
    };

    @action addChild = (title?: string) => {
        const index = this.childStore.length;
        const child = new ElementStore(title || `item-${index}`, index, this);

        const tmpChildList = [...this.childStore];
        tmpChildList.push(child);

        this.childStore = tmpChildList;
    };

    @action removeCurrent = () => {
        this.parentStore?.removeChild(this.guid);
    };

    @action removeChild = (rmGuid: string) => {
        const tmpChildList = [...this.childStore];

        this.childStore = tmpChildList.filter(store => store.getGuid() !== rmGuid);
    };

    @action addElement = (title: string) => {
        this.parentStore?.addChild(title);
    };

    @action reCalcValue = () => {
        this.sum =
            this.childStore
                .map(store => (store.value || 0) + store.sum)
                .reduce((sum, value) => (sum || 0) + (value || 0)) || 0;
        this.parentStore?.reCalcValue();
    };

    @action setColor = (color: string) => {
        this.color = color;
    };

    getGuid = () => this.guid;
}

export default ElementStore;
