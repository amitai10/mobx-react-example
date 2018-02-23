import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './App.css';
import Grocery from './grocery.component';

@inject("groceryStore")
@observer
class GroceriesList extends Component {
 
  render() {
    return (
    <div className="list">
        {this.props.groceryStore.groceries.map((g,index) =>  <Grocery key={index} name={g}/> )}
    </div>
    );
  }
}

export default GroceriesList;
