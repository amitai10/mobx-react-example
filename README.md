# MobX with React Introduction

MobX is a simple state management solution, that can be uses very easelly for ReactJS.  
ReactJS is a render a JavaScript library for building user interfaces, but it doesn’t have a built in state management or two way binding like Angular (In version 16.3 it has changed by introducing the new Context API).

In the last couple of years Redux has established itself as the go to solution for state management.

In this blog post I will introduce MobX which is a much easier and cleaner alternative to Redux. I will not compare the two, but MobX is also very common and can be used without hesitation.

## MobX principals:
Actions -> State -> Derivations + Reactions 
- State - the state of the application (similar to Redux’s store).
- Derivations -  Value that can be computed automatically from the state.
- Reactions - automatically to perform some task like changing the DOM when the state changes.
- Actions - functions that changes the state.

Mobx-react - A library that binds mobx with react. 

## MobX decorators
Mobx (and mobx-react)  can be used with regular JS functions or with decorators. Decorators makes a much cleaner solution so I will use them in this post. 
Mobx decorators:
- __@observable__ - turn property into an observable, observers will be notified and react to changes on those properties. The properties types can be objects, arrays or references.
- __@computed__ - values that will be derived automatically when relevant data is modified.
- __@observer__ (mobx-react) - make react component reactive to state change. Basically it calls the component’s render function when the state changes.
- __@action__ - method that changes the state.
- __Provider__ and __@inject__ - inject the store to the component (like connect in Redux). 

## MobX + React example
In this section I will demonstrate how to use mobx with react. I will create a grocery application that allows to add or remove groceries from a list and count their total.

I will use create-react-app for bootstrapping the application. And then add mobx and mobx-react
```
npx create-react-app groceries
cd groceries
npm -i --save mobx mobx-react
npm run eject
npm install --save-dev babel-plugin-transform-decorators-legacy babel-plugin-transform-class-properties
```
I eject the create-react-app in order to use decorators (create-react-app doesn’t support decorators).  
First I will create the store of the groceries:
```js
// groceries.store.js
import { observable, computed, action } from "mobx";


export default class GroceryStore {
	@observable groceries = [];

	@action
	add(g) {
		this.groceries.push(g);
	}

	@action
	delete(name) {
		this.groceries.remove(name)
	}

	@computed 
	get numOfGroceries() {
		return this.groceries.length;
	}
}

```
The store has one observable (groceries), two actions (add and delete) and one computed (numOfGroceries).

The application UI has two parts: add component to add grocery and the list of groceries.
```js
// App.js

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
```
I create the groceryStore and use provide to transfer it to the children.

The add component:
```js
// add.component.js

import React, { Component } from 'react';
import { inject } from 'mobx-react';


import './App.css';

@inject("groceryStore")
class Add extends Component {
  constructor(props) {
    super();
    this.state = {
      inputValue: ''
    }
  }

  updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
  }

  add = () => {
    this.props.groceryStore.add(this.state.inputValue)
    this.setState({
      inputValue: ''
    });
  }
  render() {
    return (
      <div className="App">
        <div className="add-grocery">
          <input placeholder="Add new" type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
          <button onClick={this.add}>Add</button>
        </div>
      </div>
    );
  }
}

export default Add;

```

The Add component uses mobx store to perform an action (add). I use @inject in order to provide it to the component.

The groceries list:
```js
// groceriesList.component.js

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import './App.css';
import Grocery from './grocery.component';

@inject("groceryStore")
@observer
class GroceriesList extends Component {
	    
  render() {
    const store = this.props.groceryStore;
    return (
        <div>
            <h2>Total: {store.numOfGroceries}</h2>
            <div className="list">
                {store.groceries.map((g,index) =>  <Grocery key={index} name={g}/> )}
            </div>
        </div>
    
    );
  }
}

export default GroceriesList;
```
Here we use the _@observer_ decorator for the first time, we would like the component to re-render when the state has changed.

The grocery component:
```js
// grocery.component.js

import React, { Component } from 'react';
import { inject } from 'mobx-react';

import './App.css';

@inject("groceryStore")
class Grocery extends Component {

 delete = () => {
    this.props.groceryStore.delete(this.props.name)
 }
  render() {
    return (
        <li className="grocery" onClick={this.delete} key={this.props.index}>{this.props.name}</li>
    );
  }
}

export default Grocery;
```
Again, we inject the store and use the delete action.

That’s it!

## Conclusion
MobX is very elegant, although it is not a flux implementation, it let’s you work with react without any boilerplate code like actions, reducers,  middlewares… 

Give it a try!

## References
- https://mobx.js.org/
- https://mobx.js.org/getting-started.html
- https://github.com/mobxjs/mobx-react
- https://github.com/mobxjs/mobx













