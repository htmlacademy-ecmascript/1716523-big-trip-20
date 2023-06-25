

import AbstractView from '../framework/view/abstract-view';

function createFilterItem(filter, currentFilterType) {
  return `  <div class="trip-filters__filter">
  <input
  id="filter-${filter.type}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  value="${filter.type}"
  ${filter.type === currentFilterType ? 'checked' : ''}
  ${(filter.count !== 0) ? '' : 'disabled'}
  >
  <label
  class="trip-filters__filter-label"
  for="filter-${filter.type}">${filter.type}
  </label>
</div>`;
}

function createFilterItemTemplate(filters) {
  return `
  <form class="trip-filters" action="#" method="get">
  ${filters.map(createFilterItem).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
}


export default class HeaderFiltersView extends AbstractView {
  #filters;
  #onFilterChange = null;
  #currentFilterType = null;

  constructor({filters, currentFilterType, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#changeFilterHandler);
  }

  get template() {
    return createFilterItemTemplate(this.#filters);
  }

  #changeFilterHandler = (evt) => {
    evt.preventDefault();
    this.#onFilterChange(evt.target.value);
  };
}
