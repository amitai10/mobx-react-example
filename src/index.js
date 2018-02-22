import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import GroceryStore from './groceries.store';
import { Provider } from 'mobx-react';

const groceryStore = new GroceryStore();

ReactDOM.render(
    <Provider groceryStore = {groceryStore}>
        <App />
    </Provider>, 
document.getElementById('root'));
registerServiceWorker();
