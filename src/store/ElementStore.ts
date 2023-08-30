import { action, observable, makeAutoObservable, set, get } from 'mobx';

class Element {
    @observable elements = {};

    constructor() {
        makeAutoObservable(this);
    }

    @action setElement = (guid: string, element: any) => {
        set(this.elements, { [guid]: element });
    };
}

const ElementStore = new Element();
export default ElementStore;
