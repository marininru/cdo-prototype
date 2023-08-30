import './App.css';

import Element from './components/Element';
import ElementStore from './store/ElementStore';

const elementStore = new ElementStore('Root element', 0);

const App = () => (
    <div className="App">
        <Element root store={elementStore} />
    </div>
);

export default App;
