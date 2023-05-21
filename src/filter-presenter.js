import HeaderFiltersView from './view/header-form-view.js';
import { generateFilters } from './mock/filter-mock.js';
import { render } from './framework/render.js';

export default class FilterPresenter {

  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilters(this.#pointsModel.getPoints());
  }

  init() {
    render(new HeaderFiltersView(this.#filters), this.#container);
  }
}
