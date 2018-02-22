import { observable, computed } from "mobx";


export default class GroceryStore {
	@observable groceries = [];

	add(g) {
		this.groceries.push(g);
	}
}