
import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

const enabledSortType = {
  [SortType.DAY]: 'true',
  [SortType.EVENT]: 'false',
  [SortType.TIME]: 'true',
  [SortType.PRICE]: 'true',
  [SortType.OFFERS]: 'false',
};

function getSortItem(sortItem) {
  return `
  <div class="trip-sort__item  trip-sort__item--${sortItem.type}">
  <input id="sort-${sortItem.type}"
  class="trip-sort__input
  visually-hidden" type="radio"
  name="trip-sort"
  value="sort-${sortItem.type}"
  ${(sortItem.isChecked) ? 'checked' : ''}
  ${(sortItem.isDisabled) ? 'disabled' : ''}
  >
  <label class="trip-sort__btn"
  for="sort-${sortItem.type}">${sortItem.type}</label>
</div>`;
}

function createSortTemplate({sortMap}) {
  console.log(sortMap, 'bbb');
  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortMap.map((sortItem) => getSortItem(sortItem)).join('')}
  </form>
  `;
}

// function createTripSortTemplate() {
//   return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
//   <div class="trip-sort__item  trip-sort__item--day">
//     <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
//     <label class="trip-sort__btn" for="sort-day">Day</label>
//   </div>

//   <div class="trip-sort__item  trip-sort__item--event">
//     <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
//     <label class="trip-sort__btn" for="sort-event">Event</label>
//   </div>

//   <div class="trip-sort__item  trip-sort__item--time">
//     <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
//     <label class="trip-sort__btn" for="sort-time">Time</label>
//   </div>

//   <div class="trip-sort__item  trip-sort__item--price">
//     <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
//     <label class="trip-sort__btn" for="sort-price">Price</label>
//   </div>

//   <div class="trip-sort__item  trip-sort__item--offer">
//     <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
//     <label class="trip-sort__btn" for="sort-offer">Offers</label>
//   </div>
// </form>`);
// }

export default class TripSortView extends AbstractView {
  #sortMap = null;
  #onSortTypeChange = null;

  constructor({sortType, onSortTypeChange}) {
    super();
    this.#sortMap = Object.values(SortType).map((type) => ({
      type,
      isChecked: (type === sortType),
      isDisabled: !enabledSortType[type]
    }));

    this.#onSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    // return createTripSortTemplate();
    console.log({sortMap: this.#sortMap}, 'xxx');
    return createSortTemplate({sortMap: this.#sortMap});
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };
}
