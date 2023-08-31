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

    getIndex = () => this.elementTree.length;
}

const ElementTreeStore = new ElementTree();
export default ElementTreeStore;
