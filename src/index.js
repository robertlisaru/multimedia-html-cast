import './index.css';

import { createRoot } from 'react-dom/client';

const App = () => {
    return (<div>
        <p>Hello mars</p>
    </div>);
};

const root = createRoot(document.getElementById('app'));
root.render(<App></App>);
