import { action, makeAutoObservable, observable } from 'mobx';

import ElementStore from './ElementStore';

class ElementTree {
    @observable elementTree: ElementStore[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    @action addElement = (element: ElementStore) => {
        const tmpChildList = [...this.elementTree];
        tmpChildList.push(element);

        this.elementTree = tmpChildList;
    };

    getElement = (guid: string) => this.elementTree.find(element => element.getGuid() === guid);

    getIndex = () => this.elementTree.length;
}

const ElementTreeStore = new ElementTree();
export default ElementTreeStore;
