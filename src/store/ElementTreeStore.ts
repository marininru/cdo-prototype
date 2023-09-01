import { action, makeAutoObservable, observable } from 'mobx';

import ElementStore from './ElementStore';

class ElementTree {
    @observable elementTree: ElementStore[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action addElement = (parentGuid?: string, title?: string) => {
        const index = this.getIndex();
        const name = title || `item-${index}`;
        const element = new ElementStore(name, index, parentGuid);

        const tmpChildList = [...this.elementTree];
        tmpChildList.push(element);

        this.elementTree = tmpChildList;

        return element.getGuid();
    };

    @action removeElement = (rmGuid: string) => {
        const tmpList = [...this.elementTree];

        this.elementTree = tmpList.filter(element => element.getGuid() !== rmGuid);
    };

    getElement = (guid: string) => this.elementTree.find(element => element.getGuid() === guid);

    getIndex = () => this.elementTree.length;
}

const ElementTreeStore = new ElementTree();
export default ElementTreeStore;
