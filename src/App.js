import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './App.css';
import Add from './add.component';
import GroceriesList from './groceriesList.component';

@inject("groceryStore")
@observer
class App extends Component {
 
  render() {
    return (
      <div className="App">
        <Add />
        <GroceriesList />
      </div>
    );
  }
}

export default App;
