import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './App.css';
import Add from './add.component';

@inject("groceryStore")
@observer
class App extends Component {
 
  render() {
    return (
      <div className="App">
      <Add />
        <div className="list">
          {this.props.groceryStore.groceries.map((g,index) =>  <li key={index}>{g}</li> )}
        </div>
      </div>
    );
  }
}

export default App;
