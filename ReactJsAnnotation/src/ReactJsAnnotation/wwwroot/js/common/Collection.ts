﻿//A typescript implementation of a generic Collection
class Collection<T> {

	// The underlying array data structure of the collection
	private _items: Array<T> = [];

	// Add an object to the collection
	public Add = (item: T): void => {
		this._items.push(item);
	}

	public AddRange = (items: T[]): void => {
		this._items.push(...items);
	}

	public Any = (expression?: (value?: T, index?: number, list?: T[]) => boolean): boolean => {
		return expression === undefined ? this._items.length > 0 : this._items.some(expression);
	}

	public Clear = (): void => {
		this._items = [];
	}

	public Concat = (second: Collection<T>): Collection<T> => {
		var newConcatArray = this._items.concat(second.ToArray());
		return this.ConvertArrayToCollection(newConcatArray);
	}

	public Contains = (item: T): boolean => {
		return this._items.some(x => x === item);
	}

	// Length of the collection
	public Count = (expression?: (value?: T, index?: number, list?: T[]) => boolean): number => {
		return expression === undefined ? this._items.length : this.Where(expression).Count();
	}

	public Distinct = (): Collection<T> => {
		return this.Where((value: T, index: number, iter: T[]) => iter.indexOf(value) === index);
	}

	// Get a specific item from a collection given it's index
	public ElementAt = (index: number): T => {
		return this._items[index];
	}

	public ElementAtOrDefault = (index: number): T => {
		return this.ElementAt(index) || undefined;
	}


	public First = (expression?: (value?: T, index?: number, list?: T[]) => boolean): T => {
		return expression === undefined ? this._items[0] : this.Where(expression)[0];
	}

	public FirstOrDefault = (expression?: (value?: T, index?: number, list?: T[]) => boolean): T => {
		if (this.Count() <= 0) {
			return undefined;
		}

		const firstWithExpression = this.First(expression);
		return (firstWithExpression === undefined ? undefined : firstWithExpression);
	}

	// Find the index of a given object in a collection
	public IndexOfItem = (obj: T, fromIndex?: number): number => {
		if (fromIndex == null) {
			fromIndex = 0;
		}
		else if (fromIndex < 0) {
			fromIndex = Math.max(0, this._items.length + fromIndex);
		}

		for (var i = fromIndex, j = this._items.length; i < j; i++) {
			if (this._items[i] === obj) {
				return i;
			}
		}
		return -1;
	}

	public Last = (expression?: (value?: T, index?: number, list?: T[]) => boolean): T => {
		const lengthIndex = this._items.length - 1;
		return expression === undefined ? this._items[lengthIndex] : this.Where(expression)[lengthIndex];
	}

	public LastOrDefault = (expression?: (value?: T, index?: number, list?: T[]) => boolean): T => {
		if (this.Count() <= 0) {
			return undefined;
		}

		const lastWithExpression = this.Last(expression);
		return (lastWithExpression === undefined ? undefined : lastWithExpression);
	}

	public OrderBy = (keySelector: (key: T) => any): Collection<T> => {

		let orderArrayComparer:((a: T, b:T) =>any) = this.ComparerForKey(keySelector, false);
		let sortedArray:T[] = this._items.sort(orderArrayComparer);
		return this.ConvertArrayToCollection(sortedArray);
	}

	public OrderByDescending = (keySelector: (key: T) => any): Collection<T> => {

		let orderArrayComparer: ((a: T, b: T) => any) = this.ComparerForKey(keySelector, true);
		let sortedArray: T[] = this._items.sort(orderArrayComparer);
		return this.ConvertArrayToCollection(sortedArray);
	}

	// Delete an object from the collection
	public Remove = (itemIndex: number): void => {
		this._items.splice(itemIndex, 1);
	}

	public Reverse = (): Collection<T> => {

		const reversedArray = this._items.reverse();

		return this.ConvertArrayToCollection(reversedArray);
	}

	public Select = (expression: (value?: T, index?: number, list?: T[]) => any): Collection<any> => {
		var newArrayMapper = this._items.map(expression);
		return this.ConvertArrayToCollection(newArrayMapper);
	}

	public Single = (expression?: (value?: T, index?: number, list?: T[]) => boolean): T | TypeError => {
		if (this.Count() !== -1) {
			throw new TypeError('The collection does not contain exactly one element.');
		}

		return this.First(expression);
	}

	public SingleOrDefault = (expression?: (value?: T, index?: number, list?: T[]) => boolean): T | TypeError => {
		if (this.Count() > 1) {
			throw new TypeError('The collection contains more than one element.');
		}

		return this.Single(expression);
	}

	public Where = (expression?: (value?: T, index?: number, list?: T[]) => boolean): Collection<T> => {
		const filteredArray = this._items.filter(expression);
		return this.ConvertArrayToCollection(filteredArray);
	}

	public ToArray = (): T[] => {
		return this._items;
	}

	public Union = (second: Collection<T>): Collection<T> => {
		return this.Concat(second).Distinct();
	}

	private ConvertArrayToCollection = (arrayItems: T[]): Collection<T> => {

		let newList = new Collection<T>();

		for (var items of arrayItems) {
			newList.Add(items);
		}

		return newList;
	}

	private ComparerForKey = (keySelector: (key: T) => any, descending?: boolean): ((a: T, b: T) => number) => {

		return (a: T, b: T) => {
			return this.Compare(a, b, keySelector, descending);
		};
	}

	private Compare = (a: T, b: T, keySelector: (key: T) => any, descending?: boolean): number => {
		const sortKeyA = keySelector(a);
		const sortKeyB = keySelector(b);
		if (sortKeyA > sortKeyB) {
			return (!descending ? 1 : -1);
		}

		if (sortKeyA < sortKeyB) {
			return (!descending ? -1 : 1);
		}

		return 0;
	}
}