import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import {  } from 'mobx-react';

import './App.css';
import GroceryStore from './groceries.store';
import Add from './add.component';
import GroceriesList from './groceriesList.component';

const groceryStore = new GroceryStore();

class App extends Component {
 
  render() {
    return (
      <Provider groceryStore = {groceryStore}>
        <div className="App">
          <Add />
          <GroceriesList />
        </div>
      </Provider>
    );
  }
}

export default App;
