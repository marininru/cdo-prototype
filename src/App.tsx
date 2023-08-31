import './App.css';

import Element from './components/Element';
import ElementStore from './store/ElementStore';
import ElementTreeStore from './store/ElementTreeStore';

const elementStore = new ElementStore('Root element', 0);

ElementTreeStore.addElement(elementStore);

const App = () => (
    <div className="App">
        <Element root store={elementStore} />
    </div>
);

export default App;
