
import {render, replace, remove} from './framework/render.js';
import HeaderFiltersView from './view/header-form-view.js';
import {filter, filterType} from './utils.js';
import { UpdateType} from './const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.getPoints();

    return Object.values(filterType).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new HeaderFiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (type) => {
    if (this.#filterModel.filter === type) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, type);
  };
}
