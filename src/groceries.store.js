import { observable, computed } from "mobx";


export default class GroceryStore {
	@observable groceries = [];

	add(g) {
		this.groceries.push(g);
	}

	delete(name) {
		this.groceries.remove(name)
	}

	@computed 
	get numOfGroceries() {
		return this.groceries.length;
	}
}