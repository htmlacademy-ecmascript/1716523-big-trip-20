import Observable from '../framework/observable.js';
import { filterType } from '../utils.js';

export default class FilterModel extends Observable {
  #filter = filterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
